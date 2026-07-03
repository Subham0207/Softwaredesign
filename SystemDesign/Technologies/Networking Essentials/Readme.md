# Networking Essentials
- OSI Model

# Network Layer ( Layer 3)
- IP
# Transport Layer ( Layer 4)
- TCP, UDP
# Application Layer ( Layer 7)
- RestAPI, Polling
- GraphQL
- gRPC
- SSE ( periodically severed and needs reconnection from client side)
- Websocket - ws://, Needs more infra setup.
- WebRTC -- Runs on UDP ( Others run on TCP ), Peer to peer. Video and audio conference, document collaboration.

# Load balancing
- Client side load balancing - 
- Dedicated load balancer
    - Round Robin
    - Least Connection
    - Level 4 LB vs Level 7 LB

# Deep Dive
- DB replication, Paritition, keep it close to users.
- CDN Edge locations
- Timeouts, Backoffs or jitter, and Retries.

# Cascading Failures
Problem in one part of system creates problem in another part of system.
- Circuit Breakers: fail request to a service temporarily to give it time to recover.