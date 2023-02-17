import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let targetTime
const refs = {
    inputTime: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    daysField: document.querySelector('[data-days]'),
    hoursField: document.querySelector('[data-hours]'),
    minutesField: document.querySelector('[data-minutes]'),
    secondsField: document.querySelector('[data-seconds]'),
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0].getTime() <= Date.now()) {
          Notify.warning('Please choose a date in the future');
      } else {
          refs.startBtn.disabled = false;
          targetTime = selectedDates[0].getTime()
          refs.startBtn.addEventListener('click', onStartBtnClick)
      }
  },
};

let timerId = null;
const timeSelector = new flatpickr(refs.inputTime, options)
const timer = {
    start(finishTime) {
        refs.startBtn.disabled = true;
        refs.startBtn.removeEventListener('click', onStartBtnClick);
        timerId = setInterval(() => {
            populateTimer(convertMs(finishTime - Date.now()))
        }, 1000)
    }
};



function addLeadingZero(value) {
    return String(value).padStart(2, 0)
}

function convertMs(ms) {
    if (ms < 1000) {
        clearInterval(timerId)
    }
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function populateTimer({ days, hours, minutes, seconds }) {
    refs.daysField.textContent = days
    refs.hoursField.textContent = hours
    refs.minutesField.textContent = minutes
    refs.secondsField.textContent = seconds
}

function onStartBtnClick() {
    timer.start(targetTime)
}