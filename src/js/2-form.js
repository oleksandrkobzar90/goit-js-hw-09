const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

const savedData = JSON.parse(localStorage.getItem(localStorageKey));
if (savedData) {
  formData.email = savedData.email || '';
  formData.message = savedData.message || '';
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name in formData) {
    formData[name] = value;
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(localStorageKey);
  formData.email = '';
  formData.message = '';
  form.reset();
});
