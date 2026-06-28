"Amazon Locker is a self-service package pickup system. A delivery driver deposits a package into an available compartment, the system generates an access token, and the customer uses that code to retrieve their package."

// Requirements
// 1. primary capabilities
// 2. Rules and completion
// 3. Error/Invalid cases
// 4. Scope Boundary

# Requirements
Primary Capabilities
1. Package Delivery service. Self Pickup.
2. Delivery Driver deposits a package into available compartments of Amazon Locker.
3. System Generates an access token
4. customer uses the token to retrieve thier package
Error/Invalid cases
1. Delivery driver deposits into wrong compartment.
2. customer uses wrong token
3. No compartment avialable
Scope and Boundary:
# out of Scope
1. token generation failed due to system outage.
2. Rest APIs
# In Scope
1. focus on state transitiion, model and extensibility
2. Just create Service classes

# Entities and relationship
1. DeliveryDriver
2. Package
3. Compartment
4. AmazonLocker
5. Customer
6. AccessToken

AmazonLocker has Compartments
Compartment has a AccessToken
Package
 - Customer
 - AccessToken
 - Compartment

# Statemodelling and transitions
Package
{
    CREATED
    ASSIGNED
    DEPOSITED,
    PICKED_UP
    EXPIRED,
    RETURNED,
    DELIVERED
}

Compartment
{
    AVAILABLE
    RESERVED
    OCCUPIED
    OUT_OF_SERVICE
}

AccessToken
{
    GENERATED,
    ACTIVE,
    USED,
    EXPIRED
}

DeliveryDriver
{
    INPROGRESS,
    DELIVERED
}

Package::CREATED
Compartment::Available
Package::Assigned
Compartment::RESERVED
Package::PICKEDUP
DeliveryDriver::INPROGRESS
PACKAGE::DEPOSITED
Compartment::OCCUPIED
DeliveryDriver::DELIVERED
AccessToken::GENERATED
AccessToken::ACTIVE
Access::USED
Packaged::DELIVERED
Compartment::AVAILABLE


# Class Design

class Compartment
{
    public
        constructor()
        {
            status = AVAILABLE;
            accessToken = new AccessToken(EXPIRED);
        }
    
    getStatus();
    updateStatus();
    occupied()
    {
        accessToken.generate();
        accessToken.activate();
    }
    emptied(password: string)
    {
        if(accessToken.tryPassword())
        {
            package.delivered();
            status = AVAILABLE;
        }
    }
    private:
        status: (AVAILABLE | RESERVED | OCCUPIED | OUT_OF_SERVICE)
        id: string;

        package?: Package;

        accessToken: AccessToken();
}
class AmazonLocker
{
    public:
        constructor(noOfCompartments: int)
        {
        }
    
    putPackage(compartmentId, Package);
    isAnyCompartmentAvailable();
    reserveACompartment(package: Package)
    {
        if(isAnyCompartmentAvailable())
        {
            throw Error('Out of available compartments');
        }
        //Filter out avialable compartments
        // then reserve the first one available.

    }
    private:
        Compartments[];
}

class Package
{
    public:
        constructor()
        {
            status = CREATED;
            id = uuid();
        }

    updateStatus()
    getStatus();
    pickedup()
    private:
        id: string;
        status: (CREATED
                ASSIGNED
                DEPOSITED
                PICKED_UP
                EXPIRED
                RETURNED
                DELIVERED)
}

class AccessToken
{
    public:
        constructor()
        {

        }
    
    generate()
    tryPassword(password: string)
    {
        if(password !== this.password)
            return false;
        
        status = USED;
        return true;
    }
    private:
        status: (
            GENERATED,
            ACTIVE,
            USED,
            EXPIRED
        )

        password: string;
        expiryAtDate: Date;
        createdAtDate: Date;
}


class LockerService
{
public:
    constructor(){}

    function main()
    {
        const amazonLocker =  new AmazonLocker(10);
        
        const package = new Package();

        const compartment = amazonLocker.reserveACompartment(pacakge);

        package.pickedup();
        package.deposited();
        compartment.occupied(); // Access token generated and active... compartment is doing two things so is bad for single responsibility principle.

        compartment.emptied(); // Access token used package delivered
    }
}


finding an avaialble compartment in AmazonLocker class, since this class owns an array of compartments
Reserving a compartment in amazonLocker class, since it owns compartments
generating access token I have put inside compartment class when reserving compartment.
after compartment class is emptied
Marking package as picked up, when compartment is emptied.
Freeing the compartment, after the compartment is emptied, compartment status is reset to AVAILABLE
