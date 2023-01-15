"use strict";
const insert_card = document.querySelector(".card-insert");
const img = [
  "playing cards/B.jpeg",
  "playing cards/A.jpeg",
  "playing cards/D.jpeg",
  "playing cards/E.jpeg",
  "playing cards/A.jpeg",
  "playing cards/C.jpeg",
  "playing cards/F.jpeg",
  "playing cards/B.jpeg",
  "playing cards/D.jpeg",
  "playing cards/C.jpeg",
  "playing cards/F.jpeg",
  "playing cards/E.jpeg",
];
let id;
let checkIfMatch = [];
let score = 0;
const overlay = document.querySelector("#overlay");
const whatHappend = document.querySelector(".what-happend");
let initial = 0;
const new_game = document.querySelector(".new-game");
const bar = document.querySelector(".load-bar");

function createElement(i) {
  const hiddenIMg = document.createElement("img");
  hiddenIMg.src = `playing cards/hidden.jpeg`;
  hiddenIMg.classList.add("flip");
  hiddenIMg.id = i;
  hiddenIMg.setAttribute("draggable", false);

  insert_card.insertAdjacentElement("afterbegin", hiddenIMg);
}

function loadTopImg() {
  for (let i = 0; i < 12; i++) {
    createElement(i);
  }
}
loadTopImg();

function newGame() {

  // console.log('function is running')
  score = 0;
  checkIfMatch = [];
  initial = 0;
  overlay.classList.add("hidden");
  bar.style.transition = "1s";
  bar.style.width = 0 + "%";
  removeAllLeftImage();
  loadTopImg();
  topImgGradiantClick();
}

let img2

function topImgGradiantClick() {
  const img3 = img.sort((a,b) => 0.5 - Math.random());
  const imgX = img3.sort((a,b) => 0.5 - Math.random());
  const allImg = document.querySelectorAll(".flip");
img2 = imgX
  allImg.forEach((element) => {

    // console.log(checkIfMatch)
    element.addEventListener("click", f);
  });

  function f(event){
    console.log(img2[event.target.id])
    checkIfMatch.push({ name: img2[event.target.id], id: event.target.id });
  
    event.target.src = img2[event.target.id];
  
    if (checkIfMatch.length === 2) {
      let a = checkIfMatch[0],
        b = checkIfMatch[1];
      if (a.name !== b.name) {
        console.log('un-matched')
        setTimeout(() => {
          document.getElementById(
            `${+checkIfMatch[0].id}`
          ).src = `playing cards/hidden.jpeg`;
          document.getElementById(
            `${+checkIfMatch[1].id}`
          ).src = `playing cards/hidden.jpeg`;
          checkIfMatch = [];
        }, 200);
      }
      if (a.name === b.name) {
        checkIfMatch.forEach((element) => {
          document
            .getElementById(element.id)
            .removeEventListener("click", f);
        });
  
        score += 1;
        console.log(score)
        checkIfMatch = [];
      }
      if (score >= 6) {
        overlay.classList.remove("hidden");
        clearInterval(id);
        whatHappend.innerHTML = "You Win";
        new_game.addEventListener("click", () => {
          newGame();
        });
      }
    }
  
    runProgressBar();
  }

}
topImgGradiantClick();


function runProgressBar() {
  
  if (initial === 0) {
    bar.style.transition ="width 21s linear";
    bar.style.width = "100%";
    initial = 1;
    let width = 0;
    id = setInterval(bars, 1000);
    function bars() {
      if (width >= 100) {
        clearInterval(id);
        initial = 0;
        overlay.classList.remove("hidden");
        whatHappend.innerHTML = "Game Over";
        
        new_game.addEventListener("click", () => {
          newGame();
        });
      } else {
        width += 5;
      }
    }
  }
}

function removeAllLeftImage() {
  document.querySelectorAll(".flip").forEach((val) => val.remove());
}
