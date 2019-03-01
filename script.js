var state = {
  question1: {
    question: 'Type of Account',
    answer: ''
  },
  question2: {
    question: 'Category',
    answer: ''
  },
  question3: {
    question: 'Name of Department',
    answer: ''
  },
  question4: {
    question: 'Question Title',
    answer: ''
  },
  question5: {
    question: 'Additional Information',
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
  business: document.querySelector('#business'),
  options: document.querySelector('#account-plan')
};

function questionHandler() {
  const arrows = elements.arrows;

  arrows.forEach(element => {
    element.addEventListener('click', () => {
      const parent = element.parentElement.parentElement;
      const input = element.previousElementSibling;
      const nextQuestion = parent.nextElementSibling;
      const personal = elements.personal;
      const business = elements.business;
      console.log(parent);

      if (parent.classList.contains('checked')) {
        switch (true) {
          case personal.checked:
            state.question1.answer = '';
            state.question1.answer = elements.personal.value;
            renderOptions();
            nextForm(parent, nextQuestion);
            break;
          case business.checked:
            state.question1.answer = '';
            state.question1.answer = elements.business.value;
            renderOptions();
            nextForm(parent, nextQuestion);
            break;
          default:
            return;
        }
      }

      switch (input.name) {
        case 'question2':
          state.question2.answer = input.value;
          nextForm(parent, nextQuestion);
          state.errors = '';

          break;
        case 'question3':
          if (validateForm(input)) {
            state.question3.answer = input.value;
            nextForm(parent, nextQuestion);
            state.errors = '';
          } else {
            return;
          }
          break;
        case 'question4':
          if (validateForm(input)) {
            state.question4.answer = input.value;
            nextForm(parent, nextQuestion);
            state.errors = '';
          } else {
            return;
          }
          break;
        case 'question5':
          if (validateForm(input)) {
            state.question5.answer = input.value;
            clearForm();
            state.errors = '';
          } else {
            return;
          }
          document.body.style.background =
            'linear-gradient(to right, #fdc830, #f37335)';
          renderAnswers(state);
          break;
        default:
          break;
      }
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
  if (nextQuestion) {
    parent.classList.add('inactive');
    parent.classList.remove('active');
    nextQuestion.classList.add('active');
  }
}

function previousForm(parent, prevQuestion) {
  parent.classList.add('inactive');
  parent.classList.remove('active');
  prevQuestion.classList.add('active');
  state.errors = '';
  error(false, '');
}

function clearForm() {
  elements.form.style.display = 'none';
}

function validateForm(input) {
  if (input.value.length === 0) {
    error(true, "Field can't be empty");
  } else if (input.value.length > 200) {
    error(true, 'Too many characters');
  } else if (input.value.length <= 3) {
    error(true, 'Not enough characters');
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
        <h4>${state.question1.question}</h4>
          <p>${state.question1.answer}</p>
        </li>
        <li class="summary__item">
        <h4>${state.question2.question}</h4>
          <p>${state.question2.answer}</p>
        </li>
        <li class="summary__item">
        <h4>${state.question3.question}</h4>
          <p>${state.question3.answer}</p>
        </li>
        <li class="summary__item">
        <h4>${state.question4.question}</h4>
          <p>${state.question4.answer}</p>
        </li>
        <li class="summary__item">
        <h4>${state.question5.question}</h4>
          <p>${state.question5.answer}</p>
        </li>
      </ul>
    </div>
  </div>
  `;
  elements.summary.insertAdjacentHTML('afterbegin', markup);
}

function renderOptions() {
  let markup;
  switch (state.question1.answer) {
    case 'personal':
      markup = `
     <option value="basic">Basic</option>
     <option value="express">Express</option>
     `;
      break;
    case 'business':
      markup = `
    <option value="gold">Gold</option>
     <option value="platinum">Platinum</option>
    `;
      break;
    case '':
      markup = '';
    default:
      break;
  }
  elements.options.innerHTML = '';
  elements.options.insertAdjacentHTML('afterbegin', markup);
}

questionHandler();
