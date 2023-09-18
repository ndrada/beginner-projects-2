//TIP CALCULATOR

const amount = document.getElementById("amount");
const guest = document.getElementById("guest");
const quality = document.getElementById("quality");
const tipAmount = document.getElementById("tip-amount");

calculate = () => {
    const tip =((amount.value * quality.value) / (guest.value)).toFixed(2);
    amount.value = '';
    guest.value = '';
    quality.value = '';
    if(tip === 'NaN'){
        tipAmount.innerHTML = 'Tip $0 each';
        showTipAmount();

    } else {
        tipAmount.innerHTML = 'Tip $' + tip + ' each';
        showTipAmount(); 
    }
}

showTipAmount = () => {
    let x = tipAmount;
    x.classList.add('show');
    setTimeout(()=>{x.classList.remove('show'); }, 
    4500);
}
// ......................................

// FLASHCARDS

// const flashcards = document.getElementBy('flashcards');
const flashcards = document.querySelector('.flashcards');
const createBox = document.getElementsByClassName('create-box')[0];
const question = document.getElementById('question');
const answer = document.getElementById('answer');

let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

contentArray.forEach(divMaker);
function divMaker(text){
    let div = document.createElement('div');
    let h2_question = document.createElement('h2');
    let h2_answer = document.createElement('h2');
    h2_answer.style.display = 'none';

    div.className = 'flashcard';

    h2_question.setAttribute('style', 'border-top: 1px solid whitesmoke; padding: 15px; margin-top: 30px;');

    h2_question.innerHTML = text.the_question;

    h2_answer.setAttribute('style', 'text-align:center; display:none;color: purple;');
    h2_answer.innerHTML = text.the_answer;

    div.appendChild(h2_question);
    div.appendChild(h2_answer);

    div.addEventListener('click', function(){
        h2_answer.style.display = h2_answer.style.display === 'block' ? 'none' : 'block';
    });

    flashcards.appendChild(div);
}

//add a new flashcard
function addFlashcard(){
    let flashcard_info = {
        'the_question' : question.value,
        'the_answer' : answer.value
    };

    contentArray.push(flashcard_info);
    localStorage.setItem('items', JSON.stringify(contentArray));

    divMaker(contentArray[contentArray.length - 1]);

    question.value = '';
    answer.value = '';
}

//deletes all flashcards
function delFlashcards(){
    localStorage.clear();
    flashcards.innerHTML = '';
    contentArray = [];
}

//shows the box after clicking on it once
function showCreateCardBox(){
    createBox.style.display='block';
}

//hides the box after clicking on it once
function hideCreateBox(){
    createBox.style.display='none';  
}


// .....................................
// TO-DO LIST

const toDoItems = document.getElementsByClassName("to-do-items")[0];
const input = document.getElementById('input');
const trashIcon = document.getElementById('trash');

input.addEventListener("keydown", function(event){
    if(event.key === "Enter")
        addItem();
})

function addItem(){
    console.log("addItem called");
    if(input.value.trim() === "") {
        return; // If input value is empty or contains only whitespace, exit the function
    }
    let divParent = document.createElement('div');
    let divChild = document.createElement('div');
    const checkIcon = document.createElement('i');
    const trashIcon = document.createElement('i');

    divParent.className = "item";
    divParent.innerHTML = "<div>"+input. value+"</div>"

    checkIcon.className = "fa-solid fa-circle-check";
    checkIcon.style.color = "white";
    checkIcon.addEventListener("click", function(){
        checkIcon.style.color = "green";
    })

    divChild.appendChild(checkIcon);

    trashIcon.className = "fa-solid fa-trash-can";
    trashIcon.style.color = "darkgray";
    trashIcon.addEventListener("click", function(){
        divParent.remove();
    })

    divChild.appendChild(trashIcon);

    divParent.appendChild(divChild);

    toDoItems.appendChild(divParent);
    input.value = "";
}


//TIMER 
let timeBegan = null; //did the clock start
let timeStopped = null; //at what time was the timker stopped
let stoppedDuration = 0; //how long was the timer stopped
let startInterval = null;
let flag = false; //to control the start/stop of the timer
let lastTabPressTime = 0; // for keeping track of tab presses for start, stop and clear
let lastTouchTime = 0; //same as tab but for touch screens

const timerContainer = document.getElementsByClassName('timer-container')[0];

timerContainer.addEventListener("click", function(){
    if(!flag){
        startTimer();
        flag = true;
    } else {
        stopTimer();
        flag = false;
    }
});

timerContainer.addEventListener('touchend', function(event) {
  let currentTime = new Date();
  if (currentTime - lastTouchTime < 300) { // 300 ms threshold for double tap
    resetTimer();
  } else {
    // single tap logic here (start/stop)
    if(!flag) {
      startTimer();
      flag = true;
    } else {
      stopTimer();
      flag = false;
    }
  }
  lastTouchTime = currentTime;
});

document.addEventListener("keydown", function(event){
    if(event.key === "Tab") {
        let currentTime = new Date();
        if(currentTime - lastTabPressTime < 500) { // 500 ms threshold for double press
            resetTimer();
        } else {
            if(!flag){
                startTimer();
                flag = true;
            } else {
                stopTimer();
                flag = false;
            }
        }
        lastTabPressTime = currentTime;
        event.preventDefault(); // Prevent the default tab key behavior
    }
});

timerContainer.addEventListener("dblclick", function(){
    resetTimer();
})

function startTimer(){
    if(timeBegan === null){
        timeBegan = new Date();
    }

    if(timeStopped !== null){
        stoppedDuration += (new Date() - timeStopped);
    }

    startInterval = setInterval(clockRunning, 10);
};

function stopTimer(){
    timeStopped = new Date();
    clearInterval(startInterval);    
};

function clockRunning(){
    let currentTime = new Date();
    let timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);
    let minutes = timeElapsed. getUTCMinutes();
    let seconds = timeElapsed.getUTCSeconds();
    let milliseconds = timeElapsed.getUTCMilliseconds();

    milliseconds = Math.floor(milliseconds/10);

    document.getElementById('timer-display').innerHTML = (minutes = minutes < 10 ? '0' + minutes:minutes) + ":" + (seconds = seconds < 10 ? '0' + seconds:seconds) + ":" + (milliseconds = milliseconds < 10 ? "0" + milliseconds:milliseconds);
};

function resetTimer(){
    clearInterval(startInterval);
    timeBegan = null;
    timeStopped = null;
    stoppedDuration = null;
    document.getElementById('timer-display').innerHTML = "00:00:00";
    flag = false;
}