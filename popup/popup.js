let periodSaved = (indexSaved = false);

const handlePeriodSubmit = () => {
  let period = document.getElementById('periodInput').value;
  if (period == '' || period.toUpperCase() != period.toLowerCase()) return;

  period = Math.min(period, 10);
  updateValue('period', period);
};

const handleIndexSubmit = () => {
  let index = document.getElementById('indexInput').value;
  if (index == '' || index.toUpperCase() != index.toLowerCase()) return;

  index = Math.min(index, 170);
  updateValue('index', index);
};

const updateValue = (name, value) => {
  value = Math.max(0, value);
  chrome.storage.sync.set({ [name]: value }, function () {
    if (window[name + 'Saved']) return;
    window[name + 'Saved'] = true;

    document.getElementById(name + 'Input').value = value;

    let button = document.getElementById(name);
    button.innerHTML = 'Saved!';
    button.classList.add('saved');

    setTimeout(() => {
      button.innerHTML = 'Save';
      button.classList.remove('saved');
      window[name + 'Saved'] = false;
    }, 1000);
  });
};

const toggleCheckbox = (name) => {
  chrome.storage.sync.set({ [name]: document.getElementById(name).checked });
};

document.getElementById('period').addEventListener('click', handlePeriodSubmit);
document.getElementById('index').addEventListener('click', handleIndexSubmit);

document.getElementById('active').addEventListener('click', () => {
  toggleCheckbox('active');
});
document.getElementById('focus').addEventListener('click', () => {
  toggleCheckbox('focus');
});

chrome.storage.sync.get(['period', 'index', 'active', 'focus'], (values) => {
  document.getElementById('periodInput').value = !values['period'] ? '' : values['period'];
  document.getElementById('indexInput').value = !values['index'] ? '' : values['index'];
  document.getElementById('active').checked = values['active'];
  document.getElementById('focus').checked = values['focus'];
});
