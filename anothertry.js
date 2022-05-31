let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", e => {
    e.preventDefault();

    let form = e.target.parentElement;
    let input_letter = form.children[0].value;
    let input_level = form.children[1].value;
 

    if (input_letter === ""){
        alert("Please Enter One Letter!");
        return;
    }

    if (typeof input_letter !== 'string'){
        alert("It's Not a Letter!");
        return;
    }

   
// creat a learningPlan
    let learningPlan = document.createElement("div");
    learningPlan.classList.add("plan");
    let letter = document.createElement("p");
    letter.classList.add("plan-letter");
    letter.innerText = input_letter;
    let level = document.createElement("p");
    level.classList.add("plan-level");
    level.innerText = 'Level ' + input_level;

    learningPlan.appendChild(letter);
    learningPlan.appendChild(level);

    // Buttons
    let gotitButton = document.createElement("button");
    gotitButton.classList.add("gotit");
    gotitButton.innerHTML = '<i class="fas fa-check"></i>';
    gotitButton.addEventListener("click", e => {
        let learnItem = e.target.parentElement;
        learnItem.classList.toggle("done");
    })

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';

    trashButton.addEventListener("click", e =>{
        let learnItem = e.target.parentElement;
        
        learnItem.addEventListener("animationend",() => {

            //remove from local Storage
            let letter  = learnItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
         

            myListArray.forEach((item, index) => {
                if (item.input_letter == letter) {
                    myListArray.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArray));
                }
            })
            
            learnItem.remove();
        })
        learnItem.style.animation = "scaleDown 0.3s forwards";

    })

    learningPlan.appendChild(gotitButton);
    learningPlan.appendChild(trashButton); 

    learningPlan.style.animation = "scaleUp 0.5s forwards";

//Local Storage
let myLearningPlan = {
     input_letter: input_letter,
     input_level: input_level, 
    };

let myList = localStorage.getItem("list");
if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myLearningPlan]));   //Bugs to line 16.
} else {
       let myListArray = JSON.parse(myList);
       myListArray.push(myLearningPlan);
       localStorage.setItem("list",JSON.stringify(myListArray));
     }
 
console.log(JSON.parse(localStorage.getItem("list")));
    
    form.children[0].value = "";
    form.children[1].value = "";

    section.appendChild(learningPlan);

})


    let myList = localStorage.getItem("list");
    if (myList !== null) {
      let myListArray = JSON.parse(myList);
      myListArray.forEach(item => {
// learning Plan created
         let learningPlan = document.createElement("div");
         learningPlan.classList.add("plan");
         let letter = document.createElement("p");
         letter.classList.add("plan-letter");
         letter.innerText = item.input_letter;
         let level = document.createElement("p");
         level.classList.add("plan-level");
         level.innerText = item.input_level;
    
         learningPlan.appendChild(letter);
         learningPlan.appendChild(level);  

// buttons
         let gotitButton = document.createElement("button");
         gotitButton.classList.add("gotit");
         gotitButton.innerHTML = '<i class="fas fa-check"></i>';
         gotitButton.addEventListener("click", e => {
             let learnItem = e.target.parentElement;
              learnItem.classList.toggle("done");
         })

         let trashButton = document.createElement("button");
         trashButton.classList.add("trash");
         trashButton.innerHTML = '<i class="fas fa-trash"></i>';

         trashButton.addEventListener("click", e =>{
             let learnItem = e.target.parentElement;
        
             learnItem.addEventListener("animationend",() => {
            //remove from local Storage
                 let letter  = learnItem.children[0].innerText;
                 let myListArray = JSON.parse(localStorage.getItem("list"));
                 myListArray.forEach((item, index) => {
                     if (item.input_letter == letter) {
                     myListArray.splice(index, 1);
                     localStorage.setItem("list", JSON.stringify(myListArray));
                }
            })

            learnItem.remove();
        })
        learnItem.style.animation = "scaleDown 0.3s forwards";

    })

     learningPlan.appendChild(gotitButton);
     learningPlan.appendChild(trashButton); 

     section.appendChild(learningPlan);

    })
 
}



