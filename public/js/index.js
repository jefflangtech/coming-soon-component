const overlay = document.getElementById('overlay');

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'u') {
      event.preventDefault();
      if (overlay) {
        console.dir(overlay);
        overlay.hidden = !overlay.hidden;
      }
  }
});

// Basic start of custom email validation
const emailForm = document.getElementById('email-capture');
const emailInput = document.getElementById('email-input');
const errorMsg = document.getElementById('error-message');

const prefixPattern = /^(?=.{1,64}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;

emailForm.addEventListener('submit', (e) => {

  e.preventDefault();
  const prefix = emailInput.value;

  // console.log(prefixPattern.test(prefix));

  const atPos = findAt(prefix);
  if(atPos < 1 || atPos > prefix.length - 2) { 
    console.log('error');
    return;
  };

  console.log(findAt(prefix));

  // emailInput.classList.add('error');
  // errorMsg.classList.add('error');
});

function findAt(str) {
  return str.indexOf('@');
}