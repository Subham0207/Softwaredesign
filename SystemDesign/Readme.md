# For quick Revision

# PostgreSQL Isolation levels
Anomalies
- Dirty read
- Non Repeatable read
- Phantom read
- Serializable anomaly

Isolation gaurantees
- Read committed
- Repeatable read
- Serializable 

# Patterns

Contention / lock
- ACID
    - where clause
    - compare and set
- Application level lock
    - pessimistic lock
    - optimistic lock
- Write skew
    - Serializable isolation
    - materialize as one row
- lock that outlives a transaction
    - distributed lock

Scaling Reads
- Index
- denormalization
- replicas and sharding
- request coalescing
- cache key fan out ( For hot keys: have the key on multiple shards so load spreads )

Scaling writes
- Vertical scaling.
- Horizontal sharding Vs Vertical paritioning.
- queue and load shedding
- batching and aggregation
- resharding
- hot keys

Sagas
- Choreography
- Orchestration

Handling blob
- upload
- download
- security check - quarantine | public
- CDN authentication

Minimizing latency
- services deployed close to user ( multi region deployments )
- Connection pool
- Atomic transaction

# Improve System design
- Gathering FR requirements. `Can you walk me through an actors flow`
    - What kind of system.
    - Who is the user.
    - who are all the actors interacting with the system.
    - Different states and thier meaning.
    - Errors
    - out of scope 
- quantifying Non FRs.
- core entities and discussing the data flow with an example ( to identify different states )
- During HLD - All data in primary DB.
- state vs status

# 