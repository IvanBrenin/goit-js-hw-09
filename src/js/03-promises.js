import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputForm: document.querySelector('.form')
}

refs.inputForm.addEventListener('submit', onSubmit)

function onSubmit(event) {
  event.preventDefault();

let delay = +refs.inputForm.delay.value; 
const step = +refs.inputForm.step.value;
const amount = +refs.inputForm.amount.value;

for (let i = 1; i <= amount; i+=1) {
  createPromise(i, delay).then(onResolve).catch(onReject); 
  delay += step;   
}
  event.currentTarget.reset(); 
}

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
const shouldResolve = Math.random() > 0.3;

setTimeout(() => {
  if (shouldResolve) {
resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
reject(`❌ Rejected promise ${position} in ${delay}ms`); 
  }
}, delay)
  }); 
}

function onResolve(value) {
  Notify.success(value);
}

function onReject(error) {
  Notify.failure(error);
}
