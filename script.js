const currentNumberInput = document.getElementById('current-number');
const lastNumberInput = document.getElementById('last-number');
const calculateButton = document.getElementById('calculate-button');
const resultNumber = document.getElementById('result-number');
const resultOddEven = document.getElementById('result-odd-even');

calculateButton.addEventListener('click', () => {
  const currentNumber = parseInt(currentNumberInput.value);
  const lastNumber = parseInt(lastNumberInput.value);

  if (isNaN(currentNumber) || isNaN(lastNumber)) {
    resultNumber.textContent = 'Invalid input';
    resultOddEven.textContent = '';
    return;
  }

  const answer = (currentNumber * lastNumber) / (currentNumber + lastNumber);
  resultNumber.textContent = answer;

  if (answer % 2 === 0) {
    resultOddEven.textContent = 'Even';
    resultOddEven.classList.add('even');
    resultOddEven.classList.remove('odd');
  } else {
    resultOddEven.textContent = 'Odd';
    resultOddEven.classList.add('odd');
    resultOddEven.classList.remove('even');
  }
});