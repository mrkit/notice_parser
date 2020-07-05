import axios from 'axios';
import './stylesheets/main.scss';

const njForm = document.getElementById('njForm');
const pdfInput = document.getElementById("pdfInput");
const statusMessage = document.getElementById('message');
const preview = document.getElementById('preview');
const termsForm = document.getElementById('terms');

pdfInput.addEventListener('change', e => {
  console.log(pdfInput.files);
});

njForm.addEventListener('submit', e => {
  e.preventDefault();

  console.log('pdf File Name =', pdfInput.files[0].name);
  const pdfFileName = pdfInput.files[0].name;
  const writeText = e.target.writeText.checked; //use .checked instead of .value
  const writeHTML = e.target.writeHTML.checked;
  const openGDrive = e.target.openGDrive.checked;

  axios.post('/api/', { pdfFileName, writeText, writeHTML })
  .then(res => res.data)
  .then(pdf => {
    if(statusMessage.childNodes.length){
      statusMessage.removeChild(statusMessage.childNodes[0]);
    }

    const message = document.createTextNode(pdf.message);
    
    statusMessage.appendChild(message);
    preview.innerHTML = pdf.data;

    /* --- How to select DOM text --- */
    const selection = document.createRange();
    selection.setStartBefore(preview);
    selection.setEndAfter(preview);

    window.getSelection().addRange(selection);
    
    /* --- How to copy the above selection to the clipboard ---*/
    document.execCommand('copy');

    /* --- Open Public Notice Site --- */
    if(openGDrive){
      window.open('https://drive.google.com/drive/folders/1etb1RAUp5Fezu7Hl-ckvHh85dda3afAC?usp=sharing');
    }
  })
  .catch(err => console.error(`Axios post error = ${err.message}`));
});

termsForm.addEventListener('submit', e => {
  e.preventDefault();

  const term = e.target.term.value;
  console.log("What is the term", term);
  axios.post('/api/terms', { term })
  .then(res => res.data)
  .then(term => {
    console.log("This is the term that came back", term);
  })
  .catch(err => console.error(`Axios POST terms error = ${err.message}`));
});

window.onload = function(){
  axios.get('/api/terms')
  .then(res => res.data)
  .then(terms => {
    console.log("these are the terms", terms);
  })
  .catch(err => console.error(`Axios GET terms error = ${err.message}`))
}