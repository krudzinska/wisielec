import './style.scss';
import { passwords } from './passwords';

//losowanie hasła:
let password;

const randomPassword = () => {
    const number = Math.round(Math.random()*(passwords.length-1));
    password = passwords[number].name;
    return password
}
randomPassword();

console.log(password);

//wyświetlanie ilości znaków:
const strong = document.querySelector('#password');

const showSigns = () => {
    let newText = "";

    password.split("").forEach(function(element, i){
        newText += "_";
    });

    //for (let i=0; i<password.length; i++) {
    //    newText += "_";
    //}
    strong.innerText = newText;
}
showSigns();

//sprawdzanie ilości błędów:
let errors = 0;

const hang = document.querySelector('#hang');

const checkErrors = () => {
    if (errors >= 10) {
        hang.classList.remove(`pic9`);
        hang.classList.add(`pic10`);
        strong.innerText = password;
    }
    if (errors < 10) {
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
    let text = strong.innerText.split("");

    if (letter.length > 1) {
        alert('Wpisz tylko jeden znak!');
    }
    if (letter.length === 1) {
        let counter = 0;
        password.split("").forEach(function(element, i){
            if (element === letter) {
                text[i] = letter;
                counter += 1;
            }
        });

        strong.innerText = text.join("");

        if (counter === 0) {
            alert('Nie ma takiej litery');
            errors += 1;
            checkErrors();
        }
        //for (let i=0; i<password.length; i++) {
        //    if (password[i].indexOf(letter) != -1){
        //        text[i] = letter;
        //    }
        //}
    }
    document.querySelector('#letter').value = "";
});
    //sprawdzanie hasła:
document.querySelector('#buttonPassword').addEventListener("click", function(){

    let word = document.querySelector('#word').value;

    if (word.length > 1) {
        if (word === password) {
            strong.innerText = password;
            alert("Super! Zgadłeś hasło!");
        }
        if (word !== password) {
            alert("Niestety to nie to hasło :(");
            errors += 1;
            checkErrors();
        }
        document.querySelector('#word').value = "";
    }

});
