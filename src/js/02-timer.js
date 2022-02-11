import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStartRef = document.querySelector('button');
const inputRef = document.querySelector('#datetime-picker');
//------ФУНКЦИЯ ПОДСЧЕТА ЗНАЧЕНИЙ------//
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// const refs = {
//   days: document.querySelector('[data-days]'),
//   hours: document.querySelector('[data-hours]'),
//   minutes: document.querySelector('[data-minutes]'),
//   seconds: document.querySelector('[data-seconds]'),
// };

let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userDate = selectedDates[0].getTime();
    if (Date.now() > userDate) {
      alert('Please choose a date in the future');
      btnStartRef.setAttribute('disabled', 'disable');
      return;
    }
    //Eсли пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
    btnStartRef.removeAttribute('disabled');
  },
};

//---
const padNum = num => String(num).padStart(2, 0);

const onTimer = () => {
  let intervalId = null;
  intervalId = setInterval(() => {
    const currentDate = Date.now();
    const diff = userDate - currentDate;
    console.log(intervalId);
  }, 1000);
};

flatpickr('#datetime-picker', options);
btnStartRef.addEventListener('click', onTimer);
