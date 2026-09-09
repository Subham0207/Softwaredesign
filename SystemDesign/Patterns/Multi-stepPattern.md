## Sagas
1. Choreography: Using EventStore like Kafka. Services subscribe and publish events. (good for stable workflows, Hard to make sense of audit trail at scale)
2. Orchestration: Using workflow systems and durable execution engines like: Temporal and AWS Step function
3. 