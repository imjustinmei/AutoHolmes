var { period, index, password } = JSON.parse(document.currentScript.dataset.data);
ShowClass('p' + period);
document.getElementsByName('classes')[0].value = 'p' + String(period);
let props = students[index].split('|');
document.getElementsByName('students')[0].value = props[1] + ';' + props[2];
document.getElementsByName('password')[0].value = password;
