"use strict"

function loadDoc() {
          let xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              document.getElementById("ajax").innerHTML =
              this.responseText;
            }
          };
          xhttp.open("GET", "text.txt", true);
          xhttp.send();
        }

let cardArray = [ 
          { name: "mickey", img: "mickey.png" }, 
          { name: "mickey", img: "mickey.png", },
          { name: "bambi", img: "bambi.png", },
          { name: "bambi", img: "bambi.png", }, 
          { name: "pinokio", img: "pinokio.png", },
          { name: "pinokio", img: "pinokio.png", }, 
          { name: "pooh", img: "pooh.png", },
          { name: "pooh", img: "pooh.png", },
          { name: "simba", img: "simba.png", },
          { name: "simba", img: "simba.png", },
          { name: "dumbo", img: "dumbo.png", },
          { name: "dumbo", img: "dumbo.png", }, 
          ]; 
          
          //defining variables and get DOM element
          
          let grid = document.querySelector(".grid"); 
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
                    //defining functions 
                    
                    createBoard(grid, cardArray); 
                    arrangeCard();
                    playAgain.addEventListener("click", replay); 
                    
                    // click function for images 
                    
                    imgs = document.querySelectorAll("img");
                    Array.from(imgs).forEach(img => 
                    img.addEventListener("click", flipCard)
                    ) 
                    });

                    //createBoard function

function createBoard(grid, array) { 
          popup.style.display = "none"; 
          array.forEach((arr, index) => { 
          let img = document.createElement("img"); 
          img.setAttribute("src", "disney.png");
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
          cardsSelected.push(cardArray[selected].name); 
          cardsId.push(selected); 
          this.classList.add("flip"); 
          this.setAttribute("src", cardArray[selected].img); 
          if (cardsId.length === 2) { 
          setTimeout(checkForMatch, 500);
          } 
          }

          // checkForMatch function

function checkForMatch() { 
          let imgs = document.querySelectorAll("img"); 
          let firstCard = cardsId[0];
          let secondCard = cardsId[1];
          if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) { 
          
          cardsWon += 1; 
          scoreBoard.innerHTML = cardsWon; 
          setTimeout(checkWon,500) 
          } else { 
          imgs[firstCard].setAttribute("src", "disney.png");
          imgs[secondCard].setAttribute("src", "disney.png");
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
          setTimeout(()=> popup.style.display = "flex" ,300); 
          }
          }

          // The replay function

function replay() {
            location.reload("index.html")
          }






          const spans = document.querySelectorAll('.word span');

spans.forEach((span, idx) => {
	span.addEventListener('click', (e) => {
		e.target.classList.add('active');
	});
	span.addEventListener('animationend', (e) => {
		e.target.classList.remove('active');
	});
	
	// Initial animation
	setTimeout(() => {
		span.classList.add('active');
	}, 750 * (idx+1))
});