import axios from 'axios';
import './stylesheets/main.scss';
import createTermsForm from './functions/termsForm';

const pdfInput = document.getElementById("pdfInput");
const statusMessage = document.getElementById('message');
const preview = document.getElementById('preview');
const termsList = document.getElementById('termsList');

const preferencesBtn = document.getElementById('preferencesBtn');
const preferences = document.getElementById('preferences');

window.onload = init;
const termsForm = createTermsForm('Submit');
pdfInput.addEventListener('change', handleBrowseFiles);
parserForm.addEventListener('submit', handleParserForm);
termsForm.addEventListener('submit', handleTermsForm);
preferencesBtn.addEventListener('click', handleTogglePreferences);

/* ---- Functions ---- */
function init(){
  axios.get('/api/terms')
  .then(res => res.data)
  .then(terms => {
    terms.forEach(term => handleAddTerm(term))
  })
  .catch(err => console.error(`Axios GET terms error = ${err.message}`))
}

function handleBrowseFiles(e){
  console.log(pdfInput.files);
}

function handleParserForm(e){
  e.preventDefault();

  const pdfFileName = pdfInput.files[0].name;
  const writeText = e.target.writeText.checked;
  const writeHTML = e.target.writeHTML.checked;
  const openGDrive = e.target.openGDrive.checked;

  axios.post('/api/parser', { pdfFileName, writeText, writeHTML })
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
    
    /* --- How to copy the above selection to the clipboard - should this have a flag to make it optional?---*/
    document.execCommand('copy');

    /* --- Remove selection after copying --- */
    window.getSelection().removeAllRanges();

    /* --- Open Public Notice Site --- */
    if(openGDrive){
      window.open('https://drive.google.com/drive/folders/1etb1RAUp5Fezu7Hl-ckvHh85dda3afAC?usp=sharing');
    }
  })
  .catch(err => console.error(`Axios post error = ${err.message}`));
}

function handleTermsForm (e){
  e.preventDefault();
  const string = e.target.term.value;
  const flags = stringifyFlags();
  const markup = e.target.markup.value;

  axios.post('/api/terms', { string, flags, markup })
  .then(res => res.data)
  .then(term => handleAddTerm(term))
  .catch(err => console.error(`Axios POST terms error = ${err.message}`));

  e.target.term.value = '';
  e.target.markup.value = '';
}

function stringifyFlags(){
  let output = '';
  document.querySelectorAll('input:checked').forEach(flag => {
    if(flag.value !== 'on'){ //checked always returns on as first value. I don't want that in db
      output += flag.value;
    }
  });
  return output;
}

function handleTogglePreferences(e){
  if(window.getComputedStyle(preferences, null).getPropertyValue("display") == "none"){
    preferences.style.display = "block";
  } else {
    preferences.style.display = "none";
  }
}

/* ---- CRUD Functions ---- */

function handleAddTerm(term){
  const li = document.createElement('li');
  li.className = 'termsList-term';
  // li.innerHTML = `<span class="t-string">${term.string}</span><span class="t-flags">${term.flags}</span><span class="t-markup">${term.markup}</span>`;
  const updateForm = document.createElement('form');
  const deleteForm = document.createElement('form');

  const updateInput = `<input type="submit" value="Edit"><input type="hidden" name="updateTerm" value=${JSON.stringify(term)}>`;
  const deleteInput = `<input type="submit" value="Delete"><input type="hidden" name="deleteTerm" value=${JSON.stringify(term)}>`;

  updateForm.innerHTML = updateInput;
  deleteForm.innerHTML = deleteInput;

  updateForm.addEventListener('submit', handleUpdateTerm);
  deleteForm.addEventListener('submit', handleDeleteTerm);

  li.appendChild(updateForm);
  li.appendChild(deleteForm);
  termsList.appendChild(li);
}

function handleUpdateTerm(e){
  e.preventDefault();
  const term = JSON.parse(e.target.updateTerm.value);
}

function handleDeleteTerm(e){
  e.preventDefault();
  const term = JSON.parse(e.target.delteTerm.value);
  //termsForm refill

}



