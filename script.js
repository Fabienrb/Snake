const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10 ;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

// stock le meilleur score localement
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText =`Meilleur Score: ${highScore}`;


const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;

}
 
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over ! Appuyez sur OK pour rejouer...");
    location.reload();
}

// Change direction avec les touche
const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY !=-1 ){
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }

}

const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`;
    
    //Vérifie si le snake touche la pomme
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); //ajoute la position de la pomme au snake
        score ++; // ajoute 1 au score

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText =`Score: ${score}`;
        highScoreElement.innerText =`Meilleur Score: ${highScore}`;
    } 
    
    for (let i = snakeBody.length -1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
        
    }

    snakeBody[0] = [snakeX, snakeY];

    // met à jour la position de la tete de snake
    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
        
    }

    for (let i = 0; i < snakeBody.length; i++){
        // ajoute un div a chaque partie du corps de snake
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
        // vérifie si la tete du snake touche le corps
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
   
    playBoard.innerHTML = htmlMarkup
}
changeFoodPosition();
setIntervalId = setInterval(initGame,100);

document.addEventListener("keydown", changeDirection);

