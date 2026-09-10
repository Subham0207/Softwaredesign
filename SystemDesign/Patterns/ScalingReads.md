# Solutions
- Optimize performance within database
    - Indexing
    - Denormalization ( worth it when Reads >>> writes )
        - Writes become slow and complex ( many records to update)
        - risk of stale data
        - storage blows up
- Horizontal DB scaling
    - Replicas - promote a replica to primary is primary fails
    - Sharding `Refer to a detailed breakdown video`
        - Functional sharding ( Split DB by features )
        - Using a ShardId
        - Disadvantages / Operational complexity
            - Manage shard maps
            - rebalance your data when shard added/removed
            - Cross shard queries
- External Cache layer
    - Application ( redis / memcache )
    - CDN
        - to cache static content
        - to cache dynamic content
        - Trade offs
            - cache invalidation


# Deep dives
- add index to handle more throughput
- When index is not sufficient
    - if data is skewed -- add a cache
    - else add replicas
- How to handle millions of concurrent reads for the same cached data (`Hot spot in cached data`)
    - `Request coalescing` - group all the same request, make a single request to cache, and wait for the response.
    - `Cache key fan out` ( Request coalescing not enough ) - shard the cache, and every shard has that hot key. ( so load spread across multiple shards ).
        - tradeoff - clearing cache now needs to be done from multiple caches/shards.
- How to handle cache invalidation, when data update needs to be immidiately visible ( `data needs to be strongly consistent and handle high read throughput`)
    - When new data written, then `invalidate the cache`.
    - what if 1st write request invlaidated the cache, and at the same time a read request came and a db replica was read ( since we use async replication ) which had stale data, now this data will also be written to cache. What to do to avoid this ?
        - Use version numbers, Do the write request to DB with new version and create the cache key with new version in cache in same transaction. Now when the next read request comes in, it will first read the cache, see a new version, and make db request with the new version.
        - Any read request for the old version will still be served normally.



# Summary
- Index
- denormalization
- Horizontal DB scaling
    - Replicas
    - Sharding
- External cache
    - Redis
    - CDN
- Request coalescing
- cache key fan out