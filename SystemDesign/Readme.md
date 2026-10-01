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

Scaling reads
- Index
- normalization
- Replicas, shards
- Redis, CDN
- Request coalsecing
- connection pools

Scaling Writes
- Vertical scale
- horizontal sharding and vertical paritioning
- batch writes
- connection pool
- load shedding
- writing to new rows - minimizes contention / no find then write, instead directly write.
- queues

Minimize contention
- ACID transaction
- Lock depends on applicatoin logic
    - pessimistic lock
    - optimistic lock
- Write skew
    - serialization isolation
    - materialize into a new row
- Lock outlive transaction
    - distributed lock

Sagas
- Choreography
- Orchestration

Handling blob
- upload
- download
- security check - quarantine | public
- CDN authentication
    - call via a signed url, CDN verifies if the sinature was signed using a known key.

Minimizing latency
- services deployed close to user ( multi region deployments )
- Connection pool
- Atomic transaction

# Fan out architecuture
- Fan out read
- Fan out write
- write through -- update cache and database in sync.
- write back -- update cache, later write to database.

# Improve System design
- Gathering FR requirements. `Can you walk me through an actors flow`
    - What kind of system.
    - Who are the users.
    - Walk through the main user flow
    - record different states and thier meaning.
    - Errors
    - out of scope 
- quantifying Non FRs, Record Gaurantees the system must provide.
- core entities and discussing the data flow with an example ( to identify different states )
- API Design
- During HLD - All data in primary DB.
- state vs status

# 