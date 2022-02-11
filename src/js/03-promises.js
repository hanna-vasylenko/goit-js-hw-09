import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
  btn: document.querySelector('button'),
  delay: document.querySelector('.form input[name="delay"]'),
  step: document.querySelector('.form input[name="step"]'),
  amount: document.querySelector('.form input[name="amount"]'),
};

const handleSubmit = e => {
  e.preventDefault();
  // console.log(e.currentTarget.elements.amount.value);
  let i = 0;
  for (i = 0; i < e.currentTarget.elements.amount.value; i += 1) {
    createPromise(i + 1, e.currentTarget.elements.delay.value)
      .then(({ position, delay }) => {
        //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        //console.log(`❌ Rejected promise ${position} in ${delay}ms`)
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    Number(e.currentTarget.elements.delay.value) + Number(e.currentTarget.elements.step.value);
  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(position, delay);
      } else {
        reject(position, delay);
      }
    }, delay);
  });
}

refs.form.addEventListener('submit', handleSubmit);
