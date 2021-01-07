import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}


window.addEventListener('load', e => {
  const select = document.querySelector('#valute_select');
  const inputRub = document.querySelector('#input_1');
  const inputValue = document.querySelector('#input_2');
  let currentValute;
  let isChangeRub = true;

  let request = new XMLHttpRequest();
  let data;

  request.open('GET', 'src/scripts/index.json');
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.send();
  request.addEventListener('readystatechange', e => {
    if (request.readyState === 4 && request.status == 200) {
      data = JSON.parse(request.response);

      let valute = data.Valute;
      let i = 0;

      currentValute = valute[Object.keys(valute)[0]].CharCode;

      for (let key in valute) {
        select.options[i] = new Option(valute[key].Name, key);
        i++;
      }
    }
  });

  select.addEventListener('change', e => {
    let value = e.target.value;

    currentValute = value;

    if (isChangeRub) {
      inputValue.value = inputRub.value / data.Valute[currentValute].Value;
    } else {
      inputRub.value = inputValue.value * data.Valute[currentValute].Value;
    }
  });

  inputRub.addEventListener('input', () => {
    isChangeRub = true;

    inputValue.value = inputRub.value / +data.Valute[currentValute].Value;
  });

  inputValue.addEventListener('input', () => {
    isChangeRub = false;

    inputRub.value = inputValue.value * +data.Valute[currentValute].Value;
  });
});