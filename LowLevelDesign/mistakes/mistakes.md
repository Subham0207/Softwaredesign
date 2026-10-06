# Requirements gathering
- Who are our users
- Can you walk me through a user flow. Helps uncover a state machine.

# With a state like RESERVED, always track a TTL. So we can release the resource.

# Tips
- In Movie booking system, it was showtime class that needs to own seat locking. since showtime is unique for a theatre, movieHall and movie.
- Use Map<TYPE, obj> map to have a strategy pattern. Then you can call map.get(UPI).pay().

# Class design
- Start from the orshestrator.

# Implmentation
- validation / edge cases
- core logic
- Locks - Lock in consistent order to avoid deadlock. For two or more locks lock in a sorted order.
`lock(string1){ lock(string2) { ...logic...}}`

# In LLD, Always include the orchestrator as a core entity.

# Name patterns - Strategy, EventDriven, Statemachine.
Easy patterns to call out
- `Separation of concerns` - separating logic b/w entities does that.
- Strategy, Observer, statemachine
- `Facade / orchestrator`
- `Dependency inversion principle` - 
    - pass interface instead of concrete implementation. 
    - Enforces abstraction
- `Polymorphism`: Taking different forms.

# For Extensibility Questions:

- Tell what system components get effected when you extend your system.
- Include which class changes, which methods get added to which class in your answer.