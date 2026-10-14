1. Lock

2. Atomic lock - interlocked

3. concurentMap<string, obj>(); Monitor.enter(obj): try{ .logic. Monitor.enter(obj) .logic.}finally{ .release. }

4. Semaphores - limit concurrency to N

5. volatile

6. ConcurrentDictionary, ConcurrentQueue 

7. Deadlock: avoid by always acquiring lock in same order. sort the lock keys and then acquire locks.

8. Thread pool: Task.Run(() => processJob());

9. BlockingQueue.take() -> Thread sleeps is no message available in blocking queue.

10. Choosing the right reference to lock:
    - When you lock an object any code that also has ref to that object can lock it.
    `
        class Sink
        {
            private readonly _lock = new Object();

            flush()
            {
                // lock using the ref of sink instance is bad, since another part of code can also lock this instance, blocking this code path.
                lock(this) 
                {
                    ....
                }

                // this is better _lock is private, no other code path ref it.
                lock(_lock)
                {
                    ...
                }
            }
        }
    `