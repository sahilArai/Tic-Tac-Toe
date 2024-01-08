let boxes = document.querySelectorAll(".box");
let x = true;
let game = document.querySelector(".game");
let msgContainer = document.querySelector(".msgContainer");
let winner = document.querySelector(".winner");
let newGameBtn = document.querySelector(".newGameBtn");
let winnerName = "";
let winnerMsg = document.querySelector(".winnerMsg");
let popSound = new Audio("pop.mp3");
let mouseClick = new Audio("mouseClick.mp3");
let winningSound = new Audio("winningSound.mp3");
let drawGame = new Audio("drawGame.mp3");
let line = document.querySelector(".line");
let Xscore = document.querySelector(".XscoreNumber");
let Oscore = document.querySelector(".OscoreNumber");
let scoreSection = document.querySelector(".scoreSection");
let ResetBtn = document.querySelector(".resetBtn");
let alertContainer = document.querySelector(".alertContainer");
let yes = document.querySelector("#yes");
let no = document.querySelector("#no");
Xscore.innerText = "0";
Oscore.innerText = "0";

let winPattern = [
  [0, 1, 2, 1.5, 2500, 0],
  [0, 3, 6, -33, 7500, 90],
  [0, 4, 8, 4, 7500, 45],
  [1, 4, 7, 1.5, 7500, 90],
  [2, 5, 8, 38, 7500, 90],
  [2, 4, 6, 1, 7500, 135],
  [3, 4, 5, 1.5, 7500, 0],
  [6, 7, 8, 1.5, 12100, 0],
];

// restart game
yes.addEventListener("click", () => {
  mouseClick.play();
  Xscore.innerText = "0";
  Oscore.innerText = "0";
  x = true;
  alertContainer.style.display = "none";
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
  });
});
no.addEventListener("click", () => {
  mouseClick.play();
  alertContainer.style.display = "none";
});

//If restart button clicked
ResetBtn.addEventListener("click", () => {
  mouseClick.play();
  alertContainer.style.display = "block";
});

// Reset game after winning or draw game
newGameBtn.addEventListener("click", () => {
  mouseClick.play();
  game.style.display = "block";
  msgContainer.style.display = "none";
  ResetBtn.style.display = "block";
  line.classList.remove("visible");
  scoreSection.style.opacity = "1";
  x = true;

  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
  });
});

// To check for winner or if drwa
let checkWinner = () => {
  let draw = true;

  for (const pattern of winPattern) {
    let position1 = boxes[pattern[0]].innerHTML;
    let position2 = boxes[pattern[1]].innerHTML;
    let position3 = boxes[pattern[2]].innerHTML;

    if (position1 !== "" && position2 !== "" && position3 !== "") {
      if (position1 === position2 && position2 === position3) {
        setTimeout(() => {
          game.style.display = "none";
          ResetBtn.style.display = "none";
          msgContainer.style.display = "block";
          msgContainer.style.display = "flex";
          msgContainer.style.justifyContent = "center";
          msgContainer.style.alignItems = "center";
          scoreSection.style.opacity = "0";
          scoreSection.style.textAlign = "top";
        }, 3000);
        winnerName = `${position1}`;
        winningSound.play();
        line.classList.add("visible");
        line.style.transform = `translate(${pattern[3]}%, ${pattern[4]}%) rotate(${pattern[5]}deg)`;

        if (position1 === "X") {
          winner.style.color = "color: tomato";
          winner.style.textShadow = `
                            0 0 10px rgb(255, 68, 0), 
                            0 0 20px rgb(178, 34, 34), 
                            0 0 40px rgb(128, 0, 0), 
                            0 0 80px rgb(139, 0, 0)`;

          winner.innerHTML = `${position1} `;
          Xscore.innerText = parseInt(Xscore.innerText) + 1;
        } else {
          winner.style.color = "rgb(71, 151, 255)";
          winner.style.textShadow = `
                            0 0 10px rgb(0, 17, 255), 
                            0 0 20px rgb(34, 56, 178), 
                            0 0 40px rgb(14, 2, 128), 
                            0 0 80px rgb(0, 2, 139)`;

          winner.innerHTML = `${position1} `;
          Oscore.innerText = parseInt(Oscore.innerText) + 1;
          draw = false;
          break;
        }
      }
    }
  }
  // Check for a draw after checking all patterns
  if (draw) {
    let allBoxesFilled = Array.from(boxes).every((box) => box.innerHTML !== "");
    if (allBoxesFilled && winnerName === "") {
      game.style.display = "none";
      ResetBtn.style.display = "none";
      scoreSection.style.opacity = "0";
      msgContainer.style.display = "block";
      msgContainer.style.display = "flex";
      msgContainer.style.justifyContent = "center";
      msgContainer.style.alignItems = "center";
      winnerMsg.innerText = "It's a draw!";
      winnerMsg.classList.add("draw");
      drawGame.play();
    }
  }
};

//if 'X' or 'O' should display after click
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    popSound.play();
    if (x === true) {
      box.innerHTML = "X";
      box.style.color = "tomato";
      box.style.textShadow = `
          0 0 10px rgb(255, 68, 0), 
          0 0 20px rgb(178, 34, 34), 
          0 0 40px rgb(128, 0, 0), 
          0 0 80px rgb(139, 0, 0)
          `;
      x = false;
    } else {
      box.innerHTML = "O";
      box.style.color = "rgb(71, 151, 255)";
      box.style.textShadow = `
            0 0 10px rgb(0, 17, 255), 
            0 0 20px rgb(34, 56, 178), 
            0 0 40px rgb(14, 2, 128), 
            0 0 80px rgb(0, 2, 139)
          `;
      x = true;
    }
    box.disabled = true;
    checkWinner();
  });
});
