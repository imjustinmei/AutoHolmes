window.addEventListener('load', () => {
  chrome.storage.sync.get(['period', 'index', 'active', 'password'], (values) => {
    if (!values['active']) return;

    var s = document.createElement('script');
    s.dataset.data = JSON.stringify({ period: values['period'], index: values['index'], focus: values['focus'], password: values['password'] });
    s.src = chrome.runtime.getURL('content.js');
    s.onload = function () {
      this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
  });
});
