# Movie ticket booking 

## Requirements
- user should able to browse available show.
- user should able to view/and book seats for a specific show
- When user selected temporarily block the seats to prevent double booking
- the movie ticket contains cinema hall number and seat nos, and userId.
- should able to book multiple seats in one request.

Errors
    - Timeout
    - dead lock, throw: some seats in selection already booked.

out of scope
    - Service unavailable error

### non functional requirement
- Concurrency and thread safety

# Splitwise

## Requirements
- user create groups
- user adds expense in a group - select few members of group to split.
- split strategies
    - equally
    - by exact amounts
    - by percentages
- expense marked resolved by person who created it.
Errors:
    - InvalidSplitException - Percentages/sum don't add up.

out of scope 
    - Calling an actual payment service

### Non functional requirements
- extensibility: (strategy pattern) should be able to add more split strategies.

# Coupon Voucher system

## Requirements
- shopping cart
    - should I track user cart items[] ?
    - total value
    - discount value
    - final value after applying discount ?
- DiscountTypes
    - specificItem
    - CartValue
    - PromoCodes

Error:
    - RequirementsNotMet selected. So CartValue < $100 and cartValue discountType is selected.
    - InvalidCouponException: code doesnot exists
    - Coupon expired
Out of scope:
    - Inventory management
    - Authentication/Authorization
### Non functional requirements
- extensibility: (strategy pattern) add more discountTypes


# Vending Machine
## Requirement
- Machine has products.
- user selects a product.
- user inserts coin
- machine dispenses product.
- machine return change.
Error
    - insufficient amount: user put amount is lower than product price.
    - product out of stock.
out of scope
- Machine runnig out of change

### non functional requirement
- 

# Ride sharing service
## Requirement
- Driver registers on the ride service
- user request ride {toLocation, fromLocation}
- system 
    - find the drivers within 1km
    - calculates fare
    - prompts drivers one of one to accept or reject the ride.
- once a driver accepts, user is picked and dropped off and then charged.
Error
    - DriverNotFound
    - to location unavailable: maybe in another country
out of scope
    - price negotiation
    - routing algorithm

# Task Planner
## Requirement
- Users create tasks ( story, feature, bug)
- task
    - status (ToDo,In progress, Done)
    - assigne
    - priority
- Users can create sprint and add tasks to them
- capabilities
    - filter all high priority bugs assigned to John.
Errors
    - 
Out of scope:
    - sprint history
    - 