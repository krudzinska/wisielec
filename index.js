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
    for (let i=0; i<password.length; i++) {
        newText += "_";
    }
    strong.innerText = newText;
}
showSigns();

//obsługa formularza:

document.querySelector('form').addEventListener("click", function(e){
    e.preventDefault()
});

document.querySelector('#buttonLetter').addEventListener("click", function(){
    let letter = document.querySelector('#letter').value;
    let text = strong.innerText.split("");

    

    for (let i=0; i<password.length; i++) {
        if (password[i].indexOf(letter) != -1){
            text[i] = letter;
        }
    }
    strong.innerText = text.join("");
});

document.querySelector('#buttonPassword').addEventListener("click", function(){
    console.log("Klikam wyraz");
});
