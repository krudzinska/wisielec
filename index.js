import './style.scss';

const strongPassword = document.querySelector('#password');
const hang = document.querySelector('#hang');
const newGameBtn = document.querySelector('#newGameBtn');
const resetBtn = document.querySelector('#reset');
const comments = document.querySelector('#comment');
const strongWins = document.querySelector('#wins');
const strongLosts = document.querySelector('#losts');
const signsList = document.querySelector('#listofsigns');
let wins = 0;
let losts = 0;
let password;
let tab = [];

//Pobieranie hasła z API:
function listsWord(words) {
    for (const key in words) {
        tab.push(key);
    }
    return tab;
}

function loadWord() {
          $.ajax({
              url: 'https://dog.ceo/api/breeds/list/all',
          }).done(function(response){
            listsWord(response.message);
            randomWord();
            showSigns();
      	 }).fail(function(error) {
             console.log(error);
         })
    }
loadWord();

const randomWord = () => {
    const number = Math.round(Math.random()*(tab.length-1));
    password = tab[number];
    return password
}

//2 sposób - losowanie hasła z pliku passwords:
//import { tab } from './passwords';

//const randomWord = () => {
//    const number = Math.round(Math.random()*(tab.length-1));
//    password = tab[number].name;
//    return password
//}
//randomWord();


//wyświetlanie ilości znaków:
const showSigns = () => {
    let newText = "";

    password.split("").forEach(function(element, i){
        newText += "_";
    });

    strongPassword.innerText = newText;
}
//showSigns(); //przy 2 sposobie należy jeszcze wywołac funkcje.

//sprawdzanie ilości błędów:
let errors = 0;

const checkErrors = () => {
    if (errors === 0) {
        hang.removeAttribute("class");
        hang.classList.add('pic0');
    }
    if (errors === 10) {
        strongPassword.innerText = password;
        losts += 1;
        strongLosts.innerText = losts;
    }
    if (errors <= 10) {
        hang.classList.remove(`pic${errors - 1}`);
        hang.classList.add(`pic${errors}`);
    }
}

//obsługa formularza:
document.querySelector('form').addEventListener("click", function(e){
    e.preventDefault()
});
    //sprawdzanie litery:
document.querySelector('#buttonLetter').addEventListener("click", function(){
    let letter = document.querySelector('#letter').value;
    let text = strongPassword.innerText.split("");

    if (letter.length > 1) {
        comment.innerText = 'Wpisz tylko jeden znak!';
    }
    if (letter.length === 1) {
        let counter = 0;
        password.split("").forEach(function(element, i){
            if (element === letter) {
                text[i] = letter;
                counter += 1;
            }
        });

        strongPassword.innerText = text.join("");

        comment.innerText = 'Zgaduj dalej!'

        if (counter === 0) {
            comment.innerText = 'Nie ma takiej litery';
            errors += 1;
            checkErrors();
        }
        //for (let i=0; i<password.length; i++) {
        //    if (password[i].indexOf(letter) != -1){
        //        text[i] = letter;
        //    }
        //}
    }
    signsList.innerText += `${letter} `;
    document.querySelector('#letter').value = "";
});
    //sprawdzanie hasła:
document.querySelector('#buttonPassword').addEventListener("click", function(){

    let word = document.querySelector('#word').value;

    if (word.length > 1) {
        if (word === password) {
            strongPassword.innerText = password;
            comment.innerText = "Super! Zgadłeś hasło!";
            wins += 1;
            strongWins.innerText = wins;
        }
        if (word !== password) {
            comment.innerText = "Niestety to nie to hasło :(";
            errors += 1;
            checkErrors();
        }
        document.querySelector('#word').value = "";
    }

});

//nowa gra:
const newGame = () => {
    signsList.innerText = "";
    randomWord();
    showSigns();
    errors = 0;
    checkErrors();
    comment.innerText = 'Zgadnij hasło!'
}

newGameBtn.addEventListener("click", newGame);

//reset:
resetBtn.addEventListener("click", function(){
    newGame();
    wins = 0;
    losts = 0;
    strongLosts.innerText = losts;
    strongWins.innerText = wins;
});
