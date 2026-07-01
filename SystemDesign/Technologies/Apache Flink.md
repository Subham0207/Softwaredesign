# Apache Flink
- Highly scalable, durable, resilient Batching and Streaming processing solution. 
- Note: Flink is a stream consumer.
- Keeps the state of application for days.
- Each message is processed atmost once.
- Flink involves writing code in: Python, Java, and SQL.
- Durability: Periodically flink flushes out the data to s3 and creates a checkpoint. Meaning data can be recovered upto the last checkpoint.

# What is streaming processing
- Continously processing ( taking action on) data in motion directly after it is created.
- Stateful stream processing - process multiple data points at once in sequence using window option:
    - Sliding window
    - Tumbling window

# Other stream processing tools
1. Apache Spark
2. Amazon Kinesis
3. Kafka streams.

# Stateful and stateless stream processing

# Supports Tumbling and sliding windows on the data stream.

# Architecture
- Flink Cluster
    - Job Manager
        - task managers
            - Memory manager
            - Network manager ( to talk to other tasks and job manager)
    - Dispatcher
    - Schedular
    - Checkpoint Coodinator
