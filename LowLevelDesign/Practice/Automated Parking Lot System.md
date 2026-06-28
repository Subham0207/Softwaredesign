# Problem statement
"A multi-floor parking lot needs an automated system. Drivers enter, receive a ticket detailing their spot assignment, park their vehicles (different sizes), and pay a fee upon exiting based on the time elapsed."

# Requirements
// system capabilities
// edge cases/invalid cases/errors
// scope boundary
1. supported Vehicle types: Motorcycle, Car (All types), Bus
2. Parking lot sizes: small - motorcycle, medium - Car, Large - Bus
3. Fee per hour - Motorcycle - $10, Car - $20, Bus - $50

edge cases
1. No parking spot remaning -> No ticket issued -> entry rejected.
2. 

scope boundary
1. no max time for a vehicle to stay in parking.

# Entities
Driver
ParkingLot
Floor
Ticket
parkingSpot
parkingSpotSizes
vehicle
vehicleSizes
TimeElasped

# state modelling and state transitions
VehicleTypes
{
    Motorcycle,
    Car,
    Bus
}

ParkingSpotSize
{
    Small,
    Medium,
    Large
}

VehicleTypeToParkingSpotMap{
    Motorcycle: Small
    Car: Medium,
    Bus: Large
}

ParkingSpotSizeToFreeMap
{
    Small: $10
    Medium: $20
    Large: $50
}

Driver
{
    UNPAID,
    PAID
}

Ticket
{
    GENERETED,
    PAID
}

Vehicle
{
    ENTERED,
    CHECKEDOUT
}

ParkingSpotStatus
{
    FREE,
    BOOKED
}

Vehicle::Entered
Driver::Unpaid
ParkingService::SpotGenerated()
Ticket::Generated
ParkingSpot::Booked
Vehcile::Checkedout
ParkingSpot::Free
Driver::paid
Ticket::Paid


parkingService has a ParkingLot
ParkingLot has Floors
Floor has ParkingSpots
ParkingService tracks {Ticket, ParkingSpot}
parkingService has checkin and Checkout methods
Ticket has details about driver, vehicle, startTime.
FeeCalculator calculates price(ticket: Ticket)
Driver has a Vehicle
Driver pays fees


# class Design

class ParkingSpot
{
    id: string;
    size: (SMALL | Medium | Large)
    status: (FREE| BOOKED)
    floor: int
}

class ParkingLot
{
    ParkingSpots: ParkingSpot[]
}

class Vehicle
{
    Type: (Motorcycle| Car | Bus)
}

class Ticket
{
    id: string;
    status = (GENERATED | PAID);
    entryTime: Date;
    exitTime: Date;
    vehicle: Vehicle;
    parkingSpot: ParkingSpot;
}

class Driver
{
    vehicle: Vehicle;
    ticket?: Ticket;

    id: string;
}

class TicketService
{
    generateTicket();
    markPaid(ticket: Ticket);
}

class FeeCalculatorService
{
    calculate(ticket: Ticket);
}

class PaymentService
{
    pay(driver: Driver, amount);
}


class ParkingService
{
    parkingLot ParkingLot;
    constructor(ticketService, feeCalcultor, paymentservice)
    {
        this.ticketservice = ticketservice;
        this.feecalculator = feecalculator;
        this.paymentservice = paymentservice;
    }

    checkin(driver Driver): Ticket;
    {
        const parkingSpot = ParkingLot.findASpot(driver);
        if(parkingSpot)
        {
            const ticket = ticketService.generateTicket(driver, parkingSpot);
            tickeParkingSpotsMap.set(ticket, parkingSpot);
            return ticket;
        }

        throw Error("Ticket generation failed. No empty spots found");

    }

    checkout(driver Driver): null
    {
        const ticket = driver.getTicket();        
        const amount = feeCalculatorService.calculate(ticket);
        paymentService.pay(driver, amount);
        TicketService.markPaid(ticket);
    }
}