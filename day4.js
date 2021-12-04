/**
 * This started out nicely then I realised I misread and I couldn't be arsed to restart so this became a right mess :facepalm:
 */
import fs from 'fs';

const day4 = () => {
    let data;
    try {
        data = fs.readFileSync('inputs/day_4.txt', 'utf8');
    } catch (err) {
        console.error(err)
    }

    const input = data.split('\n\n');
    const callingNumbers = input[0].split(',').map(number => Number(number.trim()));
    input.splice(1, 1);
    const boardsInput = input;
    const boards = boardsInput.map(board => board.split('\n').map(row => row.split(' ').filter(entry => entry != '').map(number => Number(number))));

    const sortedBoards = boards.map(board => {
        return [...board, ...sortBoardCols(board)];
    });

    const sortedNumbersSliding = callingNumbers
    .reduce((agg, item, idx, arr) => {
        if(idx >= sortedBoards[0][0].length) {
            agg.push(arr.slice(0, idx));
        }
        return agg;
    }, []);


    let found = false;
    let foundLast = false;
    let boardsWon = [];
    sortedNumbersSliding.forEach(row => {
        sortedBoards.forEach((sortedBoard, idx) => {
            sortedBoard.forEach(potentialWinner => {
                let count = 0;
                row.forEach(number => {
                    if(potentialWinner.includes(number)) {
                        count += 1;
                    }
                })
                if(count === potentialWinner.length) { // Pt 2.
                    if(boardsWon.length !== sortedBoards.length-1) {
                        if(!boardsWon.includes(idx)){
                            boardsWon.push(idx);
                        }
                    } else if (!foundLast) {
                        foundLast = true;
                        const winningNumber = row[row.length-1];
                        const flatBoard = boards[idx].flat(1);
                        row.forEach(number => {
                            flatBoard.splice(flatBoard.indexOf(number), flatBoard.indexOf(number) === -1 ? 0 : 1);
                        });
                        const answer = flatBoard.reduce((a, b) => a+b, 0) * winningNumber;
                        console.log(`Day 4: Last Board ${answer} `);
                    }
                }
                if(count === potentialWinner.length && !found) { // Pt 1.
                    found = true;
                    const winningNumber = callingNumbers[row.length - 1];
                    const flatBoard = boards[idx].flat(1);
                    row.forEach(number => {
                        flatBoard.splice(flatBoard.indexOf(number), flatBoard.indexOf(number) === -1 ? 0 : 1);
                    });
                    const answer = flatBoard.reduce((a, b) => a+b, 0) * winningNumber;
                    console.log(`Day 4: First Board ${answer}`);
                }
            })
        })
    });
}

const sortBoardCols = (board) => {
    const init = Array(board[0].length);
    return board.reduce((agg, row) => {
        return row.map((item, idx) => {
            return agg[0] === undefined ? [item] : [item].concat(agg[idx]);
        });
    }, init).map(row => row.reverse());
}

export default day4