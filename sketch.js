let cols = 30;
let rows = 30;

let casillas = [];
let casillasAnterior = [];

let vivo = 0;
let muerto = 255;

let animacionActiva = false; // Variable para controlar la animación
let boton; // Variable para el botón

let tamaño;

function setup() {
  createCanvas(600, 600);
  crearCasillas();
  frameRate(8);
  tamaño = width / rows;
  // Crear el botón
  boton = createButton('Empezar');
  boton.position(10, 620); // Posición del botón
  boton.mousePressed(toggleAnimacion); // Asignar evento al botón
}

function draw() {
  dibujarCasillas();
  if (animacionActiva) {
    controlarCasillas();
  }
}

function crearCasillas() {
  for (let i = 0; i < rows; i++) {
    casillas[i] = [];
    for (let j = 0; j < cols; j++) {
      casillas[i][j] = muerto;
    }
  }
}

function dibujarCasillas() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      fill(casillas[i][j]);
      square(i * tamaño, j * tamaño, tamaño);
    }
  }
}

function controlarCasillas() {
  for (let i = 0; i < rows; i++) {
    casillasAnterior[i] = [];
    for (let j = 0; j < cols; j++) {
      casillasAnterior[i][j] = casillas[i][j];
    }
  }

  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      let vecinosVivos = 0;

      for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
          if (!(k === i && l === j) && casillasAnterior[k][l] === vivo) {
            vecinosVivos++;
          }
        }
      }

      if (casillasAnterior[i][j] === vivo) {
        if (vecinosVivos === 2 || vecinosVivos === 3) {
          casillas[i][j] = vivo;
        } else {
          casillas[i][j] = muerto;
        }
      } else {
        if (vecinosVivos === 3) {
          casillas[i][j] = vivo;
        } else {
          casillas[i][j] = muerto;
        }
      }
    }
  }
}

// Función para alternar la animación
function toggleAnimacion() {
  animacionActiva = !animacionActiva; // Cambiar el estado de la animación
  boton.html(animacionActiva ? 'Pausar' : 'Reanudar'); // Cambiar el texto del botón
}


function mousePressed(){

  let row = floor(mouseX / tamaño);
  let col = floor(mouseY / tamaño);

  if (casillas[row][col] == muerto){
    casillas[row][col] = vivo;
  }else{
    casillas[row][col] = muerto;
  }
  
}