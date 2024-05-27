const boxes = document.querySelectorAll(".box");
const gameOverModal = document.querySelector(".game-over-modal");
const turnContainer = document.querySelector(".turn");
const content = document.querySelector(".content");
const restartBtn = document.querySelector(".restart-btn");

let turns = ["X", "O"];
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let currentTurn = 0;
let winner = "";
let emptyBoxes = 9;

let matchingBoxes = [];

const handleBoxGetPressed = (e) => {
  if (e.innerText === "") {
    e.innerText = turns[currentTurn % 2];
    let i = e.getAttribute("data-value") - 0;
    board[Math.floor(i / 3)][i % 3] = turns[currentTurn % 2];
    currentTurn++;
    emptyBoxes--;
    winner = checkWin();
    if (winner) {
      matchingBoxes.forEach(([row, col]) => {
        // console.log(boxes[row * 3 + col]);
        boxes[row * 3 + col].classList.add("matched");
      });
      content.innerText =
        winner !== "Draw" ? `Player ${winner} Won\n😎👍` : `${winner}👎`;
      setTimeout(() => {
        gameOverModal.classList.toggle("hide");
      }, 250);
    } else {
      turnContainer.innerText = ` '${turns[currentTurn % 2]}' Turn `;
    }
  }
};

const checkWin = () => {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      if (board[i][0] === "") {
        return;
      }
      matchingBoxes.push([i, 0]);
      matchingBoxes.push([i, 1]);
      matchingBoxes.push([i, 2]);
      return board[i][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      if (board[0][i] === "") {
        return;
      }
      matchingBoxes.push([0, i]);
      matchingBoxes.push([1, i]);
      matchingBoxes.push([2, i]);
      return board[0][i];
    }
  }
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    if (board[0][0] === "") {
      return;
    }
    matchingBoxes.push([0, 0]);
    matchingBoxes.push([1, 1]);
    matchingBoxes.push([2, 2]);
    return board[0][0];
  }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    if (board[0][2] === "") {
      return;
    }
    matchingBoxes.push([0, 2]);
    matchingBoxes.push([1, 1]);
    matchingBoxes.push([2, 0]);
    return board[0][2];
  }
  if (emptyBoxes === 0) {
    return "Draw";
  }
};

restartBtn.addEventListener("click", () => {
  currentTurn = 0;
  emptyBoxes = 9;
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  matchingBoxes = [];
  winner = "";
  boxes.forEach((box) => {
    box.innerText = "";
    box.classList.remove("matched");
  });
  gameOverModal.classList.add("hide");
  boxes.forEach((box) => {
    box.classList.toggle("flip");
  });
  setTimeout(() => {
    boxes.forEach((box) => {
      box.classList.toggle("flip");
    });
  }, 1000);
  // document.querySelector(".board").classList.toggle("flip");
  turnContainer.innerText = ` '${turns[currentTurn % 2]}' Turn `;
});

if (window.innerWidth > 1024) {
  document.querySelector(".copyrights").innerHTML =
    "designed and <br /> developed by <span>Karthik</span>.";
}

// import React, { useState, useRef } from "react";

// // let index = 0;
// const turns = ["X", "O"];
// const seq = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// let winner = "";
// let emptyBoxes = 9;

// let matchingBoxes = [];

// const Game = () => {
//   const boxesRef = useRef(null);
//   const gameOverModalRef = useRef(null);
//   const turnContainerRef = useRef(null);
//   const contentRef = useRef(null);
//   const copyrightsRef = useRef(null);

//   const [board, setBoard] = useState([
// ["", "", ""],
// ["", "", ""],
// ["", "", ""],
//   ]);
//   const [currentTurn, setCurrentTurn] = useState(0);
//   const [content, setContent] = useState("");
//   const [matched, setMatched] = useState([]);
//   const [modalState, setModalState] = useState("hide");
//   //   if (window.innerWidth > 1024 && copyrightsRef.current) {
//   //     copyrightsRef.current.innerHTML =
//   //       "designed and <br /> developed by <span>Karthik</span>.";
//   //   }
//   const handleBoxGetPressed = (row, col) => {
//     console.log("board", board);
// if (board[row][col] === "") {
//   //   let i = e.getAttribute("data-value") - 0;
//   setBoard((board[row][col] = turns[currentTurn % 2]));
//   //   board[Math.floor(i / 3)][i % 3] = turns[currentTurn % 2];
//   setCurrentTurn(currentTurn + 1);
//   emptyBoxes--;
//   winner = checkWin();
//   if (winner) {
//     // matchingBoxes.forEach(([row, col]) => {
//     //   boxesRef.current[row * 3 + col].classList.add("matched");
//     // });
//     setMatched(matchingBoxes);
//     console.log(matched);
//     // contentRef.current.innerText =
//     //   winner !== "Draw" ? `Player ${winner} Won\n😎👍` : `${winner}👎`;
//     setContent(
//       winner !== "Draw" ? `Player ${winner} Won\n😎👍` : `${winner}👎`
//     );
//     setTimeout(() => {
//       setModalState("");
//     }, 250);
//   } else {
//   }
//     }
//   };

// const checkWin = () => {
//   for (let i = 0; i < 3; i++) {
//     if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
//       if (board[i][0] === "") {
//         return;
//       }
//       matchingBoxes.push([i, 0]);
//       matchingBoxes.push([i, 1]);
//       matchingBoxes.push([i, 2]);
//       return board[i][0];
//     }
//   }
//   for (let i = 0; i < 3; i++) {
//     if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
//       if (board[0][i] === "") {
//         return;
//       }
//       matchingBoxes.push([0, i]);
//       matchingBoxes.push([1, i]);
//       matchingBoxes.push([2, i]);
//       return board[0][i];
//     }
//   }
//   if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
//     if (board[0][0] === "") {
//       return;
//     }
//     matchingBoxes.push([0, 0]);
//     matchingBoxes.push([1, 1]);
//     matchingBoxes.push([2, 2]);
//     return board[0][0];
//   }
//   if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
//     if (board[0][2] === "") {
//       return;
//     }
//     matchingBoxes.push([0, 2]);
//     matchingBoxes.push([1, 1]);
//     matchingBoxes.push([2, 0]);
//     return board[0][2];
//   }
//   if (emptyBoxes === 0) {
//     return "Draw";
//   }
// };

  // const handleRestartBtnPressed = () => {
  //   setCurrentTurn(0);
  //   emptyBoxes = 9;
  //   setBoard([
  //     ["", "", ""],
  //     ["", "", ""],
  //     ["", "", ""],
  //   ]);
  //   matchingBoxes = [];
  //   winner = "";
  //   boxesRef.current?.forEach((box) => {
  //     box.innerText = "";
  //     //   box.classList.remove("matched");
  //   });
  //   setModalState("hide");
  //   // boxesRef.current.forEach((box) => {
  //   //   box.classList.toggle("flip");
  //   // });
  //   // setTimeout(() => {
  //   //   boxesRef.current.forEach((box) => {
  //   //     box.classList.toggle("flip");
  //   //   });
  //   // }, 1000);
  //   // document.querySelector(".board").classList.toggle("flip");
  //   // turnContainerRef.current.innerText = ` '${turns[currentTurn % 2]}' Turn `;
  // };

//   return (
//     <>
// <div ref={gameOverModalRef} className={"game-over-modal " + modalState}>
//   <div className="card">
//     <h1 ref={contentRef} className="content">
//       {content}
//     </h1>
//     <button onClick={handleRestartBtnPressed()} className="restart-btn">
//       Restart
//     </button>
//   </div>
// </div>
// <div className="container">
//   <h1>Tic Tac Toe Game</h1>
//   <span ref={turnContainerRef} className="turn">
//     '{currentTurn}' Turn
//   </span>
//   <div className="board">
//     {seq.forEach((element) => {
// <span
//   className="box"
//   data-value={element}
// ref={(el) => {
//   boxesRef.current[element] = el;
// }}
//   onClick={handleBoxGetPressed(
//     Math.floor(element / 3),
//     element % 3
//   )}
// ></span>;
//     })}
//     ;
//   </div>
// <div ref={copyrightsRef} className="copyrights">
//   {window.innerWidth > 1024
//     ? "designed and developed by <span>Karthik</span>."
//     : "designed and developed by <span>Karthik</span>."}
// </div>
//       </div>
//     </>
//   );
// };
