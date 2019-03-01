var state = [];
const elements = {
  arrows: document.querySelectorAll('.fa-arrow-alt-circle-right'),
  error: document.querySelector('.error-message'),
  form: document.querySelector('form')
};

function questionHandler() {
  const arrows = elements.arrows;

  arrows.forEach(element => {
    element.addEventListener('click', () => {
      const parent = element.parentElement.parentElement;
      const input = element.previousElementSibling;
      const nextQuestion = parent.nextElementSibling;

      if (
        input.type === 'text' &&
        validateForm(input) &&
        nextQuestion !== null
      ) {
        state.push(input.value);
        nextForm(parent, nextQuestion);
      } else if (nextQuestion === null) {
        state.push(input.value);
        elements.form.textContent = state.toString();
      }
    });
  });
}

function nextForm(parent, nextQuestion) {
  parent.classList.add('inactive');
  parent.classList.remove('active');
  nextQuestion.classList.add('active');
}

function validateForm(input) {
  if (input.value.length < 3) {
    error(true, 'not enough characters');
  } else {
    error(false);
    return true;
  }
}

function error(error, message) {
  if (error) {
    document.body.style.background =
      'linear-gradient(to right, #ED213A, #93291E)';
    elements.error.textContent = message;
    elements.error.style.display = 'block';
  } else {
    document.body.style.background =
      'linear-gradient(to right, #134E5E, #71B280)';
    elements.error.textContent = '';
    elements.error.style.display = 'none';
  }
}

questionHandler();
