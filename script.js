var state = [];
function questionHandler() {
  const arrows = document.querySelectorAll('.fa-arrow-alt-circle-right');

  arrows.forEach(element => {
    element.addEventListener('click', () => {
      const parent = element.parentElement.parentElement;
      const input = element.previousElementSibling;
      const nextForm = parent.nextElementSibling;
      console.log(nextForm);
      // state.push(input.value);
    });
  });
}

function validateForm(input) {
  if (input.value.length < 3) {
  }
}

questionHandler();
