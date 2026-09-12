# A downstream payment API starts timing out. p99 goes from 80ms to 4s.

- limit retry attempt, use exponential fallback + jitter to limit load.
- use idempotency key - to have atmost once effect, timeout does not mean payment failed, it could still be processing.
- fail fast - 3 retry attempts and then return failure to user.


# URL shortener - DB write failed.
- durability, retries, idempotency and recovery.
- Fail fast - DB write failed. Return failure to user. Request is still idempotent ( atmost once ) since this event has not occured, so retrying is best.
- WAL records can be used to replay/recover the DB.
- system will retry the request 3 times.

- replica will be promoted to primary. 
- we can add a queue, push message to queue. Return success to user. Now if DB write fails, we retry with replica when its promoted to primary.