## Important notes
0. `consistency` and `availability` can `coexists` in different parts of our system
1. Booking has two phase:
- reserve a seat for ( 10 min) - /api/booking/reserve {returns paymentdetails}
- pay -- paymentProvider -- webhook -> /api/booking/confirm{bookingId}
2. Tech excellence
    - mention JWT | session is used to get user details.
3. Database relations
    - one to one
    - one to many
    - pk, fk identification
    - RDBMS -- PostgreSQL - ACID transactions
    - Don't discuss - SQL vs NoSQL dB. Choose a DB based on its quality.
    - Writing out SQL queries, atleast for main endpoints.
4. First priority is to satify all `functional requirements`, identify weakpoint, and optimize at the end.
5. Handle failures.
6. Handling Deltas in cron job runs and status setting. choices
    - Distributed Lock: Redis entry with a TTL. Get DB rows, exclude rows that are locked in Redis.
### Deep dive from here
7. When deep diving: show off depth in 1-3 places.
    - Reference your `non functional requirements`. See What is missing.
8. `Elastic search` -- should not used as primary database
    - Durability concerns, and no complex transactions
    - data written to Elasticsearch using CDC (write to a stream, A worker processes the stream) or application itself (lead to durability concerns)
    - Elastic search has limit to write throughput consider:
        - batching
    - Caching top queries:
        - node query caching toggle in AWS Opensearch - enable caching for top 10k queries
        - Redis/Memcache in from of elastic search
        - CDN - caching GET queries. ( Not scalable for search terms)
9. Scalability to handle surges on popular events
    User Experience:
    - Long polling -- HTTP long polling.
    - persistance connections 
        - websocket - bidirectional.
        - `Server Sent Event (SSE)` - unidirectional - server to client.
    Handling Surges: Using choke points ( `virtual waiting queues`)
    - Admin enabled virtual waiting queue using `Redis`: priorityQueue/Sorted set based on arrival time or Random. `Event driven` to let 100 after 100 people in to book, `Notify` user using the SSE connection.
    - Talk about scaling
        - API gatway scales automatically
        - DB usin shards
        - tasks using auto scaling policies
    - Estimation ( math calculation ) At the end:
        - 
## Ticket master system

### Functional requirement
- Book tickets
- View an event
- Search for Events
### Non functional requirement
- Low latency search.
- (CAP in different parts of system) strong consistency for booking tickets & high availability for search and viewing events.
- read >> write.
- Scalability to handle surges for popular events.


### Out of scope 
- Complaince
- Fault tolerance, etc

### Core Entities
- Event
- Venue
- Performer
- Ticket

### API
- 