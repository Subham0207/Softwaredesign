# Ticketmaster HLD

## Functional requirements ( clarify requirements so you can list all the nouns, to identify entities)

## Non functional requirements
    - CAP theorem ( consistency vs availability on different parts of functional requirements )
    - Scalability  - handling surges for popular events
                    - Read >> write 
    - Latency < 5 sec
# Out of scope 
- Complaince - data protection ( GDPR )
- Fault tolerance


# Core entities

# API ( Satisfy functional requirements, functions are user actions ( User should be able to...) )
- Booking in two phases - reserve - lock seat, and confirm.

# Dataflow

# High level design
    - List down database tables
        - Relation: one to one, many to many, one to many
        - pk and fk
        - Queries
    - Satisfy all the functional requirements

# Deep dive and estimation
    - show depth at 1 to 3 places.
        - Elastic search
        - Redis
        - CDN
        - Persistant connection: Http long polling, Websockets, SSE (server sent events)
        - Virtual waiting queue
        - Change data capture
        - Flink Stream processing
    - Satisfy all non functional requirements.