
"use strict";
document.addEventListener("DOMContentLoaded", () => {
  let isCrossMove = true,
    firstPlayer,
    secondPlayer,
    i = 0,
    j = 0,
    t = 0;
  const field = document.querySelector(".game_field"),
    cell = document.getElementsByClassName("game_cell"),
    firstCount = document.querySelector("#first_count_id"),
    secondCount = document.querySelector("#second_count_id"),
    tieCount = document.querySelector("#tie_count_id"),
    winnerId = document.querySelector("#winner_id"),
    nowMove = document.querySelector("#move_now_id"),
    btn = document.querySelector(".btn"),
    alert = document.querySelector(".alert_notification"),
    wrapper = document.querySelector(".wrapper"),
    dataArrCross = [],
    dataArrCircle = [],
    winArr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [3, 5, 7],
      [1, 5, 9],
    ];
  // переменные

  firstPlayer = prompt("Введите имя 1ого игрока", "Alex");
  secondPlayer = prompt("Введите имя 2ого игрока", "Ann");
  document.querySelector("#first_gamer_id").innerText = `${firstPlayer} X`;
  document.querySelector("#second_gamer_id").innerText = `${secondPlayer} O`;
  nowMove.innerHTML = `<h2>${firstPlayer} X</h2>`;

  for (let i = 1; i <= 9; i++) {
    field.innerHTML += `<div class='game_cell' position=${i}></div>`;
  }

  for (let i = 0; i <= cell.length; i++) {
    cell[i].addEventListener("click", cellClick);
  }

  function cellClick() {
    if (!this.hasChildNodes()) {
      if (isCrossMove) {
        const cross = document.createElement("div");
        cross.classList.add("cross");
        this.appendChild(cross);
        nowMove.innerHTML = `<h2>${secondPlayer} O</h2>`;
        dataArrCross.push(parseInt(this.getAttribute("position")));

        if (checkWin(dataArrCross, winArr)) {
          showEndGameWindow(firstPlayer, firstCount, i++);
        }
      } else {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        this.appendChild(circle);
        nowMove.innerHTML = `<h2>${firstPlayer} X</h2>`;
        dataArrCircle.push(parseInt(this.getAttribute("position")));

        if (checkWin(dataArrCircle, winArr)) {
          showEndGameWindow(secondPlayer, secondCount, j++);
        }
      }
      if (
        checkTie(dataArrCircle, dataArrCross) &&
        !checkWin(dataArrCircle, winArr) &&
        !checkWin(dataArrCross, winArr)
      ) {
        showEndGameWindow("tie", tieCount, t++);
      }
      isCrossMove = !isCrossMove;
    }
  }

  function checkWin(arr, winArr) {
    for (let i = 0; i < winArr.length; i++) {
      if (winArr[i].every((val) => arr.includes(val))) {
        return true;
      }
    }
    return false;
  }

  function checkTie(arr1, arr2) {
    const arr = [...arr1, ...arr2];
    if (arr.length === 9) {
      return true;
    }
  }

  function showEndGameWindow(player, count, k) {
    field.style.pointerEvents = "none";
    nowMove.innerHTML = "GAME OVER";
    k++;
    count.innerText = `${k}`;

    player == "tie"
      ? (winnerId.innerText = `TIE.TRY AGAIN`)
      : (winnerId.innerText = `The winner is: ${player}`);
    setTimeout(() => {
      alert.classList.add("show");
      wrapper.classList.add("hide");
      wrapper.classList.remove("show");
      
      createConfetti(100);
      showConfetti();

      btn.addEventListener("click", () => {
        count.classList.add("animation");
        // player.classList.add("animation");
        alert.classList.remove("show");
        wrapper.classList.add("show");
        wrapper.classList.remove("hide");
        field.style.pointerEvents = "auto";

        for (let i = 0; i < cell.length; i++) {
          cell[i].innerHTML = "";
        }

        nowMove.innerHTML = `<h2>${firstPlayer} X</h2>`;
        dataArrCircle.length = 0;
        dataArrCross.length = 0;

        hideConfetti();

      });
    }, 1000);
  }
});
