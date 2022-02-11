import Notiflix from 'notiflix';
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
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userDate = selectedDates[0] /*.getTime()*/;
    if (Date.now() > userDate) {
      Notiflix.Report.failure('Please choose a date in the future');

      btnStartRef.setAttribute('disabled', 'disable');
      return;
    }
    //Eсли пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
    btnStartRef.removeAttribute('disabled');
  },
};

//---
const padNum = num => String(num).padStart(2, 0);
// const month = padNum(currDate.getMonth() + 1);

const onButton = () => {
  const onTimer = setInterval(() => {
    const currentDate = new Date();
    const diff = userDate - currentDate;
    if (diff <= 0) {
      return clearInterval(onTimer);
    }
    const { days, hours, minutes, seconds } = convertMs(diff);
    refs.days.textContent = `${padNum(days)}`;
    refs.hours.textContent = ` ${padNum(hours)}`;
    refs.minutes.textContent = `${padNum(minutes)}`;
    refs.seconds.textContent = ` ${padNum(seconds)}`;
    onTimer();
  }, 1000);
};

flatpickr('#datetime-picker', options);
btnStartRef.addEventListener('click', onButton);
