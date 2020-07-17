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
  termInput.setAttribute('tabindex', '1');
  termInput.setAttribute('placeholder', 'Add new term');
  termInput.setAttribute('autocomplete', 'off');

  addTermLabel.appendChild(termInput);

  const flagCheckboxG = document.createElement('input');
  flagCheckboxG.setAttribute('type', 'checkbox');
  flagCheckboxG.setAttribute('name', 'flags');
  flagCheckboxG.setAttribute('tabindex', '3');
  flagCheckboxG.setAttribute('value', 'g');

  const flagCheckboxI = document.createElement('input');
  flagCheckboxI.setAttribute('type', 'checkbox');
  flagCheckboxI.setAttribute('name', 'flags');
  flagCheckboxI.setAttribute('tabindex', '4');
  flagCheckboxI.setAttribute('value', 'i');

  const flagCheckboxM = document.createElement('input');
  flagCheckboxM.setAttribute('type', 'checkbox');
  flagCheckboxM.setAttribute('name', 'flags');
  flagCheckboxM.setAttribute('tabindex', '5');
  flagCheckboxM.setAttribute('value', 'm');

  termInputDiv.append(addTermLabel, '/', flagCheckboxG, 'g', flagCheckboxI, 'i', flagCheckboxM, 'm');

  /* --- End Input Div --- */

  const addMarkupLabel = document.createElement('label');
  addMarkupLabel.setAttribute('htmlFor', 'markupInput')
  addMarkupLabel.textContent = 'Add Markup';

  const markupInput = document.createElement('input');
  markupInput.id = 'markupInput';
  markupInput.setAttribute('type', 'text');
  markupInput.setAttribute('name', 'markup');
  markupInput.setAttribute('tabindex', '2');
  markupInput.setAttribute('placeholder', 'Markup');
  markupInput.setAttribute('autocomplete', 'off');

  addMarkupLabel.appendChild(markupInput);

  const submitForm = document.createElement('input');
  submitForm.setAttribute('type', 'submit');
  submitForm.setAttribute('value', submitType);

  termsForm.append(termInputDiv, addMarkupLabel, submitForm);
  document.querySelector('.right').prepend(termsForm);
  
  return termsForm; //not necessary?
}

module.exports = createTermsForm;