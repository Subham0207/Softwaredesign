# Notes
- To calculate fares you don't need to get nearby drivers. Estimated fare can be calculated just from pickoff and destination ( optionally including live traffic data and some price model for a more robust system).
- Rider can request multiple drivers in parallel.


- Appending new row for driver location, solves the ingestion is short term but the dataset will quickly grow. So storing single location record for a driver in an inmemory stores makes more sense.







# Deep dive:
- Q: How would you handle a driver who is near the boundary between two geographic shards so that a rider search close to that boundary still sees the best nearby drivers without adding too much extra query load?


- we will always write to next available geographical shard.
on rider searching for nearby driver, we choose all the shards that are within or at boundary of the pickup point.
We also store the driver -> shard mapping in a small storage, and when driver changes shard we upload this record and delete driver location from the old shard.

- Q: How do we guarantee each driver receives at most one ride request at a time?
- in Redis we can store 
{RideRequest#DriverId, TTL}
so another ride request to the same driver cannot be done until the TTL expries.
Ride service must first acquire this lock before sending a ride request to a driver


- Q: How can we ensure no ride requests are dropped during peak demand periods?
- Our services is deployed globally distributed by geographical location. Ride requests are separated by region so a spike in one place does not sit in front of requests from another place.

The ride service scales horizontally so it will be available on peak demand.

if the ride requests are way to many we can add a geographically distributed queue in the front which will control the ingestion of the ride requests. And then use queue load to scale the service.

Requests inside a busy region are ordered when many pile up at once, because a stronger design here uses priority based handling

the queue itself is going to be durable so we don't loose events. it becomes the source of recovery and retry if a message processing is not successful. And will get ack from the ride service that a valid state for the ride has been committed into DB.

if the queue is going to be full and we can use back pressure to not push new requests for some time to ease the pressure on the service.