//Logic Funcions

var quiet = false;

document.addEventListener('KeyboardEvent'.KeyUp, function heroJump(){},true);




function heroJump() {
  var elem = document.getElementById('hero');   
  var pos = 10; //Valor de la posicion inicial
  var initialPos = setInterval(animation, 0); // Velocidad mov. en milisegundos
  function animation() {
    if (pos == 240) {
      clearInterval(initialPos);
    } else {
      pos--; 
      elem.style.top = pos + "px"; 
    }
  }
}
heroJump();
