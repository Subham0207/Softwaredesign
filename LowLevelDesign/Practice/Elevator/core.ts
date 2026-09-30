// TIP: algorithm to do selection This works, 
// but I could make it more sophisticated by considering direction. 
// Would you like me to implement that ?

// Can use Strategies on:
// 1. Elevator: Different ways to step. Like nearest requested floor in moving direction, FIFO.
// 2. SelectBestElevator on hall calls.

enum ELEVATOR_DIRECTION { UP, DOWN, IDLE }
enum ELEVATOR_REQUEST{
    // Hall calls only
    UP,
    DOWN,

    // From inside elevator
    DESTINATION 
}

class FloorRequest{
    public floor: number;
    public type: ELEVATOR_REQUEST

    constructor(floor: number, type: ELEVATOR_REQUEST)
    {
        this.floor = floor;
        this.type = type;
    }
}

class Elevator{
    public floor: number;
    public direction: ELEVATOR_DIRECTION;
    public requests: Set<FloorRequest> // set of floor numbers

    constructor(){}

    // move the elevator in the direction to next nearest floor ( Optionally use different strategy like FIFO )
    step(){
        // move the elevator and service all requests in the same direction, until none left in that direction
        if(this.requests.size === 0)
        {
            this.direction = ELEVATOR_DIRECTION.IDLE;
            return;
        }
        
        if(this.direction === ELEVATOR_DIRECTION.IDLE)
        {
            this.direction = this.directionTowardsNearestRequest();
        }

        if(this.shouldStopHere())
        {
            this.removeCurrentFloorRequest();
            if(this.requests.size === 0)
            {
                this.direction = ELEVATOR_DIRECTION.IDLE;
                return;
            }
        }
        if(this.noRequestIsAhead())
        {
            this.reverseDirection();
        }

        this.moveOneFloor();
    }

    moveOneFloor()
    {
        if(this.direction === ELEVATOR_DIRECTION.UP)
            this.floor++;
        else if(this.direction === ELEVATOR_DIRECTION.DOWN)
            this.floor--;
    }
    noRequestIsAhead()
    {
        for(let request of this.requests)
        {
            let reqDir = this.floor > request.floor ? ELEVATOR_DIRECTION.DOWN: ELEVATOR_DIRECTION.UP;
            if(reqDir === this.direction)
                return false;
        }
        return true;
    }
    
    reverseDirection()
    {
        this.direction = this.direction === ELEVATOR_DIRECTION.UP ? ELEVATOR_DIRECTION.DOWN: ELEVATOR_DIRECTION.UP;
    }

    removeCurrentFloorRequest()
    {
        let type = this.direction === ELEVATOR_DIRECTION.UP ? ELEVATOR_REQUEST.UP: ELEVATOR_REQUEST.DOWN;
        let hallCallRequest = new FloorRequest(this.floor, type);
        let destRequest = new FloorRequest(this.floor, ELEVATOR_REQUEST.DESTINATION);
        
        this.requests.delete(hallCallRequest);
        this.requests.delete(destRequest);
    }

    // check if there are hall call or destination requests for this floor
    shouldStopHere(): Boolean
    {
        let type = this.direction === ELEVATOR_DIRECTION.UP ? ELEVATOR_REQUEST.UP: ELEVATOR_REQUEST.DOWN;
        let hallCallRequest = new FloorRequest(this.floor, type);
        let destRequest = new FloorRequest(this.floor, ELEVATOR_REQUEST.DESTINATION);

        if(this.requests.has(hallCallRequest) || this.requests.has(destRequest))
        {
            this.requests.delete(hallCallRequest);
            this.requests.delete(destRequest);

            stop();
            return true;
        }

        return false;
    }

    directionTowardsNearestRequest(): ELEVATOR_DIRECTION
    {
        // go through requests
        // compare  current floor to request floor

        let min = Infinity;
        let nearestReq = null;
        for(let request of this.requests)
        {
            if(this.floor > request.floor && this.direction === ELEVATOR_DIRECTION.UP)
                continue;
            if(this.floor < request.floor && this.direction === ELEVATOR_DIRECTION.DOWN)
                continue;

            let diff = Math.abs(request.floor - this.floor);
            if(min > Math.abs(request.floor - this.floor))
            {
                min = diff;
                nearestReq = request;
            }
        }

        if(nearestReq === null) return ELEVATOR_DIRECTION.IDLE;
        return nearestReq.type === ELEVATOR_REQUEST.UP ? ELEVATOR_DIRECTION.UP: ELEVATOR_DIRECTION.DOWN;
    }
    addRequest(floorRequest: FloorRequest){}
    getFloor(){return this.floor}
}

// For Hall calls
class ElevatorService{
    public elevators: Array<Elevator>;

    constructor(){}

    requestElevator(floor: number, type: ELEVATOR_REQUEST)
    {
        // Validation

        //core logic
        // 0. create request for floor and type
        // 1. select best elevator ( Strategy Pattern: Algorithms to do selection )
        // 2. add the request to elevator queue

        if( floor < 0 || floor > 9) return false;
        if(type === ELEVATOR_REQUEST.DESTINATION) return false;

        let floorRequest = new FloorRequest(floor, type);
        let elevator = this.selectBestElevator(floorRequest); // Can use different strategies.

        if(!elevator) throw new Error('No elevator found');

        return elevator.addRequest(floorRequest);
    }

    selectBestElevator(request: FloorRequest): Elevator | null
    {
        // 1. get nearest elevator moving in same direction
        let best = null;
        best = this.nearestElevator(
            request.floor, 
            request.type === ELEVATOR_REQUEST.UP ? ELEVATOR_DIRECTION.UP: ELEVATOR_DIRECTION.DOWN
        );
        if(best !== null) return best;

        // 2. get nearest idle elevator
        best = this.nearestIdleElevator(request.floor);
        if(best !== null) return best;

        // 3. get nearest elevator
        return this.nearestElevator(request.floor);
    }

    nearestIdleElevator(floor: number):Elevator | null { 
        for(let elevator of this.elevators)
        {
            if(elevator.direction === ELEVATOR_DIRECTION.IDLE)
                return elevator;
        }
        return null;
    }
    // function nearestElevator(floor: number){}
    nearestElevator(requestFloor: number, direction?: ELEVATOR_DIRECTION): Elevator
    {
        /*
            let min = INFINITY;
            for each elevator
            min = Math.min(min, Math.abs(elevator.getFloor() - floor))
        */
        let nearest = this.elevators[0]; // make first elevator the detault instead of null
        let min = Infinity;
        for(let elevator of this.elevators)
        {
            if(elevator.getFloor() > requestFloor && elevator.direction === ELEVATOR_DIRECTION.UP)
                continue;
            if(elevator.getFloor() < requestFloor && elevator.direction === ELEVATOR_DIRECTION.DOWN)
                continue;

            let floor = elevator.getFloor();
            let  diff = Math.abs(floor - requestFloor);
            if(min > diff)
            {
                min = diff;
                nearest = elevator;
            }
        }

        return nearest;
    }
}