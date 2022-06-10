import { throttle } from "lodash";

const formRef = document.querySelector('form');
const inputRef = document.querySelector('input');
const messageRef = document.querySelector('textarea');
const buttonREf = document.querySelector('button');

const userData = {};

try {
    fillSavedFilds();
} catch {
    onError();
}

formRef.addEventListener('input', throttle(onFormInput, 500));
buttonREf.addEventListener('click', onFormSubmit);


function fillSavedFilds(){ 
    const starageData = localStorage.getItem("feedback-form-state");
    const parsedData = JSON.parse(starageData);

    inputRef.value = parsedData.email;
    messageRef.value = parsedData.message;
}

function onError(){ 
    console.log('We dont have any data yet')
}

function onFormInput() { 
    userData.email = inputRef.value;
    userData.message = messageRef.value;

    localStorage.setItem("feedback-form-state", JSON.stringify(userData));
}

function onFormSubmit(event) { 
    event.preventDefault();

    console.log(userData);

    inputRef.value = '';
    messageRef.value = '';

    localStorage.clear();
}