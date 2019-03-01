var state = {
  question1: {
    question: 'Type of Account',
    answer: ''
  },
  question2: {
    question: 'Select a Region',
    answer: ''
  },
  question3: {
    question: 'Type of Service',
    answer: ''
  },
  question4: {
    question: 'Something Something',
    answer: ''
  },
  question5: {
    question: 'Comments',
    answer: ''
  },
  errors: ''
};
const elements = {
  arrows: document.querySelectorAll('.fa-arrow-alt-circle-right'),
  back: document.querySelectorAll('.fa-arrow-alt-circle-left'),
  error: document.querySelector('.error-message'),
  form: document.querySelector('form'),
  summary: document.querySelector('#summary'),
  personal: document.querySelector('#personal'),
  business: document.querySelector('#business')
};

function questionHandler() {
  const arrows = elements.arrows;

  arrows.forEach(element => {
    element.addEventListener('click', () => {
      const parent = element.parentElement.parentElement;
      const input = element.previousElementSibling;
      const nextQuestion = parent.nextElementSibling;

      switch (elements.personal.checked) {
        case true:
          state.question1.answer = elements.personal.value;
          if (state.errors === '') {
            nextForm(parent, nextQuestion);
          }
          break;
        case false:
          state.question1.answer = elements.business.value;
          if (state.errors === '') {
            nextForm(parent, nextQuestion);
          }
          break;
        default:
          break;
      }

      switch (input.name) {
        case 'question2':
          validateForm(input);
          if (state.errors === '') {
            state.question2.answer = input.value;
            nextForm(parent, nextQuestion);
            state.errors = '';
          }
          break;
        default:
          break;
      }
      // if (nextQuestion === null) {
      //   state.question5.answer = input.value;
      //   clearForm();
      //   document.body.style.background =
      //     'linear-gradient(to right, #fdc830, #f37335)';
      //   renderAnswers(state);
      // }
    });
  });

  elements.back.forEach(element => {
    element.addEventListener('click', () => {
      const parent = element.parentElement.parentElement;
      const prevQuestion = parent.previousElementSibling;
      previousForm(parent, prevQuestion);
    });
  });
}

function nextForm(parent, nextQuestion) {
  parent.classList.add('inactive');
  parent.classList.remove('active');
  nextQuestion.classList.add('active');
}

function previousForm(parent, prevQuestion) {
  parent.classList.add('inactive');
  parent.classList.remove('active');
  prevQuestion.classList.add('active');
}

function clearForm() {
  elements.form.style.display = 'none';
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
    state.errors = message;
    document.body.style.background =
      'linear-gradient(to right, #ED213A, #93291E)';
    elements.error.textContent = message;
    elements.error.style.display = 'block';
  } else {
    state.errors = '';
    document.body.style.background =
      'linear-gradient(to right, #134E5E, #71B280)';
    elements.error.textContent = '';
    elements.error.style.display = 'none';
  }
}

function renderAnswers(state) {
  const markup = `
  <div class="summary__container">
    <h2 class="summary__title">Summary</h2>
    <div class="summary__questions">
      <ul class="summary__list">
        <li class="summary__item">
          <p>${state.question1.answer}}</p>
        </li>
        <li class="summary__item">
          <p>${state.question2.answer}</p>
        </li>
        <li class="summary__item">
          <p>$${state.question3.answer}</p>
        </li>
        <li class="summary__item">
          <p>${state.question4.answer}</p>
        </li>
        <li class="summary__item">
          <p>${state.question5.answer}</p>
        </li>
      </ul>
    </div>
  </div>
  `;
  elements.summary.insertAdjacentHTML('afterbegin', markup);
}

questionHandler();
