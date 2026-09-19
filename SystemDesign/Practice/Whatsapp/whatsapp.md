# Functional requirement


# Non Functional requirement
- System is eventually consistent. And Messages needs be reliabily sent (durable storage).
- System should scale on peak/holiday load.
- Fault-tolerance/Resilience against individual component failure.
- Chat latency < 500ms.

# Core entities
- User
- Chat
- Group
- Group Members
- Message
- Media

# API DESIGN ( REST API + Websocket )

- POST /groups/
req -> {
    groupname
}

res -> 201 OK {
    groupId,
    createdBy,
    createdAt,
    members: [ created_by_user ]
}

- POST /groups/{groupId}/members/
req -> {
    User[]
}

res -> 200 OK

`WS: /v1/connect`

- MESSAGE_SENT
header: content-type
req -> {
    chatId,
    message: bytes
}

res -> SUCCESS | FAILURE

- NEW_MESSAGE
header: content-type
{
    chatId,
    message,
    cursor,
}
res -> RECIEVED

- GET /chat/{chatId}
{
    messages: { messasge, content-type }[],
    cursor,
}

# High level design ( Add explaination to each FR - Include Validation as a step in your answers)

- There is group service and chat service. User can create group and add members to it using group service. Chat service is used to post chats. We keep these two services separate so they scale independently.

- I am using postgreSQL for database and s3 to store blob files like media.

- In DB we have a userMessageHistory table which tracks that lastMessage a user viewed in a chat. We can use this to deliver last 30 days chats to this user.

- When a new group is created. It also adds the user who created it to members list.
- group service also validates the member list size before adding any new members.

- the sender sends over the websocket or through the gateway, the chat service validates the chat and participants, then forwards the message to the other connected users

- `Just realized storing userLastViewed at in a chat is not needed`.


# Deep dive
- explain how message reaches specific users through websocket connections. 
    - consistent hashing to select parition server using userID for websocket connection.
    - Processor computes the hash and forwards to owning websocket connection server
- How does limited DB connection pool handles 10^3 or more workers calling the DB. DB can easily handle 100k RPS ( With no joins ) but is that not limited by connection pool reuse. How much will the cache help.
-  what happens when a server fails on the consistent hash ring.
    - A coordination layer like `ZooKeeper or etcd` watches for node health and updates the ring
- How to handle websocket client connection and disconnection ? 
    - heartbeat, with TTL( so even if the server crashes the connection is cleanedup )
    - hooks on the websocket connection.