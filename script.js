let myBtn = document.getElementById("myBtn");
myBtn.addEventListener("click", callServer);

function callServer() {
  let number = document.getElementById("number").value;

  fetch("http://localhost:5050/fibonacci/" + number)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
}
