# Meeting room booking system

- many office locations
- Office
- one office has many meeting rooms
- Meeting Room
- One meeting room has many ameneties
- one booking: one meeting room
- one user can make many bookings
- one booking multiple attendees

# Tables

1. Office
    - id
    - location

2. MeetingRoom
    - id
    - officeId
    - name
    - capacity
    - floor
    - status: Active | Under Maintaince | Disabled

3. MeetingRoomAmenities
    - id
    - amenityId
    - MeetingRoomId

4. Amenity
    - id
    - name

5. Booking
    - id
    - status: PENDING | CONFIRMED | CANCELLED
    - MeetingRoomId
    - starttime
    - endTime

6. BookingAttendees:
    - id
    - bookingId
    - AttendeeID

# Queries
- Users should be able to search for rooms based on:
office
capacity >= requiredCapacity
required amenities
availability between startTime and endTime

```
    SELECT MR.*
    FROM MeetingRoom MR
    WHERE MR.officeId = :officeId
    AND MR.capacity >= :capacity
    AND MR.status = 'ACTIVE'

    -- Must have ALL requested amenities
    AND (
        SELECT COUNT(DISTINCT MA.amenityId)
        FROM MeetingRoomAmenities MA
        WHERE MA.meetingRoomId = MR.id
            AND MA.amenityId IN ('TV-id', 'Snack-id')
    ) = 2

    -- Must not have overlapping booking
    AND NOT EXISTS (
        SELECT 1
        FROM Booking B
        WHERE B.meetingRoomId = MR.id
            AND B.status = 'CONFIRMED'
            AND B.startTime < :requestedEnd
            AND B.endTime > :requestedStart
    );
```