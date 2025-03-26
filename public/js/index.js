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

async function getTLDlist() {

  const url = 'https://data.iana.org/TLD/tlds-alpha-by-domain.txt';
  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const file = await response.text();
    if(!file) {
      throw new Error(`Error with file stream`);
    }

  }
  catch (error) {
    console.error(error.message);
  }
}

// Basic start of custom email validation
const emailForm = document.getElementById('email-capture');
const emailInput = document.getElementById('email-input');
const errorMsg = document.getElementById('error-message');

const prefixPattern = /^(?=.{1,64}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;

emailForm.addEventListener('submit', (e) => {

  e.preventDefault();
  const userEmail = emailInput.value;

  try {
    const emailArray = userEmail.split('@');
    if(emailArray.length !== 2) throw new Error('Missing @ symbol');

    const prefix = emailArray[0];
    if (!prefixPattern.test(prefix)) throw new Error('Invalid email prefix');

    const domains = emailArray[1].split('.');
    console.log(domains);

    emailInput.classList.remove('error');
    errorMsg.classList.remove('error');
  }
  catch (error) {
    console.error(`Error: ${error.message}`);
    emailInput.classList.add('error');
    errorMsg.classList.add('error');
  }



  // console.log(prefixPattern.test(prefix));


  // emailInput.classList.add('error');
  // errorMsg.classList.add('error');
});