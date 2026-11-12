const firstInput = document.getElementById('firstInput');
const secondInput = document.getElementById('secondInput');
const output = document.getElementById('output');
const operations = document.querySelector('.operations');

function showError(text) {
  output.textContent = text;
  output.classList.add('output-error');
}

function showAnswer(value) {
  output.textContent = 'Відповідь: ' + value;
  output.classList.remove('output-error');
}

// Перетворює рядок на число. Повертає NaN, якщо формат неправильний.
function toNumber(text) {
  const clean = text.trim().replace(',', '.');
  // Дозволено: цифри або цифри.цифри, з необов'язковим мінусом
  if (!/^-?\d+(\.\d+)?$/.test(clean)) {
    return NaN;
  }
  return Number(clean);
}

function compute(action) {
  const a = toNumber(firstInput.value);
  const b = toNumber(secondInput.value);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    showError('Некоректні дані! Введіть числа в обидва поля.');
    return;
  }

  let answer;

  switch (action) {
    case 'add':
      answer = a + b;
      break;
    case 'subtract':
      answer = a - b;
      break;
    case 'multiply':
      answer = a * b;
      break;
    case 'divide':
      if (b === 0) {
        showError('Ділити на нуль неможливо!');
        return;
      }
      answer = a / b;
      break;
  }

  // Якщо число не ціле, округлюємо до сотих
  if (!Number.isInteger(answer)) {
    answer = Math.round(answer * 100) / 100;
  }

  showAnswer(answer);
}

operations.addEventListener('click', function (event) {
  const action = event.target.dataset.action;
  if (action) {
    compute(action);
  }
});