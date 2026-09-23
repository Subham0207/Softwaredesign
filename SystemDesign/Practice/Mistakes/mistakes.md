- while Gathering FR ask:
    - What kind of order management system this is ?
    - who is the user ? what can they do ?
    - Life cycle - state changes of the main entity
    - Failures: what happens when something goes wrong ?
    - put somethings out of scope.
- Always quantifying the non functional requirements
- Discuss core entities
- Discuss the data flow with an example ( Helps identify `state and statuses` )
- During High Level design ( Fulfulling FRs ) - Do all data manipulations in the main DB. Don't pre optimize it by adding other layers like redis ( this adds complexity )
- Identify `State machine` early. Diff b/w `states and statuses`


# Deep dives
- How to minimize latency
    - multi region deployments, having servers close to the user.
    - Use connections pools for transaction instead of creating new connection everytime.
    - Atomic transactions - read and write in the same transaction.