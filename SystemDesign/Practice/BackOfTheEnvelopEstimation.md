# Goal: taking the scale requirements you established and checking whether your architecture can actually support them

- TPS - Transacdtion per second
- RPS - Request Per second
- QPS - Queries per second
- DAU - Daily Active Users
- MAU - Monthy Active Users

- If a product has 100 million MAU then
    - DAU - 10-25 % of MAU - 20 million DAU
- Tweeter has 100 mill MAU - 50% DAU
    - 25% make tweets
    - each person makes 2 tweets
    - 25% * 2 = 0.5 tweets per DAU


# What to estimate
- Average + peak read RPS
- Average + peak write/booking RPS
- Concurrent users/connections
- Storage growth


# Remember
K = 10^3
M = 10^6
B = 10^9
T = 10^12

1 day ≈ 10^5 sec
1 year ≈ 3 × 10^7 sec

1M requests/day   ≈ 10 RPS
10M/day           ≈ 100 RPS
100M/day          ≈ 1K RPS
1B/day            ≈ 10K RPS

1 KB = 10^3 B
1 MB = 10^6 B
1 GB = 10^9 B
1 TB = 10^12 B

1 byte = 8 bits