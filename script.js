let result = document.getElementById("result");
let myBtn = document.getElementById("myBtn");
let loader = document.getElementById("loader");
let loaderBis = document.getElementById("loader2");
let numberError = document.getElementById("numberError");
let ServerError = document.getElementById("ServerError");
let colAdd = document.getElementById("colAdd");
let checkbox = document.getElementById("checkboxInput");
let selectBox = document.getElementById("selectBox");

checkbox.addEventListener("click", checkBox);
myBtn.addEventListener("click", saveCalculation);
myDrop = document.getElementById("myDropdown");

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

let btnValue = 0;
document.getElementById("value0").addEventListener("click", () => {
  btnValue = 0;
  newCall();
});
document.getElementById("value1").addEventListener("click", () => {
  btnValue = 1;
  newCall();
});
document.getElementById("value2").addEventListener("click", () => {
  btnValue = 2;
  newCall();
});
document.getElementById("value3").addEventListener("click", () => {
  btnValue = 3;
  newCall();
});
function moreThan50() {
  result.innerHTML = "";
  number.style.border = "1px #A52A2A solid";
  number.style.color = "#A52A2A";
  numberError.style.visibility = "visible";
}

function restart() {
  number.style.border = "1px black solid";
  number.style.color = "black";
  numberError.style.visibility = "hidden";
  result.style.color = "black";
}

function callServer() {
  restart();
  let number = document.getElementById("number").value;
  if (number > 50) {
    moreThan50();
  } else {
    loader.style.visibility = "visible";
    fetch("http://localhost:5050/fibonacci/" + number)
      .then(response => {
        if (response.status === 400) {
          return response.text();
        } else {
          return response.json();
        }
      })
      .then(data => {
        if (typeof data === "object") {
          console.log(result);
          result.style.color = "black";
          result.innerHTML = data.result;
        } else {
          result.style.color = " #D9534F";
          result.innerText = "server Error:" + data;
        }
        newCall();
        loader.style.visibility = "hidden";
      });
  }
}

function newCall() {
  loaderBis.style.visibility = "visible";
  $(" #parent ").remove();
  $(".allDiv").remove();
  fetch("http://localhost:5050/getFibonacciResults")
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      for (let i = 0; i < data.results.length - 1; i++) {
        if (btnValue == 0) {
          data.results.sort(function(a, b) {
            return a.number - b.number;
          });
          console.log(data.results);
        }
        if (btnValue == 1) {
          data.results.sort(function(a, b) {
            return b.number - a.number;
          });
          console.log(data.results);
        }
        if (btnValue == 2) {
          data.results.sort(function(a, b) {
            return a.createdDate - b.createdDate;
          });
          console.log(data.results);
        }
        if (btnValue == 3) {
          data.results.sort(function(a, b) {
            return b.createdDate - a.createdDate;
          });
          console.log(data.results);
        }

        let myNumber = data.results[i].number;
        let myResult = data.results[i].result;

        let divParent = document.createElement("div");
        divParent.setAttribute("id", "parent");
        let div1 = document.createElement("div");
        div1.innerText = "The Fibonnaci of ";
        div1.setAttribute("class", "allDiv");
        let div2 = document.createElement("div");
        div2.innerText = myNumber;
        div2.style.fontWeight = "bold";
        div2.setAttribute("class", "allDiv");
        let div3 = document.createElement("div");
        div3.innerText = " is ";
        div3.setAttribute("class", "allDiv");
        let div4 = document.createElement("div");
        div4.innerText = myResult;
        div4.setAttribute("class", "allDiv");
        div4.style.fontWeight = "bold";
        let div5 = document.createElement("div");
        div5.innerText = ". Calculated at: ";
        div5.setAttribute("class", "allDiv");
        let time = new Date(data.results[i].createdDate);
        let div6 = document.createElement("div");
        div6.innerText = time;
        div6.setAttribute("class", "allDiv");
        divParent.appendChild(div1);
        divParent.appendChild(div2);
        divParent.appendChild(div3);
        divParent.appendChild(div4);
        divParent.appendChild(div5);
        divParent.appendChild(div6);
        colAdd.appendChild(divParent);
      }
      $(".allDiv").css({ "display:": "inline" });
      $("#parent").css({
        "font-size": "24px",
        margin: "10px",
        "padding-bottom": "10px",
        "border-bottom": "1px black solid"
      });
      loaderBis.style.visibility = "hidden";
    });
}
window.onload = newCall();

// MILESTONE 8
function checkBox() {
  if (checkbox.value === "true") {
    checkbox.value = "false";
  } else {
    checkbox.value = "true";
  }
}

function saveCalculation() {
  restart();
  newCall();
  let number = document.getElementById("number").value;
  if (number > 50) {
    moreThan50();
  } else if (number <= 0) {
    result.innerText = "server error :can't be less than 0";
    result.style.color = " #D9534F";
  } else if (number == 42) {
    result.innerText = "server error :42 is the meaning of life";
    result.style.color = " #D9534F";
  } else {
    if (checkbox.value == "true") {
      let number = document.getElementById("number").value;
      let a = 0,
        b = 1,
        y;
      for (let i = 2; i <= number; i++) {
        y = a + b;
        a = b;
        b = y;
      }
      result.innerText = y;
    } else {
      callServer();
    }
  }
}

// MILESSTONE 4.1 GEEKOUT

// const getResults = async function() {
//   try{
//   loaderBis.style.visibility = "visible";
//   let response = await fetch("http://localhost:5050/getFibonacciResults");
//   let data = await response.json();
//   console.log(data);
//   for (let i = 0; i < data.results.length - 1; i++) {
//     let myNumber = data.results[i].number;
//     let myResult = data.results[i].result;
//     var divParent = document.createElement("div");
//     divParent.setAttribute("id", "parent");
//     var div1 = document.createElement("div");
//     div1.innerText = "The Fibonnaci of ";
//     div1.setAttribute("class", "allDiv");
//     var div2 = document.createElement("div");
//     div2.innerText = myNumber;
//     div2.style.fontWeight = "bold";
//     div2.setAttribute("class", "allDiv");
//     var div3 = document.createElement("div");
//     div3.innerText = " is ";
//     div3.setAttribute("class", "allDiv");
//     var div4 = document.createElement("div");
//     div4.innerText = myResult;
//     div4.setAttribute("class", "allDiv");
//     div4.style.fontWeight = "bold";
//     var time = new Date();
//     var div5 = document.createElement("div");
//     div5.innerText = time;
//     div5.setAttribute("class", "allDiv");
//     divParent.appendChild(div1);
//     divParent.appendChild(div2);
//     divParent.appendChild(div3);
//     divParent.appendChild(div4);
//     divParent.appendChild(div5);
//     colAdd.appendChild(divParent);
//   }
//   loaderBis.style.visibility = "hidden";
// };

// window.onload = getResults();

// const callServerAsync = async function() {
//   let number = document.getElementById("number").value;
//   if (number > 50) {
//     moreThan50();
//   } else {
//     loaderBis.style.visibility = "visible";
//     let response = await fetch("http://localhost:5050/fibonacci/" + number);
//     if (response.status === 400) {
//       data = response.text();
//     } else {
//       data = response.json();
//     }
//     if (typeof data === "object") {
//       result.style.color = "black";
//       result.innerHTML = data.result;
//     } else {
//       result.style.color = " #D9534F";
//       result.innerText = "server Error:" + data;
//       loader.style.visibility = "hidden";
//     }
//   }
// };
