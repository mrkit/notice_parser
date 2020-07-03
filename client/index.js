import axios from 'axios';
import './stylesheets/main.scss';

const njForm = document.getElementById('njForm');
const pdfInput = document.getElementById("pdfInput");
const statusMessage = document.getElementById('message');
const preview = document.getElementById('preview');

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
})