# Conditional update
- Conditional write - check part of database write query - using where clause
    - In SQL due to `Isolation gaurantees` - For an operation on same row, two writes happen one after the other.
Example: update count where available_seats > 0

- Compare and set

# Explicit lock - Pessimistic lock - Collision is common
For Update

# OCC - Optimistic Concurrency Control - collision is rare
- if used on high collision usecase -- many queries will fail - bad user experience.

- ABA problem


# Write Skew
Read on Isolation levels
`Serializable` Isolation level can catch write skew.

# Redis TTL lock

# Fencing token
Redis TTL lock can still give two user the same lock at boundary of the TTL.


# TTL in a database table
- This is slow and can become a hotspot.

# Zookeeper


# Scaling hot row
- if possible divide the row into multiple rows, so the contention is reduced.
- If not possible, use a queue in front, with worker polling from this queue.