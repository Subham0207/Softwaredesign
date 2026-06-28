// ═══════════════════════════════════════════════════════════════════════════
// REQUIREMENTS
//
// Example (Tic Tac Toe):
//   1. Two players alternate placing X and O on a 3x3 grid.
//   2. A player wins by completing a row, column, or diagonal.
//   Out of Scope: UI, AI opponent, networking
// ═══════════════════════════════════════════════════════════════════════════

1. Two players alternate dropping thier discs on a 6 X 7 board.
2. Win Condition: player that matches 4 discs veritically, horizontally, diagonally
3. Disk falling: The disk falls in the lowest available row of the column the player chooses the drop thier disk in.
4. Draw Condition: The Board fills up and no more disks can dropped, then its a draw.
5. Invalid cases: 
    a. A column is full, and a Player selects that column.
    b. Out of turn
    c. Game Over already
    d. Out of Bounds
Out of Scope: UI, AI opponent, networking.


// ═══════════════════════════════════════════════════════════════════════════
// ENTITIES & RELATIONSHIPS
//
// Example (Tic Tac Toe):
//   Game, Board, Player
// ═══════════════════════════════════════════════════════════════════════════

1. Player
2. Board
3. disc
4. GameState
5. GameEntity: controls the game


// ═══════════════════════════════════════════════════════════════════════════
// CLASS DESIGN
//
// Example (Tic Tac Toe):
//   class Game:
//     - board: Board
//     - currentPlayer: Player
//     + makeMove(row, col) -> bool
// ═══════════════════════════════════════════════════════════════════════════

Interface IGameEntity {
    function move(column: int, Player player);
    function checkWin();
    function checkGameDraw();
    function switchTurn();
    function setPlayerWon(i,j);
}
Interface IBoard {
    function place(columnNumber: int, disc: string);
    function getCurrentEmptyCells();
    function calculateDiskFall();
    function getPosOfLastDisc();
}

Class Player{
    id: string;

    Constructor(id: string)
    {
        this.id = id;
    }

    function getId(){return this.id}
}

Class Board{
    
    columns: int;
    rows: int;

    currentEmptyCells: int;

    lastDiscPos = {
        x: -1, y = -1
    };

    board: Array<Array<string>>;

    constructor(columns = 7, rows = 6)
    {
        this.columns = columns;
        this.rows = rows;

        this.currentEmptyCells = rows * columns;

        board = Array.from({length: rows}, () => Array(columns).fill('.'));
    }

    function place(columnNumber: int, disk: string)
    {
        //drop player disk in the column number
        if(board[0][columNNumber] !== '.')
        {
            throw Error('That Column is full');
        }
        calculateDiskFall();
        cell--;
    }
    function calculateDiskFall()
    {
        // calculate last disc fall
        
        lastDiscPos = {x: i,y: j};
    }

    function getPosOfLastDisc()
    {
        return lastDiscPos;
    }

    function getCurrentEmptyCells(){return this.currentEmptyCells;}
}

Class GameEntity implments IGameEntity {

    Player player1;
    Player player2;
    Player activePlayer;

    switchTurn();

    Board board;

    isGameFinished: bool;
    PlayerWon? playerWon;

    constructor()
    {
        player1 = new Player('X');
        player2 = new Payer('Y');
        activePlayer = player1;
        board = new Board();
    }

    function move(column: int)
    {
        if(isGameFinished)
            throw Error("Game Already over");

        if(column >= board.getColumns())
            throw Error('Out of bounds');

        board.place(column, activePlayer.getId());
    }

    function checkGameDraw()
    {
        if(board.getCurrentEmptyCells() === 0)
        {
            return true;
        }
        return false;
    }

    function switchTurn()
    {
        if(activePlayer === player1)
            activePlayer = player2;
        activePlayer = player1;
    }

    function setPlayerWon(i,j)
    {

    }

    function checkWin(i,j)
    {
        function dfs(x,y, direction)
        {
            if(x === board.getRows() || y === board.getColumns() || x  < 0 || y < 0)
                return 0;
            switch(direction)
                case 'x+1':{
                    if(board[x+1][y] === board[x][y])
                        return dfs(x+1,y) + 1;
                    return 0;
                }
                case 'x-1':{
                    if(board[x-1][y] === board[x][y])
                        return dfs(x-1,y) + 1;
                    return 0;
                }

                // and so on...

        }


        if(dfs(i,j, 'x+1') + dfs(i,j, 'x-1') === 3 || dfs(i,j, 'y+1') + dfs(i,j, 'y-1') === 3 || dfs(i,j, 'x+1, y+1') + dfs(i,j, 'x-1, y-1') === 3)
        {
            setPlayerWon(i,j);
            return true;
        }


        return false;
    }
}


// ═══════════════════════════════════════════════════════════════════════════
// IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════════

function move(column: int)
{
    if(isGameFinished)
        throw Error("Game Already over");

    if(column >= board.getColumns())
        throw Error('Out of bounds');

    board.place(column, activePlayer.getId());

    const pos = board.getPosOfLastDisc();

    if(pos.x === -1 || pos.y  === -1)
        throw Error('Invalid disc position');

    if(checkWin(pos.x, pos.y))
    {
        isGameFinished = true;
        return;
    }
    if(checkGameDraw())
    {
        isGameFinished = true;
        return;
    }

    switchTurn();
}


// ═══════════════════════════════════════════════════════════════════════════
// EXTENSIBILITY
// ═══════════════════════════════════════════════════════════════════════════

