# API design ( start with Rest API)

- RestAPI, With Long Polling ( Needs Load balancer at Layer 7, Slower, more decisive)
- SSE ( Sever Side Events)
- Websockets ( Needs Load balancer at Layer 4, faster, dumber)
- CDNs

- see https://www.hellointerview.com/learn/system-design/patterns/realtime-updates

- API design should get finished in 5 minutes max

- Pagination ( Cursor based and Offset based )
- Authentication - JWT tokens.
- Service to service communication using API keys.
- rate limiting

Example:
`
    POST /{role}/employees/
    {
        employeeName: string,
        team: string,
    }
`


# Data Modelling

## DB choice ( start with Normalized SQL)
- SQL - fixed schema, clear relationship, strong consistency.
    - Normalization (split data across tables, Need join to query them, join is expensive)
    - Denormalization (duplicate data to avoid joins, good for read heavy systems)
- NOSQL - flexible schema, needs horizontal scaling, no complex joins needed.
- Elasticsearch -- for full-text-search -- search read slightly lags behind the primary DB.

### Indexes
1. B-tree
2. Hash ( Less used )
3. GIN ( JSONB, Full text search, Arrays)
4. GiSt (indexing Geospatial data) - postgreSQL - postGIS extension
5. BRIN (Block Range index; Index a range -> blocks of pages) For massive tables


## Cache - only cache the frequently quried paths.
- Reduce load on DB
- Reduce premature scale up in DB due to read.
- Handle more write op

Redis - {data, ttl}

### Cache invalidation ( depending on data freshness)
- use small TTL
- update/delete cache copy when UPDATE in DB.

### Cache stampedes
A cache entry expires, You have concurrent calls waiting for that exact data. Now DB load spikes up since cache is missing the data.
- Can be prevented with: 
    - locking - One request reads the DB while others wait.
    - early recomputation - refresh entry before they expire.
    - Staggering TTLs - so entries all don't expire at same time.

### Cache outages
- in memory cache as fallback.
- circuit breaker to shed load off.
- graceful degradation until cache recovers.


### CDN caching -- for static data

## Sharding
When single DB server runs out of storage. Store data in multiple servers ( shards )

Deciding the shard key ( based on access pattern and avoid hot spots)
- hash the shard key and use modulo to pick the shard.
- Range based shard key
- Directory based sharding - Lookup table to use which shard the data lives in. Introduces latency.

### Consistent hashing ( For elastic scaling add/remove nodes)
- Place db servers on a virtual ring. 
- hash(id) = hashKey.
- find the next db after the hashkey on the ring.
- This makes removing and adding dbs easy.

Used by: distributed memcached, Redis cluster, cassandraDB, DynamoDB, Load balancer to distribute load on dynamically allocated backend tasks, CDNs routing request to edge locations.


# CAP Theorem ( avaialability is a good default Or Eventual Consistency)
- Consistency ( all nodes see the same data)
- Availability ( every request gets a response)
- Partition tolerance ( system works even when network connections fail between nodes)
- Network parititions are unavoidable. So choose b/w consistency and availability.

- Strong consitency - Consistent, Eventual Consistency - given enough time data is consistent, Weak Consitency - data is not consistent.

- during a Partition, choose Availability or Consistency; Else, choose Latency or Consistency

Resources
- https://stackoverflow.com/questions/12346326/cap-theorem-availability-and-partition-tolerance
- https://blog.nahurst.com/visual-guide-to-nosql-systems


# Numbers to know for - Capacity Calculation

