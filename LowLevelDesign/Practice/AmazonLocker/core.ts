enum PackageSize
{
    small,
    medium,
    large
}

enum CompartmentState
{
    free,
    occupied,
    reserved,
    maintainaince
}

enum AccessCodeState
{
    ISSUED,
    USED
}

class AccessCode
{
    code: string;
    state: AccessCodeState;

    constructor(code: string)
    {
        this.code = code;
        this.state = AccessCodeState.ISSUED;
    }

    markAsUsed()
    {
        this.state = AccessCodeState.USED;
    }
}

class Compartment
{
    size: PackageSize;
    state: CompartmentState;
    accessCode: AccessCode | null;
    

    constructor()
    {
        this.size = PackageSize.large;
        this.state = CompartmentState.free;
        this.accessCode = null;
    }

    openAndAddPackage()
    {
        this.state = CompartmentState.occupied;
    }
    
    openAndCollect()
    {
        this.state = CompartmentState.free;
    }

    getAccessCode(){return this.accessCode;}

    assignCode(accessCode: AccessCode)
    {
        this.accessCode = accessCode;
    }

    removeCode()
    {
        this.accessCode = 
        this.accessCode = null;
    }
}

class NotificationService
{
    notify(userId: string, compartment: Compartment){}
}

class Locker
{
    compartments: Array<Compartment>;
    notificationService: NotificationService;
    lookupCompartment: Map<string, Compartment>; // compartment has the accessCode property to mark for us. 

    constructor()
    {
        this.compartments = new Array<Compartment>();
        this.notificationService = new NotificationService();
        this.lookupCompartment = new Map<string, Compartment>();
    }

    depositePackage(size: PackageSize)
    {
        //validation
        // --  check free compartments for packageSize

        //core logic 
        // -- find a free compartment
        // -- open the compartment
        // -- add package to the comparttment
        // -- mark the compartment as occupied
        // -- generate code and send notification to user

        let compartment = this.compartments.filter(compartment => compartment.state === CompartmentState.free)[0];
        if(!compartment) throw new Error('No compartment found');

        compartment.openAndAddPackage(); // marks compartment occupied
        let code = new AccessCode(this.uuid())
        compartment.assignCode(new AccessCode(this.uuid()));

        this.lookupCompartment.set(code.code, compartment);
        this.notificationService.notify('xyz', compartment);
    }

    uuid(): string{return 'xyz'}


    pickup(code: string)
    {
        //validation
        // - code not empty
        // - code exists for one of the compartment

        //core logic
        // - get compartment
        // - open and empty compartment
        // - mark the code used

        if(!code) throw new Error('Code  cannot be empty');
        if(!(this.lookupCompartment.has(code))) throw new Error('Invalid code');

        let compartment = this.lookupCompartment.get(code);
        if(!compartment) throw Error();
        let accessCode = compartment.getAccessCode();
        compartment.openAndCollect();
        accessCode?.markAsUsed();

        this.lookupCompartment.delete(code);
    }

}