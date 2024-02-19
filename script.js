let x_svg = `    <svg aria-label="X" role="img" viewBox="0 0 128 128" style="visibility: visible;">
<path d="M16,16L112,112"
    style="stroke: rgb(84, 84, 84); stroke-dasharray: 135.764; stroke-dashoffset: 0;"></path>
<path class="hFJ9Ve" d="M112,16L16,112"
    style="stroke: rgb(84, 84, 84); stroke-dasharray: 135.764; stroke-dashoffset: 0;"></path>
</svg>`;
let o_svg = ` <svg jsname="D7yUae" aria-label="O" role="img" viewBox="0 0 128 128" style="visibility: visible;">
<path class="hFJ9Ve" d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"
    style="stroke: rgb(242, 235, 211); stroke-dasharray: 301.635; stroke-dashoffset: 0;"></path>
</svg>`;

// have as little global code as possible. Try tucking as much as you can inside factories or modules
let player = (name, role) => {
    return { name, role }
}

let gameboard = (() => {
    let player1 = player('player1', 'x');
    let player2 = player('player2', 'o');
    let turn = player1;
    let game = new Array(9).fill(undefined);

    let add_x = (indexOfBox, event) => {
        if (game[indexOfBox] !== undefined) {
            return;
        }
        game.splice(indexOfBox, 1, 'x');
        event.target.innerHTML = x_svg;
    }
    let add_y = (indexOfBox, event) => {
        if (game[indexOfBox] !== undefined) {
            return;
        }
        game.splice(indexOfBox, 1, 'o');
        event.target.innerHTML = o_svg;
    }

    /* 
    the problem was that in order to remove event listeners, you need to have a reference to the function that was added as an event listener.
    and sicne ClickHandler needed the event object, I had to wrap it in another function to pass the event object to it.
    so we're passing each time a new funciton and can't remove it later.
    the solution was 
    */

    let addListener = () => {
        let boxes = document.querySelectorAll('.box');
        let clickHandler = (box) => {
            return (event) => {
                let box_index = Array.from(boxes).indexOf(box);
                if (turn === player1 && game[box_index] === undefined) {
                    add_x(box_index, event);
                    turn = player2;
                } if (turn === player2 && game[box_index] === undefined) {
                    add_y(box_index, event);
                    turn = player1;
                }
                let winner = checkWinner();
                if (winner !== undefined) {
                    boxes.forEach(box => {
                        box.removeEventListener('click', box.handler);
                    });
                    if (winner === 'x') {
                        console.log('player1 wins');
                    } else if (winner === 'o') {
                        console.log('player2 wins');
                    } else if (winner === 'tie') {
                        console.log('winner is ',winner);
                    }

                }
            }
        };

        boxes.forEach(box => {
            let handler = clickHandler(box);
            box.addEventListener('click', handler);
            box.handler = handler;
        });
    }

    let checkWinner = () => {
        if (game[0] === game[1] && game[1] === game[2]) {
            return game[0];
        }
        if (game[3] === game[4] && game[4] === game[5]) {
            return game[3];
        }
        if (game[6] === game[7] && game[7] === game[8]) {
            return game[6];
        }
        if (game[0] === game[3] && game[3] === game[6]) {
            return game[0];
        }
        if (game[1] === game[4] && game[4] === game[7]) {
            return game[1];
        }
        if (game[2] === game[5] && game[5] === game[8]) {
            return game[2];
        }
        if (game[0] === game[4] && game[4] === game[8]) {
            return game[0];
        }
        if (game[2] === game[4] && game[4] === game[6]) {
            return game[2];
        }
        if (game.every(box => box != undefined)) {
            return 'tie';
        }
    };
    return {
        addListener
    };
}
)()

gameboard.addListener();
