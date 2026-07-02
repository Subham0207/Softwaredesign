# Keywords
- Kafka Cluster
- Broker
- Topics
- Partition
- Consumer group ( to garuantee no duplicate processing )
    - request message with offset
    - sync offset with kafka ( used for durability)

# What about DLQ in kafka ?
DLQ is implmented as another topic.

# Message Retention policies ( which ever is reached first )
- Number of days. Default is 7 days.
- Max size of data. Old data is removed. Default is 1GB.