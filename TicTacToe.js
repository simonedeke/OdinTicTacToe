
const GameBoard = (() => {
    
    let _Board = [[null, null, null],
                    [null,null,null],
                    [null,null,null]];

    let _playerTurn = false;
    let _win = false;
    let _tie = false;

    const _Player = (name) => {
        let _wins = 0;
        
        const getName = () => name;

        const setName = (newName) => name = newName; 

        const addWin = () => _wins++;

        const getWins = () => _wins;

        const resetWins = () => _wins = 0;

        return {getName, setName, addWin, getWins, resetWins};
    };

    const _player1 = _Player('Player 1');
    const _player2 = _Player('Player 2');

    const _player1Img = document.createElement('img');
    _player1Img.src = 'Images/xmarker-white.png';
    _player1Img.setAttribute('height','48px');
    _player1Img.setAttribute('width','48px');

    const _player2Img = document.createElement('img');
    _player2Img.src = 'Images/omarker-white.png';
    _player2Img.setAttribute('height','48px');
    _player2Img.setAttribute('width','48px');

    let _playerWinDiv
    
    const displayBoard = () => {
        // Create player and score displays
        let fullDisplay = document.createElement('div');
        fullDisplay.className = 'PlayerBox';

        let p1Div = document.createElement('div');
        p1Div.className = 'Player1';
        p1Div.appendChild(_player1Img);
        let p1NameDiv = document.createElement('div');
        p1NameDiv.className = 'Player1Name';
        p1NameDiv.innerText = _player1.getName();
        p1Div.appendChild(p1NameDiv);

        let scoreDiv = document.createElement('div');
        scoreDiv.className = 'Score';
        let scoreImgDiv = document.createElement('div');
        scoreImgDiv.className = 'ScoreImg';
        scoreImgDiv.innerText = 'Score';
        let p1ScoreDiv = document.createElement('div');
        p1ScoreDiv.className = 'Player1Score';
        p1ScoreDiv.innerText = '0';
        let p2ScoreDiv = document.createElement('div');
        p2ScoreDiv.className = 'Player2Score';
        p2ScoreDiv.innerText = '0';
        scoreDiv.appendChild(scoreImgDiv);
        scoreDiv.appendChild(p1ScoreDiv);
        scoreDiv.appendChild(p2ScoreDiv);

        let p2Div = document.createElement('div');
        p2Div.className = 'Player2';
        p2Div.appendChild(_player2Img);
        let p2NameDiv = document.createElement('div');
        p2NameDiv.className = 'Player2Name';
        p2NameDiv.innerText = _player2.getName();
        p2Div.appendChild(p2NameDiv);

        fullDisplay.appendChild(p1Div);
        fullDisplay.appendChild(scoreDiv);
        fullDisplay.appendChild(p2Div);

        let outputBoard = document.createElement('div');
        outputBoard.className = 'GameBoard';

        //Create tic tac toe board
        _Board.forEach((row, rIndex) => {
            row.forEach((column, cIndex) => {
                let outputSquare = document.createElement('div');
                outputSquare.className = 'Square';
                if(column == null){
                    let _unchosenImage = document.createElement('img');
                    _unchosenImage.src = 'Images/blank-square.png';
                    _unchosenImage.setAttribute('height','48px');
                    _unchosenImage.setAttribute('width','48px');
                    outputSquare.appendChild(_unchosenImage)
                }
                else if(column) {
                    outputSquare.appendChild(_player1Img);
                }
                else {
                    outputSquare.appendChild(_player2Img);
                }
                outputSquare.addEventListener("click", (e => { _sqrClicked(e,rIndex, cIndex);}));
                outputBoard.append(outputSquare); 
            })
        });

        fullDisplay.appendChild(outputBoard);

        //Create contorl buttons
        let controlDiv = document.createElement('div');
        controlDiv.className = 'Controls';

        let newGameButton = document.createElement('button');
        newGameButton.id = 'NewGame';
        newGameButton.innerText = 'New Game';
        newGameButton.addEventListener("click", _newGame);

        let resetButton = document.createElement('button');
        resetButton.id = 'Reset';
        resetButton.innerText = 'Reset Board';
        resetButton.addEventListener("click", _resetBoard);

        controlDiv.appendChild(newGameButton);
        controlDiv.appendChild(resetButton);

        fullDisplay.appendChild(controlDiv);

        return fullDisplay;
    };
    
    const _sqrClicked = (e, rIndex, cIndex) => {
        let _img = e.target;

        if(_img.children.length != 0){
            _img = _img.children[0];
        }

        //if square is not taken, add piece to game board
        if(_img.src.substring(_img.src.length - 9, _img.src.length) == 'white.png'){

            //console.log("this has already been taken");
        }
        else {
            if(_playerTurn) {
                _img.src = _player2Img.src;
                _Board[rIndex][cIndex] = false;
            }
            else {
                _img.src = _player1Img.src;
                _Board[rIndex][cIndex] = true;
            }
            _playerTurn = !_playerTurn;
        }

        if(!_win) {_checkWin();}
    } 

    const _xWin = () => {
        if(!_win) {
            //display x the winner
            let _resultBox = document.createElement('div');
            _resultBox.id = 'ResultBox';
            _resultBox.innerText = _player1.getName() + ' Wins The Game';
            document.querySelector('.Container').append(_resultBox);

            //update score
            _player1.addWin();
            document.querySelector('.Player1Score').innerText = _player1.getWins();

            _win = true;
        }
    }

    const _ohWin = () => {
        if(!_win) {
            //display o the winner
            let _resultBox = document.createElement('div');
            _resultBox.id = 'ResultBox';
            _resultBox.innerText = _player2.getName() + ' Wins The Game';
            document.querySelector('.Container').append(_resultBox);

            //update score
            _player2.addWin();
            document.querySelector('.Player2Score').innerText = _player2.getWins();

            _win = true;
        }
    }

    const _tieGame = () => {
        if(!_tie) {
            //display tie game
            let _resultBox = document.createElement('div');
            _resultBox.id = 'ResultBox';
            _resultBox.innerText = "Cat's Game (Tie Game)";
            document.querySelector('.Container').append(_resultBox);

            _tie = true;
        }
    }

    const _newGame = () => {
        let _p1TempName = window.prompt("Enter Player's Name");
        let _p2TempName = window.prompt("Enter Player's Name");

        _player1.setName(((_p1TempName == null) || (_p1TempName.length == 0))  ? 'Player 1' : _p1TempName);
        _player2.setName(((_p2TempName == null) || (_p2TempName.length == 0)) ? 'Player 2' : _p2TempName);

        document.querySelector('.Player1Name').innerText = _player1.getName();
        document.querySelector('.Player2Name').innerText = _player2.getName();
        document.querySelector('#NewGame').innerText = "New Game";

        _resetBoard();

        document.querySelector('.Player1Score').innerText = 0;
        _player1.resetWins();
        document.querySelector('.Player2Score').innerText = 0;
        _player2.resetWins();
    }

    const _resetBoard = () => {
        _Board = [[null, null, null],
                    [null,null,null],
                    [null,null,null]];
        //reste gameboard squares to blank images
        Array.from(document.getElementsByClassName('Square')).forEach(element => {
            element.children[0].src = 'Images/blank-square.png';
        });
        //remove winner/tie game box if displayed
        if(document.getElementById('ResultBox') != null) {
            document.querySelector('.Container').removeChild(document.getElementById('ResultBox'));
        }
        _win = false;
        _tie = false;
        
    }

    const _checkWin = () => {
        let v1x = 0;
        let v2x = 0;
        let v3x = 0;
        let v1oh = 0;
        let v2oh = 0;
        let v3oh = 0;
        let crossL2RX = 0;
        let crossR2LX = 0;
        let crossL2ROh = 0;
        let crossR2LOh = 0;
        
        _Board.forEach((row, index) => {
            //checks horizontal _wins
            if(row.every((currentValue) => currentValue == true)) {_xWin();}
            if(row.every((currentValue) => currentValue == false)) {_ohWin();}
            
            //counts vertical x's and o's
            if(row[0] != null) {row[0] ? v1x++ : v1oh++;}
            if(row[1] != null) {row[1] ? v2x++ : v2oh++;}
            if(row[2] != null) {row[2] ? v3x++ : v3oh++;}

            //check if a vertical win has occurred
            if(v1x >2) {_xWin();}
            if(v2x >2) {_xWin();}
            if(v3x >2) {_xWin();}
            if(v1oh >2) {_ohWin();}
            if(v2oh >2) {_ohWin();}
            if(v3oh >2) {_ohWin();}

            //counts diagonal x's and o's
            if(index == 0) {
                if(row[0] != null) {
                    row[0] ? crossL2RX++ : crossL2ROh++;
                }
                if(row[2] != null) {
                    row[2] ? crossR2LX++ : crossR2LOh++;
                }   
            }
            if(index == 1 && (row[1] != null)) {
                row[1] ? crossL2RX++ : crossL2ROh++;
                row[1] ? crossR2LX++ : crossR2LOh++;
            }
            if(index == 2) {
                if(row[0] != null) {
                    row[0] ? crossR2LX++ : crossR2LOh++;
                }
                if(row[2] != null) {
                    row[2] ? crossL2RX++ : crossL2ROh++;
                }   
            }

            //check if diagonal win has occurred
            if(crossL2RX >2) {_xWin();}
            if(crossR2LX >2) {_xWin();}
            if(crossL2ROh >2) {_ohWin();}
            if(crossR2LOh >2) {_ohWin();}
            
            
        });
        //check for tie game
        if(!_win && (!(_Board.some((innerArray) => innerArray.some((innerValue) => innerValue == null))))) {_tieGame();}
    }


    return {displayBoard};
})();

document.querySelector('.Container').append(GameBoard.displayBoard());

