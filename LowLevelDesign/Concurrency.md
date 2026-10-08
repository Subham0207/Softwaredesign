1. Lock

2. Atomic lock - interlocked

3. concurentMap<string, obj>(); Monitor.enter(obj): try{ .logic. Monitor.enter(obj) .logic.}finally{ .release. }

4. Semaphores - limit concurrency to N

5. volatile

6. ConcurrentDictionary, ConcurrentQueue 

7. Deadlock: avoid by always acquiring lock in same order. sort the lock keys and then acquire locks.

8. Thread pool: Task.Run(() => processJob());