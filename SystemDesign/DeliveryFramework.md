# Deliver a working system

## Requirements

### Functional Requirements
- capabilities
1. Prioritize 3 requirements
2. Written like: `Users/Clients should be able to...`
- Edge cases/Errors
- Scope boundary

### Non-Functional Requirements
1. Prioritize 3 Requirements

#### Identifying Non functional requirements (Acronym: S C A L E F C D S)
1. CAP theorem: Either consistency or Availability. Partition Tolerance is a given,
    a. Gaurantee consistency -- don't show outdated data.
    b. Gaurantee Availability -- Don't crash the app. Fine with slightly outdated data.
2. Environment Constraint: Device on/for which the system is designed.
    a. Memory contraint
    b. Limited bandwidth ( streaming video on 3G)
    c. battery constraint
3. Scalability:
    a. burst traffic at specific time of day
    b. Event like holiday; result in increase in traffic.
    c. Read vs Write ratio. ( Scale read or write )
4. Latency:
    a. Do request require computation time ?
5. Durability: How important is data loss. (No data loss) once data is saved, it persist despites hardware failure.
6. Security:
    a. Data protectetion
    b. access control
    c. Compliance with regulation
7. Fault Tolerance: system continues to function even when  components fail
    a. Redundancy
    b. Failover
    c. Recovery mechanism
8. Complaince:
    a. industry standards
    b. data protection laws
    c. other regulations

### Capacity estimation
skip it upfront.

## Core Entities
Types that your API will exchange and that your system will persist in a Data Model

Example: Twitter system design
1. User
2. Tweet
3. Follow

## API or System Interface
Define API contract. Always use RESTAPI unless specified.
1. REST API (default)
2. GraphQL
3. RPC ( Remote Procedure call) - gRPC
4. WebSockets or Server-Sent-Event ( webhooks )

```
    POST /v1/tweets
    body: {
    "text": string
    }

    GET /v1/tweets/{tweetId} -> Tweet

    POST /v1/follows
    body: {
    "followee_id": string
    }

    GET /v1/feed -> Tweet[]
```

## [Optional] Data flow
In a list list

For a web crawler, this might look like:
1. Fetch seed URLs
2. Parse HTML
3. Extract URLs
4. Store data
5. Repeat

## High Level Design
Design a diagram

## Deep Dives and Estimations
Now, harden your design by:
1. Ensuring it meets all of your non-functional requirements.
2. Addressing edge cases.
3. Identifying and addressing issues and bottlenecks.
4. Improving the design based on probes from your interviewer.

Avoid talking over the interviewer. They might be looking for specific signals they want from you.