let saved = false;

const handleSave = () => {
  let period = document.getElementById('periodInput').value;
  let index = document.getElementById('indexInput').value;
  let password = document.getElementById('passwordInput').value;
  if (!period || period.toUpperCase() != period.toLowerCase() || !index || index.toUpperCase() != index.toLowerCase() || password == 'password') return;

  period = Math.min(period, 10);
  index = Math.min(index, 170);
  updateValue('period', period);
  updateValue('index', index);
  updateValue('password', password);
};

const updateValue = (name, value) => {
  if (name != 'password') value = Math.max(0, value);
  chrome.storage.sync.set({ [name]: value }, function () {
    if (window['saved']) return;
    window['saved'] = true;

    document.getElementById(name + 'Input').value = value;

    let button = document.getElementById('save');
    button.innerHTML = 'Saved!';
    button.classList.add('saved');

    setTimeout(() => {
      button.innerHTML = 'Save';
      button.classList.remove('saved');
      window['saved'] = false;
    }, 1000);
  });
};

document.getElementById('save').addEventListener('click', handleSave);
document.getElementById('active').addEventListener('click', () => {
  chrome.storage.sync.set({ active: document.getElementById('active').checked });
});

chrome.storage.sync.get(['period', 'index', 'active', 'password'], (values) => {
  document.getElementById('periodInput').value = !values['period'] ? '' : values['period'];
  document.getElementById('indexInput').value = !values['index'] ? '' : values['index'];
  document.getElementById('passwordInput').value = !values['password'] ? '' : 'password';
  document.getElementById('active').checked = values['active'];
});
