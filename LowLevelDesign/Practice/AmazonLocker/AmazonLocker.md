// ═══════════════════════════════════════════════════════════════════════════
// REQUIREMENTS
//
// Example (Tic Tac Toe):
//   1. Two players alternate placing X and O on a 3x3 grid.
//   2. A player wins by completing a row, column, or diagonal.
//   Out of Scope: UI, AI opponent, networking
// ═══════════════════════════════════════════════════════════════════════════

- delivery driver should
    - deposit package of size into available compartments
- after deposit system should generate access code and send to customer.
- cusotmer should
    - retrieve thier package using access code
- compartment: different sizes, within a lockerUnit
- Errors
    - Wrong code
    - Wrong compartment
    - Deposit failed
    - locker full
    - code expired
    - Compartment for the package size not available
- out of Scope
    - Auth
    - UI
    - customer notification
    - handling after code expiry

User flow
- Delivery driver arrives
- system finds an compartment for the package size.
- delivery driver places the package in the compartment
- compartment occupied
- code generated ( valid for 7 days ) and sent to User
- user put the password and picks the package
- compartment available


// ═══════════════════════════════════════════════════════════════════════════
// ENTITIES & RELATIONSHIPS
//
// Example (Tic Tac Toe):
//   Game, Board, Player
// ═══════════════════════════════════════════════════════════════════════════

- package
    - size: small, medium, large ( can be extendible )
- locker
    - compartment
        - state: OCCUPIED | AVIALABLE
        - access code
            - expiry
- delivery driver
- customer


// ═══════════════════════════════════════════════════════════════════════════
// CLASS DESIGN
//
// Example (Tic Tac Toe):
//   class Game:
//     - board: Board
//     - currentPlayer: Player
//     + makeMove(row, col) -> bool
// ═══════════════════════════════════════════════════════════════════════════

class AccessCode
{
    string code;
    Date expiry;

    bool isExpired();

    AccessCode()
    {
        code == hash();
        let expiry = new Date();
        expiry = expirty.setDate(expirty.getDate() + 7);
    }
}

class Compartment
{
    state: OCCUPIED | AVIALABLE;
    AccessCode accessCode?;
    PackageSize size: SMALL | MEDIUM | LARGE;

    Compartment(size);

    string placePackage(); // gen access code and update status to occupied.
    void open(string accessCode); // check for expiry and open if success.
    bool tryReserve()
    {
        lock(this) {
            if (state != AVAILABLE)
                return false;

            state = OCCUPIED;
            return true;
        }
    }
}
class Locker
{
    Compartment[] compartments;
    Map<string, number> codeToCompartmentMap;

    Locker();

    public string depositPackage(Packagesize size); // calls findemptyCompartment
    public void retrievePackage(string accessCode); // lookup map to find compartment index and open it using code

    private number findCompartment(string accessCode); // find which compartment the package is in.

    private Compartment findEmptyCompartment(PakageSize size);
}


// ═══════════════════════════════════════════════════════════════════════════
// IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════════
number findEmptyCompartment(size)
{
    let index = compartments.findIndex(compartment => compartment.state === AVIALABLE && compartment.size === size);

    if(index === -1)
        throw Error("Compartment for package size not available");
    
    return index;
}

string placePackage()
{
    this.accessCode = new AccessCode();
    state = OCCUPIED;

    return this.accessCode.code;
}

string depositPackage(size)
{
    let index = findEmptyCompartment(size);
    let compartment = compartments[index].tryReserve();
    if(!compartment)
        throw new Error('Concurrent access, try again');
    let code = compartment.placePackage();

    codeToCompartmentMap[code] = index;

    return code;
}

void pickup(string code)
{
    // validate code and expiry
    if(!(code in codeToCompartmentMap))
        throw new Error('Invalid code');

    let compartmentIndex = codeToCompartmentMap[code];

    let compartment = compartments[compartmentIndex]
    if(compartment.accessCode?.isExpired())
        throw new Error('Code expired');

    //make container available and remove accesscode
    compartment.state = AVAILBLE;
    compartment.accessCode = null;
}


// ═══════════════════════════════════════════════════════════════════════════
// EXTENSIBILITY
// ═══════════════════════════════════════════════════════════════════════════

