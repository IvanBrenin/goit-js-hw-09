const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    documentBckgrnd: document.querySelector('body')
}
let intervalId = null;

refs.startBtn.addEventListener('click', onStartClick)



function onStartClick() {
    refs.stopBtn.removeEventListener('click', onStopClick)
    intervalId = setInterval(colorChanger, 1000)
    refs.startBtn.disabled = true;
}

function colorChanger() {
    refs.documentBckgrnd.style.backgroundColor = getRandomHexColor()
    refs.startBtn.removeEventListener('click', onStartClick)
    refs.stopBtn.addEventListener('click', onStopClick)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStopClick() {
    clearInterval(intervalId);
    refs.startBtn.disabled = false;
    refs.startBtn.addEventListener('click', onStartClick)

}