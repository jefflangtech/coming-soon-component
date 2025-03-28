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

// Fetch the top level domains list - text file
async function getTLDlist() {

  const cacheKey = 'tldList';
  const cacheTimeKey = 'tldTimeStamp';
  const maxAge = 1000 * 60 * 60 * 24 * 7;

  const cachedData = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(cacheTimeKey);

  const isFresh = cachedData && cachedTime && (Date.now() - Number(cachedTime) < maxAge);

  if(isFresh) {
    return cachedData;
  }


  try {
    console.log('Fetching TLD data file');
    const url = 'https://data.iana.org/TLD/tlds-alpha-by-domain.txt';
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const file = await response.text();
    if(!file) {
      throw new Error(`Error with file stream`);
    }

    localStorage.setItem(cacheKey, file);
    localStorage.setItem(cacheTimeKey, Date.now().toString());

    return file;
  }
  catch (error) {
    console.error(error.message);
    if(cachedData) {
      return cachedData;
    }
  }
}

async function parseTLDFile() {
  const tldFile = await getTLDlist();

  const parsedTLDs = tldFile.split('\n').filter(line => line && !line.startsWith('#')).map(tld => tld.toLowerCase());

  return parsedTLDs;
}

// Basic start of custom email validation
const emailForm = document.getElementById('email-capture');
const emailInput = document.getElementById('email-input');
const errorMsg = document.getElementById('error-message');

const prefixPattern = /^(?=.{1,64}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const domainPattern = /^(?=.{1,63}$)[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;

emailForm.addEventListener('submit', async (e) => {

  e.preventDefault();
  const userEmail = emailInput.value.toLowerCase();
  const tldList = await parseTLDFile();

  try {

    const emailArray = userEmail.split('@');
    if(emailArray.length !== 2) throw new Error('Missing @ symbol');

    const prefix = emailArray[0];
    if (!prefixPattern.test(prefix)) throw new Error('Invalid email prefix');

    const domains = emailArray[1].split('.');
    if(domains.length <= 1) throw new Error('Improper domain format');

    const tld = domains.pop();
    if(!tldList.includes(tld)) throw new Error('Invalid TLD');

    for(const domain of domains) {
      if(!domainPattern.test(domain)) throw new Error('Invalid DNS label');
    }

    console.log(`Email: ${userEmail}, prefix: ${prefix}, hostname: ${emailArray[1]}`);

    emailInput.classList.remove('error');
    errorMsg.classList.remove('error');

    emailInput.value = '';

  }
  catch (error) {
    console.error(`Error: ${error.message}`);
    emailInput.classList.add('error');
    errorMsg.classList.add('error');
  }
});