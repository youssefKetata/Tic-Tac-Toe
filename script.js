let x_svg = `<svg class='x' aria-label="X" role="img" viewBox="0 0 128 128" style="visibility: visible;">
<path d="M16,16L112,112"
    style="stroke: rgb(84, 84, 84); stroke-dasharray: 135.764; stroke-dashoffset: 0;"></path>
<path class="hFJ9Ve" d="M112,16L16,112"
    style="stroke: rgb(84, 84, 84); stroke-dasharray: 135.764; stroke-dashoffset: 0;"></path>
</svg>`;
let o_svg = ` <svg class='x' jsname="D7yUae" aria-label="O" role="img" viewBox="0 0 128 128" style="visibility: visible;">
<path class="hFJ9Ve" d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"
    style="stroke: rgb(242, 235, 211); stroke-dasharray: 301.635; stroke-dashoffset: 0;"></path>
</svg>`;

let player = (name, role) => {
    return { name, role }
}

let gameboard = (() => {
    let player1 = player('player1', 'x');
    let player2 = player('player2', 'o');
    let turn = player1;
    let game = new Array(9).fill(undefined);
    let player1_display = document.querySelector('.player1');
    let player2_display = document.querySelector('.player2');

    let add_x = (indexOfBox, target) => {
        game.splice(indexOfBox, 1, 'x');
        target.innerHTML = x_svg;
        player1_display.classList.toggle('player_turn');
        player2_display.classList.toggle('player_turn');
    }
    let add_y = (indexOfBox, target) => {
        game.splice(indexOfBox, 1, 'o');
        target.innerHTML = o_svg;
        player1_display.classList.toggle('player_turn');
        player2_display.classList.toggle('player_turn');
    }

    let addListener = () => {
        let boxes = document.querySelectorAll('.box');
        let play_ground = document.querySelector('.play_ground');
        let clickHandler = (event) => {
            let box_index = Array.from(boxes).indexOf(event.target);
            if (box_index >= 0 && turn === player1 && game[box_index] === undefined) {
                add_x(box_index, event.target);
                turn = player2;
            } if (box_index >= 0 && turn === player2 && game[box_index] === undefined) {
                add_y(box_index, event.target);
                turn = player1;
            }
            let winner = checkWinner();
            if (winner !== undefined) {
                play_ground.removeEventListener('click', clickHandler);
                let w = document.querySelector('.winner-box');
                w.classList.add('winner');
                w.innerHTML = winner === 'tie' ? 'Tie' : `${winner} wins`;
                // remove the winner class after 3 seconds or user clikc on the screen
                setTimeout(() => {
                    w.classList.remove('winner');
                    resetGame();
                }, 3000);

                if (winner === 'x') {
                    console.log('player1 wins');
                } else if (winner === 'o') {
                    console.log('player2 wins');
                } else if (winner === 'tie') {
                    console.log('winner is ', winner);
                }

            }

        };
        play_ground.addEventListener('click', clickHandler);
    }

    let winnCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ];

    let checkWinner = () => {
        for (let i = 0; i < winnCombo.length; i++) {
            let combo = winnCombo[i];
            if (game[combo[0]] === game[combo[1]] && game[combo[1]] === game[combo[2]] && game[combo[0]] !== undefined) {
                return game[combo[0]];
            } else if (game.every(box => box !== undefined)) {
                return 'tie';
            }
        }
    };
    return {
        addListener,
        game
    };
}
)()

function resetGame() {
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.innerHTML = '';
    });
    gameboard.game.forEach((box, index) => {
        gameboard.game[index] = undefined;
    }
    );
    gameboard.addListener();
}

gameboard.addListener();
//score
//player vs ai
//player name change
//diffulties
