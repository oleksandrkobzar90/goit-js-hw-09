const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value;

  saveToLS(localStorageKey, formData);
});

document.addEventListener('DOMContentLoaded', e => {
  const data = loadFromLS(localStorageKey, {});

  formData.email = data.email || '';
  formData.message = data.message || '';
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
});

form.addEventListener('submit', evt => {
  evt.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(localStorageKey);

  form.reset();

  formData.email = '';
  formData.message = '';
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
