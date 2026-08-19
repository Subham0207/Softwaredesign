# Important notes
- Rate limit based on User info - Authenticated user get higher rate limits than anonymous.
Premium users get even higher rate limits.

# Types of rate limiters:
- Fixed window counter - client: counter; counter reset at a fixed time. cons: starvation at boundary of window.
- Sliding window log - no of requests in a sliding window of 1 min. Needs more memory.
- Sliding window counter - previous minute counter, current minute counter. 
    - previous minute: 8 req <=> 1:00 to 1:01
    - current minute: 6 req <=> 1:01 to 1:01:45
    - we are 70% in current minute
    - 6 + ( 30 % of 8.4 ) = 8.4
    - 8.4 < rate limit
- Token Bucket - ( handles burst traffic ); Lazy refill.
    - refill rate - 
    - bucket size -
    - remove - 

`
    let maxCapacity = 100; // 100 rpm
    let refillRate = 100/60;
    let [tokens, lastRefill] = redis('alice', ['bucketsize', 'lastRefill'])
    if(tokens === null)
    {
        tokens = maxCapacity;
        lastRefill = Date.now();
    }
    else
    {
        let elapsedTime = Date.now() -  lastRefill;
        tokens = Math.min(capacity, tokens + (elapsedTime * refill rate))
        lastRefill = now;
    }


`
# Race condition ( how to enforce atmoic transactions )
-- Redis: `Lua scripting` - lock ( read and write ). Other call waits.

# Fail fast -- if tokens are exhausted -- reject the requests.

# Response and headers when rate limiting
- status code - 429 ( too many request )
- X-RateLimit-Limit - total request limit
- X-RateLimit-remaining - 
-  X-RateLimit-reset -- resets at...
- retry-after: 60


# Rate limiter down
- Fail open 
- `fail close` ( this is best, to protect backend services )

- fault tolerance - fail over to replicas.
- gateway - inmemory fixed window counter.

# Latency < 10ms
- `connection pooling`. But this is automatic. Mostly need to fine tune pool size.
- `geography` -- the gateway and redis is located in same location.

# Dynamic Rules
- Zookeeper -- distributed coordination service
    - configuration management and syncs to large distributed systems.
    - Gateway can keep configuration in memory, and can be synced via persistant TCP connection from zoo keeper.