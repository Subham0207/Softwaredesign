
# implment make Move function on the connect four board

`
    function makeMove(player, column): boolean
    {
        // edge cases to validate
        // - column out of bounds
        // - column full
        // - wrong player turn

        // core logic
        // -  drop the disk to the lowest available column index
        // - check for win
        /  - check for draw
        // - update current player


        if(column < 0 || column > 9)
        {
            throw new Error('Invalid column');
        }
        if(board.isColumnFull(Column))
        {
            throw new Error('column is full');
        }

        if(current_player !== player)
        {
            throw new Error('Wrong player turn');
        }

        let row = board.dropDisk(Column, player.getColor());

        if(board.checkWin(row, column))
        {
            gamestate = WON;
            winner = player;
            return;
        }

        if(board.isFull())
        {
            gamestate = DRAW;
            return;
        }

        switchCurrentPlayer();
    }

    class board
    {
        isColumnFull(column): bool
        {
            return this.grid[0][column] !== null;
        }

        dropDisk(column, color)
        {
            let row = 0;
            while(this.grid[row+1][column] === null)
            {
                row++;
            }

            this.grid[row][column] = color;

            return row;
        }

        checkWin(row, column)
        {
            // horizontal
            // veritical
            // two diagonal

            let direction = [[0,1],[1,0],[-1,1],[1,1]];
            let color = grid[row][column];
            let count = 0;
            for(let [dr, dc] of directions)
            {
                count += countInDirection(r,dr,c, dc, color);
                count += countInDirection(r,-dr,c,-dc,color);
                if(count >= 4)
                {
                    return true;
                }
            }

            return false;
        }

        countInDirection(row,dr, column,dc color)
        {
            let count = 0;
            for(let i=0;i<4;i++)
            {
                if(grid[row+dr][column+dc] === color)
                {
                    count++;
                    row = row+dr;
                    column = column+dc;
                }
                break;
            }

            return count;
        }
        
    }
`
