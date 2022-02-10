const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;
const onStart = () => {
  refs.btnStart.setAttribute('disabled', 'disable');
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
};

const onStop = () => {
  refs.btnStart.removeAttribute('disabled');
  clearInterval(intervalId);
  intervalId = null;
};

refs.btnStart.addEventListener('click', onStart);
refs.btnStop.addEventListener('click', onStop);
