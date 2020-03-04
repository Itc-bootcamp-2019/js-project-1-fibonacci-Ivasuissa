let Xvalue = document.getElementById("Xvalue");
      let Yvalue = document.getElementById("Yvalue");
    

      function fibonacci(x) {
        let a = 0,
          b = 1,
          y;
        for (let i = 2; i <= x; i++) {
          y = a + b;
          a = b;
          b = y;
        }
        Xvalue.innerText = x;
        Yvalue.innerText = y;
      }

      fibonacci(9);