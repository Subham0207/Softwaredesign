# Fan out notification system
- fan out service reads messages from kafka.
- fan out service reads subscription from kafka sequentially across shards ( to handle millions of subscribers ) and pushes {message, subscription} obj into another kafka topic.

`select * from subscription where notificationId = 'xyz' and id > :lastId limit 1000`

# Data models
1. Subscriptions
    - id (pk)
    - userId (FK)
    -channel - EMAIL | API
    - dest
    - NotificationId ( FK)

2. Notication
    - id
    - name- e-commerce|  ride-sharing| fintech
    - createdBy ( Publisher )
    - createdAt
    - version

3. Consumer
    - id (PK)