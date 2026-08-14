1. Lock

2. Atomic lock - interlocked

3. Monitor.enter(obj): try{}finally{}

4. Semaphores - limit concurrency to N

5. volatile

6. ConcurrentDictionary, ConcurrentQueue 

7. Deadlock: avoid by always acquiring lock in same order.

8. Thread pool: Task.Run(() => processJob());