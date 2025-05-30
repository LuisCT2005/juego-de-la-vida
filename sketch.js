let cols = 100;
let rows = 100;

let casillas = [];
let casillasAnterior = [];

let vivo = 0;
let muerto = 255;

let animacionActiva = false;
let boton;

let tamaño;

function setup() {
  let canvasWidth = min(windowWidth - 100, 1200); 
  let canvasHeight = min(windowHeight - 150, 800); 

  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position(10,10); 
  crearCasillas();
  frameRate(8);
  tamaño = width / rows;

  botonEmpezar = createButton('Empezar');
  botonEmpezar.position(50, height + 10); 
  botonEmpezar.mousePressed(toggleAnimacion); 

  botonReiniciar = createButton('Reiniciar');
  botonReiniciar.position(150, height + 10); 
  botonReiniciar.mousePressed(reiniciar); 
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
  noStroke();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) {
        fill(200);
        noStroke();
      } else {
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

function toggleAnimacion() {
  animacionActiva = !animacionActiva;
  botonEmpezar.html(animacionActiva ? 'Pausar' : 'Reanudar');
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
  animacionActiva = false;
  botonEmpezar.html('Empezar');
}