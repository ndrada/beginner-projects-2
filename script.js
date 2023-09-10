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

