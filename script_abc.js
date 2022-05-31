"use strict"
let cardArray = [
    { name: "a", img: "https://res.cloudinary.com/dwzaoqmfz/image/upload/v1620368274/empty_halz09.png", },
    { name: "a", img: "https://res.cloudinary.com/dwzaoqmfz/image/upload/v1620368274/empty_halz09.png", },
    { name: "b", img: "https://res.cloudinary.com/dwzaoqmfz/image/upload/v1620368274/empty_halz09.png", },
    { name: "b", img: "https://res.cloudinary.com/dwzaoqmfz/image/upload/v1620368274/empty_halz09.png", },
    { name: "c", img: "https://res.cloudinary.com/dwzaoqmfz/image/upload/v1620368274/empty_halz09.png", },
    { name: "c", img: "https://res.cloudinary.com/dwzaoqmfz/image/upload/v1620368274/empty_halz09.png", },
    { name: "d", img: "https://res.cloudinary.com/dwzaoqmfz/image/upload/v1620368274/empty_halz09.png", },
    { name: "d", img: "https://res.cloudinary.com/dwzaoqmfz/image/upload/v1620368274/empty_halz09.png", },
    { name: "e", img: "https://res.cloudinary.com/dwzaoqmfz/image/upload/v1620368274/empty_halz09.png", },
    { name: "e", img: "https://res.cloudinary.com/dwzaoqmfz/image/upload/v1620368274/empty_halz09.png", },
    { name: "f", img: "https://res.cloudinary.com/dwzaoqmfz/image/upload/v1620368274/empty_halz09.png", },
    { name: "f", img: "https://res.cloudinary.com/dwzaoqmfz/image/upload/v1620368274/empty_halz09.png", },
];

//define variables and get DOM element

const customLableMap = cardArray.reduce((accu, each) => {
    accu[each.name] = '';
    return accu;
}, {});
const input = document.querySelector("#input");
document.querySelector("#add").addEventListener("click", () => {
    const cardWithNoLable = Object.keys(customLableMap).find(name => !customLableMap[name]);
    if (!cardWithNoLable) return alert('Now you can start the game!')
    if (!input.value) return alert('type some letter, please.');

    customLableMap[cardWithNoLable] = input.value;
    input.value = '';
    input.focus();
});


let grid = document.querySelector(".grid");
let audio = document.querySelector("audio")
let source = document.querySelector("#source")
let scoreBoard = document.querySelector(".scoreBoard");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let clickBoard = document.querySelector(".clickBoard");
let imgs;
let cardsId = [];
let cardsSelected = [];
let cardsWon = 0;
let clicks = 0;
document.addEventListener("DOMContentLoaded", function () {
    //define functions 

    createBoard(grid, cardArray);
    arrangeCard();
    playAgain.addEventListener("click", replay);

    //add a click functions for images 

    imgs = document.querySelectorAll(".img");
    Array.from(imgs).forEach(img =>
        img.addEventListener("click", flipCard)
    )
});

const setBGImgSrc = (ele, src) => ele.style.backgroundImage = 'url("' + src + '")';

//createBoard function

function createBoard(grid, array) {
    popup.style.display = "none";
    array.forEach((arr, index) => {
        let img = document.createElement("div");
        img.classList.add("img");
        setBGImgSrc(img, "https://res.cloudinary.com/dwzaoqmfz/image/upload/c_scale,h_175/v1620368350/cover.png_ozmzoz.jpg");
        img.setAttribute("data-id", index);
        grid.appendChild(img);
    })
}

// arrangeCard function

function arrangeCard() {
    cardArray.sort(() => 0.5 - Math.random())
}

// flip Card function

function flipCard() {
    let selected = this.dataset.id;
    let clicked = cardArray[selected].name
    cardsSelected.push(clicked);



    cardsId.push(selected);
    this.classList.add("flip");
    setBGImgSrc(this, cardArray[selected].img);
    this.innerHTML = `<div class="label">${customLableMap[cardArray[selected].name]}</div>`;
    if (cardsId.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}
// checkForMatch function

function checkForMatch() {
    let imgs = document.querySelectorAll(".img");
    let firstCard = cardsId[0];
    let secondCard = cardsId[1];
    if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
  

        cardsWon += 1;
        scoreBoard.innerHTML = cardsWon;
        setTimeout(checkWon, 500)
    } else {
        setBGImgSrc(imgs[firstCard], "https://res.cloudinary.com/dwzaoqmfz/image/upload/c_scale,h_175/v1620368350/cover.png_ozmzoz.jpg");
        imgs[firstCard].innerHTML = '';
        setBGImgSrc(imgs[secondCard], "https://res.cloudinary.com/dwzaoqmfz/image/upload/c_scale,h_175/v1620368350/cover.png_ozmzoz.jpg"); 
        imgs[secondCard].innerHTML = '';
        
      
        imgs[firstCard].classList.remove("flip");
         imgs[secondCard].classList.remove("flip");
    }
    cardsSelected = [];
    cardsId = [];
    clicks += 1;
    clickBoard.innerHTML = clicks;
}

function checkWon() {
    if (cardsWon == cardArray.length / 2) {
        alert("Bravo! Du hast gewonnen!") 
        setTimeout(() => popup.style.display = "flex", 300);
    }
}
// The replay function

function replay() {location.reload("index_abc.html")
}