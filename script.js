const word = "mosca";
let keyboardArray = [];

window.onload = function() {
    generateSquares();
    generateKeyboard();
};

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
        changeSquares(); 
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace') {
        if (controller > 0) {
            trial = trial.slice(0, -1);
            controller--;
            document.querySelector(`.square.row-${nextRow}.col-${controller}`).innerHTML = '';
        }
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


function generateKeyboard() {

    for (let row = 0; row < 3; row++) {

        switch (row) {
            case 0:

                keyboardArray = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];

                let keyboard1 = document.getElementById('keyboard-section1');

                for (let col = 0; col < 10; col++) {

                    let div = document.createElement('div');
                    div.className = `box row-${row} col-${col}`;
                    
                    keyboard1.appendChild(div);
        
                    document.querySelector(`.box.row-${row}.col-${col}`).innerHTML = keyboardArray[col];

                }

                break;
            
            case 1:

                keyboardArray = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];

                let keyboard2 = document.getElementById('keyboard-section2');

                for (let col = 0; col < 9; col++) {

                    let div = document.createElement('div');
                    div.className = `box row-${row} col-${col}`;
                    
                    keyboard2.appendChild(div);
        
                    document.querySelector(`.box.row-${row}.col-${col}`).innerHTML = keyboardArray[col];

                }

                break;

            default:

                keyboardArray = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

                let keyboard3 = document.getElementById('keyboard-section3');

                for (let col = 0; col < 7; col++) {

                    let div = document.createElement('div');
                    div.className = `box row-${row} col-${col}`;
                    
                    keyboard3.appendChild(div);
        
                    document.querySelector(`.box.row-${row}.col-${col}`).innerHTML = keyboardArray[col];

                }

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
let rightLetters = [];

function compare() {

    keyboardArray = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

    let row = 0;

    if (attempts <= 6 && victory == 0) {

        for (let i = 0; i < 5; i++) {
            
            /* 
            *  Tests if the char inserted by the user
            *  matches with the char in the same index 
            *  from the hidden word
            */
            if (trial[i] == word[i]) {
    
                document.querySelector(`.square.row-${nextRow}.col-${i}`).style.backgroundColor = "green";

                /*
                *   Change the keyboard when some char is correct
                */
                for (let count = 0; count < keyboardArray.length; count++) {

                    if (trial[i] == keyboardArray[count]) {

                        rightLetters.push(trial[i]);

                        if (count < 10) {

                            row = 0;
                            document.querySelector(`.box.row-${row}.col-${count}`).style.backgroundColor = "green";

                        } else if (count < 19) {

                            row = 1;
                            count -= 10;
                            document.querySelector(`.box.row-${row}.col-${count}`).style.backgroundColor = "green";
                            count += 10;

                        } else {

                            row = 2;
                            count -= 19;
                            document.querySelector(`.box.row-${row}.col-${count}`).style.backgroundColor = "green";
                            count += 19;

                        }

                    }

                }

            } else {
            
                /* 
                *  Tests if the char matches with the hidden word's
                *  char in a different index
                */
                for (let j = 1; j < 5; j++) {
            
                    if (trial[i] == word[j]) {
    
                        document.querySelector(`.square.row-${nextRow}.col-${i}`).style.backgroundColor = "orange";

                        /*
                        *   Change the keyboard when some char is correct but not in the same index
                        */
                        for (let count = 0; count < keyboardArray.length; count++) {

                            if (trial[i] == keyboardArray[count] && keyboardArray[count] != rightLetters[count]) {
        
                                if (count < 10) {
        
                                    row = 0;
                                    document.querySelector(`.box.row-${row}.col-${count}`).style.backgroundColor = "orange";
        
                                } else if (count < 19) {
        
                                    row = 1;
                                    count -= 10;
                                    document.querySelector(`.box.row-${row}.col-${count}`).style.backgroundColor = "orange";
                                    count += 10;
        
                                } else {
        
                                    row = 2;
                                    count -= 19;
                                    document.querySelector(`.box.row-${row}.col-${count}`).style.backgroundColor = "orange";
                                    count += 19;
        
                                }
        
                            }
        
                        }
            
                    } else {

                        /*
                        *   Change the keyboard when the char doesn't exist
                        */
                        for (let count = 0; count < keyboardArray.length; count++) {

                            if (trial[i] == keyboardArray[count] && keyboardArray[count] != rightLetters[count]) {
                
                                if (count < 10) {
                
                                    row = 0;
                                    document.querySelector(`.box.row-${row}.col-${count}`).style.backgroundColor = "#999";
                
                                } else if (count < 19) {
                
                                    row = 1;
                                    count -= 10;
                                    document.querySelector(`.box.row-${row}.col-${count}`).style.backgroundColor = "#999";
                                    count += 10;
                
                                } else {
                
                                    row = 2;
                                    count -= 19;
                                    document.querySelector(`.box.row-${row}.col-${count}`).style.backgroundColor = "#999";
                                    count += 19;
                
                                }
                
                            }
                
                        }

                    }
            
                }
            
            }    

        }

        nextRow++;
        attempts++;

        if (trial == word) {

            let h2 = document.createElement('h2');
            h2.textContent = `Parabéns, você acertou a palavra em ${attempts-1} tentativas!!!`;
            document.querySelector('.congratulations-bottom').appendChild(h2);

            let button = document.createElement('button');
            button.textContent = 'Jogar Novamente'
            document.querySelector('.congratulations-bottom').appendChild(button);

            document.querySelector('.congratulations').classList.add('show');

            attempts = 6;
            victory = 1;

        } else if (attempts == 7 && victory != 1) {

            let h2 = document.createElement('h2');
            h2.textContent = `Infelizmente você perdeu!!! A palavra oculta era: ${word}`;
            document.querySelector(`.gameover-bottom`).appendChild(h2);

            let button = document.createElement('button');
            button.textContent = 'Jogar Novamente'
            document.querySelector('.gameover-bottom').appendChild(button);

            document.querySelector(`.gameover`).classList.add('show');

        }

    } 

    console.log(rightLetters)

}