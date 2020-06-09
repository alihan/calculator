let runningTotal = 0;
let buffer = "0";
let previousOperator;
const output = document.querySelector(".output");

document
  .querySelector(".calc-btns")
  .addEventListener("click", function (event) {
    if(event.target.innerText.length > 1) {
      removeEventListener("click",false)
    }
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    default:
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = " ";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "%") {
    runningTotal = runningTotal / 100;
  } else if (previousOperator === "+/-") {
    runningTotal = runningTotal * -1;
  } else {
    runningTotal /= intBuffer;
  }
}

function rerender() {
  output.innerText = buffer;
}
