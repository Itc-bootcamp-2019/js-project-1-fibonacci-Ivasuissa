let a = 0;
let b = 1;
let y;

function fibonacci(x) {
  let a = 0;
  let b = 1;
  let y;
  for (let i = 2; i <= x; i++) {
    y = a + b;
    a = b;
    b = y;
  }
  console.log(x, y);
  result.innerText = y;
}

function executeFibonnacci() {
  let z = document.getElementById("quantity").value;
  fibonacci(z);
}

document.getElementById("myBtn").addEventListener("click", executeFibonnacci);
