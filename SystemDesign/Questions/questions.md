# A downstream payment API starts timing out. p99 goes from 80ms to 4s.

- limit retry attempt, use exponential fallback + jitter to limit load.
- use idempotency key - to have atmost once effect, timeout does not mean payment failed, it could still be processing.
- fail fast - 3 retry attempts and then return failure to user.