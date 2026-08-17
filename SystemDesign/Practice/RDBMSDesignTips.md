# If a field contains multiple values → usually make another table
- create another table
Example: 

Instead of this `Bad`:
EventTable
- id (pk)
- venueId (fk)
- seats []

Do this `Better`:

EventTable
- id (pk)
- venueId (fk)
- ...

EventTicketTable
- eventId (fk)
- seatId (fk)
- status: 
- Add unique contraint: UNIQUE(eventId, seatId)

# Relation identification
Say Two entities User, Orders
`Relation` - User has many Orders

entities: User, Group
`Relation` - User belongs to many groups, a Group contains many users.

## one to many relation table ( user has many order)
User
- id
- name

Order
- id
- userId FK
- createdAt

## Many to many relation table (aka junction table)
User
- id

Group
- id

GroupMember:
- groupId FK
- userId FK

PrimaryKey( groupId, userId)

## If the relationship itself has information → that information belongs in the junction table

`Bad`
WorkspaceMember
- workspaceId
- userId

`Better`
WorkspaceMember
- workspaceId
- userId
- role
- joinedAt
- status

# Foreign keys are not automatically indexed everywhere, If joining have Index on them

# Use UNIQUE constraints for business invariants

# Use composite keys/constraints when uniqueness depends on multiple columns

# Historical/state-changing information often deserves its own table

Order
- id
- currentStatus

OrderStatusHistory
- id
- orderId
- status
- changedAt

# createdAt and updatedAt are almost always useful

# If deletion must be reversible/auditable → consider soft deletion
- use status field: ACTIVE | DELETED | SUSPENDED,
- can add deletedAt/modifiedAt