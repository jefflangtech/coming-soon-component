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

emailForm.addEventListener('submit', (e) => {
  emailInput.classList.add('error');
  errorMsg.classList.add('error');
});