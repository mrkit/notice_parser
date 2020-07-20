function createTermsForm(submitType){
  const termsForm = document.createElement('form');
  termsForm.className = 'termsForm';

  /* --- Div for Inputs and Checkboxes --- */
  const termInputDiv = document.createElement('div');

  const addTermLabel = document.createElement('label');
  addTermLabel.setAttribute('htmlFor', 'termInput')
  addTermLabel.textContent = 'Add Term /';

  const termInput = document.createElement('input');
  termInput.id = 'termInput'
  termInput.setAttribute('type', 'text');
  termInput.setAttribute('name', 'term');
  // termInput.setAttribute('tabindex', '1');
  termInput.setAttribute('placeholder', 'Add new term');
  termInput.setAttribute('autocomplete', 'off');

  addTermLabel.appendChild(termInput);

  const flagCheckboxG = document.createElement('input');
  flagCheckboxG.setAttribute('type', 'checkbox');
  flagCheckboxG.setAttribute('name', 'flags');
  // flagCheckboxG.setAttribute('tabindex', '3');
  flagCheckboxG.setAttribute('value', 'g');

  const flagCheckboxI = document.createElement('input');
  flagCheckboxI.setAttribute('type', 'checkbox');
  flagCheckboxI.setAttribute('name', 'flags');
  // flagCheckboxI.setAttribute('tabindex', '4');
  flagCheckboxI.setAttribute('value', 'i');

  const flagCheckboxM = document.createElement('input');
  flagCheckboxM.setAttribute('type', 'checkbox');
  flagCheckboxM.setAttribute('name', 'flags');
  // flagCheckboxM.setAttribute('tabindex', '5');
  flagCheckboxM.setAttribute('value', 'm');

  termInputDiv.append(addTermLabel, '/', flagCheckboxG, 'g', flagCheckboxI, 'i', flagCheckboxM, 'm');

  /* --- End Input Div --- */

  /* --- Common Markups Quick Select --- */
  const quickSelectDiv = document.createElement('div');
  quickSelectDiv.className = 'quick-select';

  //Highlight
  const highlightLabel = document.createElement('label');
  highlightLabel.textContent = "Highlight"

  const highlightCheckbox = document.createElement('input');
  highlightCheckbox.setAttribute('type', 'checkbox');
  highlightCheckbox.setAttribute('name', 'highlight');

  highlightLabel.appendChild(highlightCheckbox);

  //ColorPicker
  const colorPicker = document.createElement('input');
  colorPicker.setAttribute('type', 'color');
  colorPicker.setAttribute('name', 'colorPicker');
  colorPicker.setAttribute('value', '#FFC0CB');

  //Bold
  const boldLabel = document.createElement('label');
  boldLabel.textContent = 'Bold';

  const boldCheckbox = document.createElement('input');
  boldCheckbox.setAttribute('type', 'checkbox');

  boldLabel.appendChild(boldCheckbox);

  //Underline
  const underlineLabel = document.createElement('label');
  underlineLabel.textContent = 'Underline';

  const underlineCheckbox = document.createElement('input');
  underlineCheckbox.setAttribute('type', 'checkbox');

  underlineLabel.appendChild(underlineCheckbox);

  const toggleMarkupBtn = document.createElement('button');
  toggleMarkupBtn.textContent = '∞';
  toggleMarkupBtn.addEventListener('click', function(e){
    if(addMarkupLabel.style.display == 'none'){
      addMarkupLabel.style.display = 'block';
    } else {
      addMarkupLabel.style.display = 'none';
    }
  })

  
  /* --- Advanced Toggle: --- */
  const addMarkupLabel = document.createElement('label');
  addMarkupLabel.setAttribute('htmlFor', 'markupInput')
  addMarkupLabel.textContent = 'Advanced Markup ';
  addMarkupLabel.className = 'markup-input';
  
  const markupInput = document.createElement('input');
  markupInput.id = 'markupInput';
  markupInput.setAttribute('type', 'text');
  markupInput.setAttribute('name', 'markup');
  // markupInput.setAttribute('tabindex', '2');
  markupInput.setAttribute('placeholder', 'Markup');
  markupInput.setAttribute('autocomplete', 'off');
  
  addMarkupLabel.appendChild(markupInput);
  addMarkupLabel.style.display = 'none';
  
  const submitForm = document.createElement('input');
  submitForm.setAttribute('type', 'submit');
  submitForm.setAttribute('value', submitType);
  
  quickSelectDiv.append(boldLabel, underlineLabel, highlightLabel, colorPicker, toggleMarkupBtn);
  termsForm.append(termInputDiv, quickSelectDiv, addMarkupLabel, submitForm);
  document.querySelector('.right').prepend(termsForm);
  
  return termsForm; //not necessary?
}

module.exports = createTermsForm;