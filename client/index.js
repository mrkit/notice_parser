import axios from 'axios';
import './stylesheets/main.scss';
import createTermsForm from './components/termsFormComponent';

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
  let markup = e.target.markup.value;

  const bold = e.target.bold.checked;
  const underline = e.target.underline.checked;
  const highlight = e.target.highlight.checked;
  const color = highlight ? e.target.colorPicker.value : null; //make dependent on highlight being true

  if(markup == ''){
    const span = document.createElement('span');
    span.textContent = '$&';
    span.style.fontWeight = bold ?  'bold' : 'normal';
    span.style.textDecoration = underline ? 'underline' : 'none';
    span.style.backgroundColor = highlight ? color : 'initial';
    let temp = JSON.parse(JSON.stringify(span, ["textContent", "style", "backgroundColor", "fontWeight", "textDecoration"]));
    
    markup = String.raw`<span style="background-color:${temp.style.backgroundColor};font-weight:${temp.style.fontWeight};text-decoration:${temp.style.textDecoration}">${temp.textContent}</span>`;
  } 

  console.log("Waht is markup", markup);

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

  // li.innerHTML = `<span class="t-string">${term.string.substring(0,30)}...</span><span class="t-flags">${term.flags}</span><span class="t-markup"></span>`;

  const tStringSpan = document.createElement('span');
  tStringSpan.className = 't-string';
  tStringSpan.textContent = term.string.substring(0, 50);

  const tFlagsSpan = document.createElement('span');
  tFlagsSpan.className = 't-flags'
  tFlagsSpan.textContent = term.flags;

  const tMarkupSpan = document.createElement('span');
  tMarkupSpan.className = 't-markup'
  tMarkupSpan.textContent = term.markup.substring(0, 60);

  li.append(tStringSpan, tFlagsSpan, tMarkupSpan);
  
  const updateForm = document.createElement('form');
  const deleteForm = document.createElement('form');

  /* --- Update Inputs --- */
  const updateInput = document.createElement('input');
  updateInput.setAttribute('type', 'submit');
  updateInput.setAttribute('value', 'Edit');
  
  const updateInputData = document.createElement('input');
  updateInputData.setAttribute('type', 'hidden');
  updateInputData.setAttribute('name', 'updateTerm');
  updateInputData.setAttribute('value', JSON.stringify(term));

  /* --- Delete Inputs --- */
  const deleteInput = document.createElement('input');
  deleteInput.setAttribute('type', 'submit');
  deleteInput.setAttribute('value', 'Delete');
  
  const deleteInputData = document.createElement('input');
  deleteInputData.setAttribute('type', 'hidden');
  deleteInputData.setAttribute('name', 'deleteTerm');
  deleteInputData.setAttribute('value', JSON.stringify(term));

  updateForm.append(updateInput, updateInputData);
  deleteForm.append(deleteInput, deleteInputData);

  updateForm.addEventListener('submit', handleUpdateTerm);
  deleteForm.addEventListener('submit', handleDeleteTerm);

  li.appendChild(updateForm);
  li.appendChild(deleteForm);

  //Attach to preferences unordered list
  termsList.appendChild(li);
}

function handleUpdateTerm(e){
  e.preventDefault();
  const term = JSON.parse(e.target.updateTerm.value);

  console.log("Term =", term);
  axios.put(`/api/terms/${term.id}`, term)
  .then(res => res.data)
  .then(term => console.log('Term right?', term))
  .catch(err => console.log(`Axios Put Error = ${err.message}`));
}

const modal = document.getElementById('modal');

window.onclick = function(e){
  if(e.target == modal){
    modal.style.display = 'none';
  }
}

function handleDeleteTerm(e){
  e.preventDefault();
  const term = JSON.parse(e.target.deleteTerm.value); // Change this to just be the ID?
  
  //Reveal Modal - modalForm handles the actual delete
  modal.style.display = 'grid';

  const modalString = document.getElementById('modalString');
  const modalMarkup = document.getElementById('modalMarkup');

  modalString.textContent = term.string + '/' + term.flags;
  modalMarkup.textContent = term.markup;

  window.deletedTerm = term;
}

//Add string and markup to modal
const modalForm = document.getElementById('modalForm');

modalForm.addEventListener('submit', e => {
  e.preventDefault();
  const deleteTerm = e.target.delete.value;
  const term = window.deletedTerm;
  console.log('What is window.deletedTerm', term);
  if(deleteTerm == 'yes'){
    console.log("made it in delete term")
    axios.delete(`/api/terms/${term.id}`)
    .then(res => res.data)
    .then(termId => {
      //filter terms in preferences
      console.log('Terms list', termId );
      termsList.children = []
    })
    .catch(err => console.log(`Axios Delete Error = ${err.message}`));
    modal.style.display = 'none';
  } else {
    modal.style.display = 'none';
  }

  window.deletedTerm = null; //should i be using the window object to shuttle around the term like this?
})
