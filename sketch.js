let cols = 100;
let rows = 100;

let casillas = [];
let casillasAnterior = [];

let vivo = 0;
let muerto = 255;

let animacionActiva = false; // Variable para controlar la animación
let boton; // Variable para el botón

let tamaño;

function setup() {
  let canvas = createCanvas(1500, 800);
  canvas.position(50, 50); // Separar el canvas 50px de los bordes
  crearCasillas();
  frameRate(8);
  tamaño = width / rows;

  // Crear el botón
  botonEmpezar = createButton('Empezar');
  botonEmpezar.position(100, 870); // Ajustar posición del botón
  botonEmpezar.mousePressed(toggleAnimacion); // Asignar evento al botón

  botonReiniciar = createButton('Reiniciar');
  botonReiniciar.position(200, 870); // Ajustar posición del botón
  botonReiniciar.mousePressed(reiniciar); // Asignar evento al botón
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
  noStroke(); // Eliminar bordes de las celdas
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) {
        // Dibujar celdas exteriores en blanco
        fill(200);
        noStroke();
      } else {
        // Dibujar celdas normales
        stroke(0);
        strokeWeight(1);
        if (casillas[i][j] === vivo){
          fill(0);
        }else {
          fill(200);
        }
      }
      square(j * tamaño, i * tamaño, tamaño);
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
  botonEmpezar.html(animacionActiva ? 'Pausar' : 'Reanudar'); // Cambiar el texto del botón
}

function mousePressed() {
  let row = floor(mouseY / tamaño);
  let col = floor(mouseX / tamaño);

  if (row >= 0 && row < rows && col >= 0 && col < cols) {
    if (casillas[row][col] == muerto) {
      casillas[row][col] = vivo;
    } else {
      casillas[row][col] = muerto;
    }
  }
}

function reiniciar() {
  crearCasillas();
  animacionActiva = false; // Asegurarse de que la animación esté pausada
  botonEmpezar.html('Empezar'); // Restablecer el texto del botón
}