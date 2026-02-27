const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

form.addEventListener('input', event => {
  const fromForm = new FormData(form);

  const formData = {
    email: fromForm.get('email'),
    message: fromForm.get('message'),
  };

  saveToLS(localStorageKey, formData);
});

document.addEventListener('DOMContentLoaded', e => {
  const zip = localStorage.getItem(localStorageKey);

  const data = loadFromLS(localStorageKey, {});
  form.elements.email.value = data.email || '';
  form.elements.message.value = data.message || '';
});

form.addEventListener('submit', evt => {
  evt.preventDefault();

  const fromForm = new FormData(form);
  const formData = {
    email: fromForm.get('email'),
    message: fromForm.get('message'),
  };

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(localStorageKey);

  form.reset();
});

function saveToLS(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

function loadFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data ?? defaultValue;
  } catch {
    return jsonData ?? defaultValue;
  }
}
