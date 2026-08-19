# Important notes
- URL shortener function
    - random  number generator - high collision
    - hash(longurl) - high collision
    - counter - base64 encode (10^12 aka 1 billion unique urls)
        - to prevent security risk
        - use bijective function, so incrementing does not lead to next valid url
        - rate limiting

- to handle Read throughput
    - Use Redis - with LRU cache ( evict least recently used URL when cache is full )
    - use CDN

- Global counter in redis
    - each instance of write service reserves say 1000 counters. Service goes down counters lost forever.
    - fault tolrerance -- enable Redis high availability mode. Save counter to disk and Replicas.

# Estimation

1kB = 10^3 bytes
1MB = 10^6 bytes
1GB = 10^9 bytes
1TB = 10^12 bytes

