# to prevent cascading failures

overload protection
    - when dependent service is slow

- circuit breaker as a proxy or intelligent gate keeper, monitoring the downstream slow service.

- Triggers/Trips -- due to certain metrics. failure rate > treshold.
- after timeout period
- Half open period -- circuit breakers allows half of the requests, and if success
- Circuit breaker is closed