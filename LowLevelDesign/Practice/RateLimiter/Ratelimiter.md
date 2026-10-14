

## Extensibility
- Your RatelimitService stores per-client state inside each RateLimit instance (e.g., TokenBucket holds a clientIdMap that grows as new clients make requests). If the system runs for months with millions of distinct clientId values, what happens to memory, and what changes to TokenBucket or RatelimitService would you make to address this?

Ans - 
the memory will keep expanding until its full and the app crashes. To address this,
In TokenBucket and other rate limiter I will also track a LRU cache, which store ref to client objs in the clientId map. And when we hit certain capacity evict the Least recently used client ( from the cache and map ).

Other strategies would be a TTL based cleanup.
And perhaps boundedConcurrentMap for clientIdMap, but this one is a little extreme.