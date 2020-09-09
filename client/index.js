import axios from 'axios';
import './stylesheets/main.scss';
import createTermsForm from './components/termsFormComponent';

const pdfInput = document.getElementById("pdfInput");
const statusMessage = document.getElementById('message');
const preview = document.getElementById('preview');
const termsList = document.getElementById('termsList');
const parserForm = document.getElementById('parserForm');

const preferencesBtn = document.getElementById('preferencesBtn');
const preferences = document.getElementById('preferences');

window.onload = init;
const termsForm = createTermsForm('Submit'); 
document.querySelector('.right').prepend(termsForm); //prepend to .right element
//Add terms update form to the modalUpdate (consolidate modal and modalUpdate eventually);
const modalUpdate = document.getElementById('modalUpdate');
const termsFormUpdate = document.getElementById('termsFormUpdate');
termsFormUpdate.appendChild(createTermsForm('Update', 'termsUpdateForm'));

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

  // const pdfFileName = pdfInput.files[0].name;
  // const writeText = e.target.writeText.checked;
  // const writeHTML = e.target.writeHTML.checked;
  const openGDrive = e.target.openGDrive.checked; 

  // const pdfFile = document.querySelector('[type="file"]').files[0]; //used only if I'm sending individual input

  const formData = new FormData(parserForm);

  axios.post('/api/parser', formData)
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

  /* Elements to Bind to li */
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
  
  /* Create updateForm* and deleteForm elements */
  const updateForm = document.createElement('button')
  updateForm.textContent = "Update";
  const deleteForm = document.createElement('form');

  /* --- Update Inputs --- */
  // const termsUpdateForm = createTermsForm('Update', term);
  // termsFormUpdate.addEventListener('submit', handleSubmitUpdateForm)

  // const updateInput = document.createElement('input');
  // updateInput.setAttribute('type', 'submit');
  // updateInput.setAttribute('value', 'Edit');
  
  // const updateInputData = document.createElement('input');
  // updateInputData.setAttribute('type', 'hidden');
  // updateInputData.setAttribute('name', 'updateTerm');
  // updateInputData.setAttribute('value', JSON.stringify(term));

  /* --- Delete Inputs --- */
  const deleteInput = document.createElement('input');
  deleteInput.setAttribute('type', 'submit');
  deleteInput.setAttribute('value', 'Delete');
  
  const deleteInputData = document.createElement('input');
  deleteInputData.setAttribute('type', 'hidden');
  deleteInputData.setAttribute('name', 'deleteTerm');
  deleteInputData.setAttribute('value', JSON.stringify(term));

  // updateForm.append(updateInput, updateInputData);
  deleteForm.append(deleteInput, deleteInputData);

  updateForm.addEventListener('click', function(e){
    /* Function's purpose: Reveal the modal, create the form, append it to the modal */
    modalUpdate.style.display = "grid";

    const termsUpdateForm = document.getElementById('termsUpdateForm');
    //Attach term to hidden input so you have access in the handleUpdateTerm function
    const updateInputData = document.createElement('input');
    updateInputData.setAttribute('type', 'hidden');
    updateInputData.setAttribute('name', 'updateTerm');
    updateInputData.value = term.id; //pass the ID - fix this naming
    termsUpdateForm.appendChild(updateInputData);

    console.log('termsUpdateForm ===', term.id);

    //This is the first input, fill it with the current term string
    termsUpdateForm[0].value = term.string;
    //If there is no current term string, update the placeholder
    if(!term.string){
      termsUpdateForm[0].placeholder = "Update term";
    }

    // Uncheck all flags in the update modal. This makes selecting them from the current work
    Object.keys(termsUpdateForm).forEach(x => {
      if(termsUpdateForm[x].name == "flags"){
        termsUpdateForm[x].checked = false;
      }
    });

    // Reselect all the flags from the original term
    Object.keys(termsUpdateForm).forEach(x => {
      if(termsUpdateForm[x].name == "flags"){
        if(term.flags.match(/g/i) && termsUpdateForm[x].value == 'g'){
          termsUpdateForm[x].checked = true;
        } 

        if(term.flags.match(/i/i) && termsUpdateForm[x].value == 'i'){
          termsUpdateForm[x].checked = true;
        } 

        if(term.flags.match(/m/i) && termsUpdateForm[x].value == 'm'){
          termsUpdateForm[x].checked = true;
        } 
      }
    });

    // Update bold, underline, highlight, colorpicker, and the markup

    
    termsUpdateForm.addEventListener('submit', handleUpdateTerm);
  });

  deleteForm.addEventListener('submit', handleDeleteTerm);

  li.appendChild(updateForm);
  li.appendChild(deleteForm);

  //Attach to preferences unordered list
  termsList.appendChild(li);
}

// merge this with handleTerm eventually
function handleUpdateTerm(e){
  e.preventDefault();
  const string = e.target.term.value;
  const flags = stringifyFlags();
  let markup = e.target.markup.value;
  const termId = e.target.updateTerm.value;
  console.log("TermID =", termId);
  
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

   axios.put(`/api/terms/${termId}`, { string, flags, markup })
  .then(res => res.data)
  .then(term => {
    console.log('Updated term right?', term);
    // 
  })
  .catch(err => console.log(`Axios Put Error = ${err.message}`));

  e.target.term.value = '';
  e.target.markup.value = '';
}

const modal = document.getElementById('modal');

window.onclick = function(e){
  if(e.target == modal){
    modal.style.display = 'none';
  }
  if(e.target == modalUpdate){
    modalUpdate.style.display = 'none';
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
