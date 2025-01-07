/* 28/11/2024 
*  It's working, however it needs visual updates 
*/

const word = "mosca";

window.onload = generateSquares;

let controller = 0;  // It's used to control how many time any key is pressed
let trial;
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        if (controller == 5) {
            compare();
            controller = 0;
        }
    } else {
        if (controller == 0) {
            trial = event.key;
            controller++;
        } else if (controller < 5) {
            trial += event.key;
            controller++;
        }
        console.log(trial);
        console.log(controller);
        changeSquares(); 
    }
});


function generateSquares() {

    let container = document.getElementById('container');

    for (let row = 0; row < 6; row++) {

        for (let col = 0; col < 5; col++) {

            let div = document.createElement('div');
            div.className = `square row-${row} col-${col}`;

            container.appendChild(div);

        }

    }

}


let nextRow = 0;
function changeSquares() {

    for (let i = 0; i < controller; i++) {

        document.querySelector(`.square.row-${nextRow}.col-${i}`).innerHTML = trial[i];

    }

}


let attempts = 1;
let victory = 0;

function compare() {

    let attemptsDisplay = document.getElementById('attemptsDisplay');

    if (attempts <= 6 && victory == 0) {

        for (let i = 0; i < 5; i++) {
            
            /* 
            *  Tests if the char inserted by the user
            *  matches with the char in the same index 
            *  from the hidden word
            */
            if (trial[i] == word[i]) {
    
                document.querySelector(`.square.row-${nextRow}.col-${i}`).style.backgroundColor = "green";
            
            } else {
            
                /* 
                *  Tests if the char matches with the hidden word's
                *  char in a different index
                */
                for (let j = 1; j < 5; j++) {
            
                    if (trial[i] == word[j]) {
    
                        document.querySelector(`.square.row-${nextRow}.col-${i}`).style.backgroundColor = "orange";
            
                    }
            
                }
            
            }
            
        }

        attemptsDisplay.textContent = `Tentativas: ${attempts}`;

        nextRow++;
        attempts++;

        if (trial == word) {

            document.querySelector('.congratulations').classList.add('show');

            attempts = 6;
            victory = 1;

        } else if (attempts == 7 && victory != 1) {

            let h2 = document.createElement('h2');
            h2.textContent = `Infelizmente você perdeu!!! A palavra oculta era: ${word}`;
            document.querySelector(`.gameover-bottom`).appendChild(h2);
            document.querySelector(`.gameover`).classList.add('show');

        }

    } 

}