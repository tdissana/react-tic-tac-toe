import { useState, useEffect } from "react";

function Game() {

    const [matchCount, setmatchCount] = useState(0);
    const [playerName, setPlayerName] = useState("");
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [symbol, setSymbol] = useState('');
    const [space, setSpace] = useState(Array(9).fill(null));

    useEffect(() => {
        
        const [isGameOver, isTie] = evaluate();

        checkResults(isGameOver, isTie);

    }, [symbol, space])

    function startGame(){

        const welcomeWindow = document.getElementsByClassName("welcome-window");
        const playerInfoWindow = document.getElementsByClassName("player-info-window");

        setTimeout(() => {
            welcomeWindow[0].style.display = "none";
            playerInfoWindow[0].style.display = "block";
        }, 1000);
    }

    function getPlayerName(){

        const playerInfoWindow = document.getElementsByClassName("player-info-window");

        if (playerName) {
            setTimeout(() => {
                playerInfoWindow[0].style.display = "none";
                playGame();
            }, 1000);
        } else {
            console.error("Enter Name");
        }
    }

    function checkEnterPress(event) {
        if (event.key === "Enter") {
            getPlayerName();
        }
    }

    function updatePlayerName(event){
        setPlayerName(event.target.value);
    }

    function playGame(){

        setmatchCount(c => c + 1);
        const character = (Math.floor(Math.random() * 2)) === 1 ? "X" : "O";
        setSpace(Array(9).fill(null));
        setSymbol(character);
        
        const gameWindow = document.getElementsByClassName("game-window");
        const gameResultWindow = document.getElementById("gameResultWindow");
        const gridElements = document.getElementsByClassName("grid");

        gridElements[0].style.backgroundColor = "";
        gameWindow[0].style.display = "block";
        gameResultWindow.style.display = "none";
        gridElements[0].style.display = "grid";

        disableAllBoxes(false);
    }

    function updateSpace(index) {
        if (space[index] === null) {
            const updatedArray = [...space];
            updatedArray[index] = symbol;
            setSpace(updatedArray);
            setSymbol(symbol === "X" ? "O" : "X");
        }
    }

    function computerPlay() {
        
        return new Promise(resolve => {

            const boxElements = document.getElementsByClassName("box");
            const boxes = Array.from(boxElements);
            const freeBoxIndices = [];

            boxes.forEach((box, index) => {
                box.disabled = true;
                if (space[index] === null) {
                    freeBoxIndices.push(index);
                }
            });

            const selectedIndex = analyzeSpace(freeBoxIndices);
            resolve(setTimeout(() => {
                updateSpace(selectedIndex);
            }, 1000));
        });       
    }

    function analyzeSpace(freeBoxIndices) {

        if (space[0] === null && space[1] === "O" && space[2] === "O") return 0;
        else if (space[0] === "O" && space[1] === null && space[2] === "O") return 1;
        else if (space[0] === "O" && space[1] === "O" && space[2] === null) return 2;
        else if (space[3] === null && space[4] === "O" && space[5] === "O") return 3;
        else if (space[3] === "O" && space[4] === null && space[5] === "O") return 4;
        else if (space[3] === "O" && space[4] === "O" && space[5] === null) return 5;
        else if (space[6] === null && space[7] === "O" && space[8] === "O") return 6;
        else if (space[6] === "O" && space[7] === null && space[8] === "O") return 7;
        else if (space[6] === "O" && space[7] === "O" && space[8] === null) return 8;
        else if (space[0] === null && space[3] === "O" && space[6] === "O") return 0;
        else if (space[0] === "O" && space[3] === null && space[6] === "O") return 3;
        else if (space[0] === "O" && space[3] === "O" && space[6] === null) return 6;
        else if (space[1] === null && space[4] === "O" && space[7] === "O") return 1;
        else if (space[1] === "O" && space[4] === null && space[7] === "O") return 4;
        else if (space[1] === "O" && space[4] === "O" && space[7] === null) return 7;
        else if (space[2] === null && space[5] === "O" && space[8] === "O") return 2;
        else if (space[2] === "O" && space[5] === null && space[8] === "O") return 5;
        else if (space[2] === "O" && space[5] === "O" && space[8] === null) return 8;
        else if (space[0] === null && space[4] === "O" && space[8] === "O") return 0;
        else if (space[0] === "O" && space[4] === null && space[8] === "O") return 4;
        else if (space[0] === "O" && space[4] === "O" && space[8] === null) return 8;
        else if (space[2] === null && space[4] === "O" && space[6] === "O") return 2;
        else if (space[2] === "O" && space[4] === null && space[6] === "O") return 4;
        else if (space[2] === "O" && space[4] === "O" && space[6] === null) return 6;

        if (space[0] === null && space[1] === "X" && space[2] === "X") return 0;
        else if (space[0] === "X" && space[1] === null && space[2] === "X") return 1;
        else if (space[0] === "X" && space[1] === "X" && space[2] === null) return 2;
        else if (space[3] === null && space[4] === "X" && space[5] === "X") return 3;
        else if (space[3] === "X" && space[4] === null && space[5] === "X") return 4;
        else if (space[3] === "X" && space[4] === "X" && space[5] === null) return 5;
        else if (space[6] === null && space[7] === "X" && space[8] === "X") return 6;
        else if (space[6] === "X" && space[7] === null && space[8] === "X") return 7;
        else if (space[6] === "X" && space[7] === "X" && space[8] === null) return 8;
        else if (space[0] === null && space[3] === "X" && space[6] === "X") return 0;
        else if (space[0] === "X" && space[3] === null && space[6] === "X") return 3;
        else if (space[0] === "X" && space[3] === "X" && space[6] === null) return 6;
        else if (space[1] === null && space[4] === "X" && space[7] === "X") return 1;
        else if (space[1] === "X" && space[4] === null && space[7] === "X") return 4;
        else if (space[1] === "X" && space[4] === "X" && space[7] === null) return 7;
        else if (space[2] === null && space[5] === "X" && space[8] === "X") return 2;
        else if (space[2] === "X" && space[5] === null && space[8] === "X") return 5;
        else if (space[2] === "X" && space[5] === "X" && space[8] === null) return 8;
        else if (space[0] === null && space[4] === "X" && space[8] === "X") return 0;
        else if (space[0] === "X" && space[4] === null && space[8] === "X") return 4;
        else if (space[0] === "X" && space[4] === "X" && space[8] === null) return 8;
        else if (space[2] === null && space[4] === "X" && space[6] === "X") return 2;
        else if (space[2] === "X" && space[4] === null && space[6] === "X") return 4;
        else if (space[2] === "X" && space[4] === "X" && space[6] === null) return 6;

        if (space[4] === null) return 4;

        const random = Math.floor(Math.random() * freeBoxIndices.length);
        return freeBoxIndices[random];
    }

    function humanPlay(index) {

        return new Promise(resolve => {

            const boxElements = document.getElementsByClassName("box");
            const boxes = Array.from(boxElements);

            boxes.forEach((box, i) => {
                if (space[i] === null) {
                    box.disabled = false;
                }
            });

            resolve(setTimeout(() => {
                updateSpace(index);
            }, 100));
        });  
        
    }

    async function switchTurns() {

        const playerTurn = document.getElementById("player-turn");
        const computerTurn = document.getElementById("computer-turn");

        if (symbol === "X") {
            playerTurn.style.display = "block";
            computerTurn.style.display = "none";
            await humanPlay();
        }
        else if (symbol === "O") {
            playerTurn.style.display = "none";
            computerTurn.style.display = "block";
            await computerPlay();
        }
    }

    function evaluate() {

        let isGameOver = false;
        let isTie = false;

        if ((space[0] !== null && space[0] === space[1] && space[1] === space[2]) || 
            (space[3] !== null && space[3] === space[4] && space[4] === space[5]) || 
            (space[6] !== null && space[6] === space[7] && space[7] === space[8]) || 
            (space[0] !== null && space[0] === space[3] && space[3] === space[6]) || 
            (space[1] !== null && space[1] === space[4] && space[4] === space[7]) || 
            (space[2] !== null && space[2] === space[5] && space[5] === space[8]) || 
            (space[0] !== null && space[0] === space[4] && space[4] === space[8]) || 
            (space[2] !== null && space[2] === space[4] && space[4] === space[6])) { 
                
                isGameOver = true;
                isTie = false;

                return [isGameOver, isTie];
            }

        let count = 0;

        for (let element of space) {
            if (element !== null) {
                count++;
            }
        }

        if (count === 9) {
            isGameOver = true;
            isTie = true;
        }

        return [isGameOver, isTie];
    }

    function checkResults(isGameOver, isTie) {

        if (isGameOver) {

            disableAllBoxes(true);

            let result = "";
            
            const gridElements = document.getElementsByClassName("grid");
            const gameResultWindow = document.getElementById("gameResultWindow");
            const resultWindow = document.getElementById("result");
            const playerTurn = document.getElementById("player-turn");
            const computerTurn = document.getElementById("computer-turn");
            
            if (isTie) {
                gridElements[0].style.backgroundColor = "yellow";
                result = "It's a Tie!"
            } else {
                if (symbol === "O") {
                    gridElements[0].style.backgroundColor = "blue";
                    result = `${playerName} Won!`;
                    setPlayerScore(s => s + 1);
                } else {
                    gridElements[0].style.backgroundColor = "red";
                    result = `Computer Won!`;
                    setComputerScore(s => s + 1);
                }
            }

            setTimeout(() => {
                playerTurn.style.display = "none";
                computerTurn.style.display = "none";
                gridElements[0].style.display = "none";
                resultWindow.textContent = result;
                gameResultWindow.style.display = "block";
            }, 1000);
            
        } else {
            switchTurns();
        }
    }

    function quitGame() {

        const gameWindow = document.getElementsByClassName("game-window");
        const gameResultWindow = document.getElementById("gameResultWindow");
        const welcomeWindow = document.getElementsByClassName("welcome-window");

        gameWindow[0].style.display = "none";
        gameResultWindow.style.display = "none";
        welcomeWindow[0].style.display = "block";

        setmatchCount(0);
        setPlayerScore(0);
        setComputerScore(0);
    }

    function disableAllBoxes(isDisable) {

        const boxElements = document.getElementsByClassName("box");
        const boxes = Array.from(boxElements);

        boxes.forEach(box => {
            box.disabled = isDisable;
        });
    }

    return(
        <div className="container">
            <div className="welcome-window">
                <h1>Welcome to Tic-Tac-Toe</h1>
                <button onClick={startGame}>Start Game</button>
            </div>

            <div className="player-info-window">
                <label htmlFor="playerNameInput">Enter Player Name </label>
                <input id="playerNameInput" type="text" placeholder="Player Name" onChange={updatePlayerName} onKeyDown={checkEnterPress} required/><br />
                <button onClick={getPlayerName}>Enter</button>
            </div>

            <div className="game-window">
                <h2>Match Number:<span>{matchCount}</span></h2>

                <div className="game-element-container">

                    <div className="player-card">
                        <h2>{playerName}</h2>
                        <p>Score {playerScore}</p>
                        <p id="player-turn">Your Turn</p>
                    </div>

                    <div className="grid">
                        {space.map((value, index) => (
                            <button
                                key={index}
                                className="box"
                                onClick={() => humanPlay(index)}
                                disabled={value !== null}>
                                {value}
                            </button>
                        ))}

                    </div>

                    <div id="gameResultWindow">
                        <p>Game Over!</p>
                        <p id="result"></p>
                        <button id="replay" onClick={playGame}>Play Again</button>
                        <button id="quit" onClick={quitGame}>Quit</button>
                    </div>

                    <div className="computer-card">
                        <h2>Computer</h2>
                        <p>Score {computerScore}</p>
                        <p id="computer-turn">Computer's Turn</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Game