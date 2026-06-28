Practice writing each sections multiples times to get a feel for it.
Example: You are already given the requirement, create entities and relationship.

# Requirements
1. Primary capabilities: What operation must this system support
2. Rules and completions:
    a. Define Success
    b. failure
    c. When the system stops 
    d. State transitions
3. Error handling: System response when inputs or actions are invalid.
4. Scope boundary:
    a. In scope
    b. out of scope

# Entities and Relationships and state modelling
Examples Entities:
- Game
- Board
- Player

Relationships:
- Game -> Board
- Game -> Player (2x)

State modelling help describe state transition relationship easily
1. See Amazon Locker problem.

# Class Design
For each entity:
1. Define the state using the requirement: member variables
2. Define the behaviour requirement: methods

`
class Game:
  - board: Board
  - playerX: Player
  - playerO: Player
  - currentPlayer: Player
  - state: GameState (IN_PROGRESS, WON, DRAW)
  - winner: Player? (null if no winner)

  + makeMove(player, row, col) -> bool
  + getCurrentPlayer() -> Player
  + getGameState() -> GameState
  + getWinner() -> Player?
  + getBoard() -> Board
`
# Implementation
Focus on most important methods
Can use patterns like: Singleton, Factory, Builder, etc

1. Happy Path
2. Edge cases
    a. invalid inputs
    b. illigal operations
    c. out of range values
    d. Other calls that voilate correct system state
    e. Timeout ?

## Verification
Verify your own code and catch issues.

1. initial state
2. state transition tick by tick

`
Initial: board empty, currentPlayer = X
makeMove(X, 0, 0) → board[0][0] = X, currentPlayer = O
makeMove(O, 1, 1) → board[1][1] = O, currentPlayer = X
...
`
# Extensibility ( If time allows or are asked specifically )

Interviewer will propose a twist to see if your design can evolve cleanly.

You should only point out where the change will be in. Rather than rewriting the code. Unless asked otherwise.