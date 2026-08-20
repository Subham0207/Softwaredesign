# Important note
MeetingSpace and desk booking are separate. Desk is booked for the whole day while meeting space are booked for duration.
User should be able to book:
- Meetingspace: (meetingRoom | ConferenceRoom )
- Desk: Capacity for desk is always 1, And is booked for a whole day.


# DB Entities
- Meetingspace: 
    - id
    - type: meetingRoom | ConferenceRoom 
    - capacity: number
    - floor
    - officeBuildingId

- Desk:
    - id
    - floor
    - officeBuildingId

- MeetingSpaceBooking
    - id
    - meetinspaceid
    - starttime
    - endtime
    - userId
    - createdAt
    - status: PENDING | BOOKED | Cancelled

- DeskBooking
    - id
    - deskid
    - date
    - userId
    - createdAt
    - status: PENDING | BOOKED | Cancelled

- DeskUnavailable: (one desk can be unavailable many days)
    - id
    - deskid
    - date
    - Reason: Maintaince | Public Holiday

- MeetingSpaceUnavailable: (one meeting space can be unavailable many days)
    - id
    - meetinspaceid
    - date
    - Reason: Maintaince | Public Holiday

# Functional requirements
1. User should be able to view available meetingspaces and desk

`
    // Available meeting spaces

    SELECT * from meetingspace as m
    where 
    // booking does not exists for this space
    not exists (
        select 1 from MeetingSpaceBooking as mb
        where mb.meetingspaceid = m.id and
        mb.start_date < req.end_date and
        mb.end_date > req.start_date
    )

    // Available desk
    SELECT * from desk as d
    where
    // booking does not exist for this desk
    not exists (
        select 1 from DeskBooking as db
        where db.deskid = d.id and 
        db.date = req.date
    )

`