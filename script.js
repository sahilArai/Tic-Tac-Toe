let boxes = document.querySelectorAll(".box");
let x = true;
let game = document.querySelector(".game");
let msgContainer = document.querySelector(".msgContainer");
let winner = document.querySelector(".winner");
let newGameBtn = document.querySelector(".newGameBtn");
let winnerName = "";
let winnerMsg = document.querySelector(".winnerMsg");
let popSound = new Audio("pop.mp3");

let winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 1, 7],
  [2, 1, 0],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset game after winning or draw game
newGameBtn.addEventListener("click", () => {
  game.style.display = "block";
  msgContainer.style.display = "none";
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
        game.style.display = "none";
        msgContainer.style.display = "block";
        msgContainer.style.display = "flex";
        msgContainer.style.justifyContent = "center";
        msgContainer.style.alignItems = "center";
        winnerName = `${position1}`;

        if (position1 === "X") {
          winner.style.color = "color: tomato";
          winner.style.textShadow = `
                            0 0 10px rgb(255, 68, 0), 
                            0 0 20px rgb(178, 34, 34), 
                            0 0 40px rgb(128, 0, 0), 
                            0 0 80px rgb(139, 0, 0)`;

          winner.innerHTML = `${position1} `;
        } else {
          winner.style.color = "rgb(71, 151, 255)";
          winner.style.textShadow = `
                            0 0 10px rgb(0, 17, 255), 
                            0 0 20px rgb(34, 56, 178), 
                            0 0 40px rgb(14, 2, 128), 
                            0 0 80px rgb(0, 2, 139)`;

          winner.innerHTML = `${position1} `;
          break;
        }
        draw = false;
      }
    }
  }
  //if game is drwa
  if (draw) {
    let allBoxesFilled = Array.from(boxes).every((box) => box.innerHTML !== "");
    if (allBoxesFilled && winnerName === "") {
      game.style.display = "none";
      msgContainer.style.display = "block";
      msgContainer.style.display = "flex";
      msgContainer.style.justifyContent = "center";
      msgContainer.style.alignItems = "center";
      winner.innerHTML = "No one ";
    }
  }
};

//if 'X' or 'O' should display after click
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (x === true) {
      popSound.play();
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
      popSound.play();
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
