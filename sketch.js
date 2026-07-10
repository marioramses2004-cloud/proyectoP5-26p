let preguntas = [
  "Mis ríos y acuíferos están un poco secos... ¿Podrías hacerme el favor de cerrar la llave mientras te cepillas los dientes o te enjabonas las manos?",
  "¿Podríamos intentarlo en otro momento para cuidar el agua juntos?",
  "Para producir luz, muchas fábricas queman carbón. Si te pido el favor de apagar los focos que no uses para que trabajen menos..."
];

let respuestasPositivas = [
  [
    "¡Gracias! ¡Eres un héroe del agua!",
    "Cada gota que ahorras ayuda a mantener vivos a los ríos.",
    "Sigue así y comparte el cuidado del agua con tu familia."
  ],
  [
    "Está bien, pero recuerda que el agua es un recurso valioso.",
    "La próxima vez, cierra la llave cuando no la uses.",
    "Ese pequeño hábito hace una gran diferencia."
  ],
  [
    "¡Genial! Cada pequeño esfuerzo cuenta para cuidar nuestro planeta.",
    "Apagar las luces también reduce la contaminación ambiental.",
    "Juntos podemos hacer un mundo más limpio."
  ]
];

let respuestasNegativas = [
  [
    "¡Qué pena! Pero aún puedes ayudar a cuidar el agua.",
    "Aun así, puedes hacer cambios pequeños para mejorar.",
    "Empieza hoy con un gesto sencillo."
  ],
  [
    "No pasa nada, cada pequeño cambio también cuenta.",
    "Piensa en formas de usar menos agua mañana.",
    "El primer paso es intentarlo de nuevo."
  ],
  [
    "Gracias por intentarlo, tu apoyo también importa.",
    "Apagar un foco extra sigue siendo una buena acción.",
    "Puedes sumar más gestos positivos en el futuro."
  ]
];

let indiceActual = 0;
let indiceRespuesta = 0;
let textoActual = "";
let contadorLetras = 0;
let velocidad = 0.5;
let estado = "pregunta";
let textoMostrar = "";
let respuestasActuales = [];

//video
let miVideo;
let gifSecundario;
let gifSiguiente;
let mostrandoVideo = true;
let mostrarConversacion = false;

// Variables para los botones
let botonA;
let botonB;
let botonSiguiente;
let botonSiguienteGif;

let miImagen; // 1. Declarar la variable global
let imagenPositiva;
let imagenNegativa;

function preload() {
  // 2. Cargar la imagen antes de ejecutar el programa
imagenPositiva = loadImage('perro2.jpg');
  imagenNegativa = loadImage('perro3.jpg');
  gifSecundario = loadImage('2.GIF');
  gifSiguiente = loadImage('3.GIF');
  miImagen = imagenInicial;
} 

function setup() {
  createCanvas(1920, 1080); // Subimos un poco el alto para que quepan los botones abajo
  textSize(24);
  textFont('Courier New');
  textAlign(LEFT, TOP);

  miVideo = createVideo('1.mp4');
  miVideo.hide();
  miVideo.volume(0);
  miVideo.play();
  miVideo.elt.onended = () => {
    mostrandoVideo = false;
    miImagen = gifSecundario;
  };
  
  // 2. CREAMOS LOS BOTONES
  botonA = createButton('SI');
  botonA.position(600, 850);
  botonA.size(100, 40);
  botonA.mousePressed(responderPositivo);
  
  botonB = createButton('NO');
  botonB.position(1200, 850);
  botonB.size(100, 40);
  botonB.mousePressed(responderNegativo);

  botonSiguiente = createButton('SIGUIENTE');
  botonSiguiente.position(900, 850);
  botonSiguiente.size(200, 40);
  botonSiguiente.mousePressed(siguientePregunta);
  botonSiguiente.hide();

  botonSiguienteGif = createButton('INICIO');
  botonSiguienteGif.position(850, 850);
  botonSiguienteGif.size(220, 40);
  botonSiguienteGif.mousePressed(siguienteGif);
  botonSiguienteGif.hide();
}


function draw() {
  background(0);
  
  imageMode(CENTER);
  if (mostrandoVideo) {
    image(miVideo, 1000, 300, 1100, 700);
  } else {
    image(miImagen, 1000, 300, 1100, 700);
  }
  
  fill(255);

  let textoCompleto = "";
  if (mostrarConversacion) {
    textoCompleto = estado === "pregunta" ? preguntas[indiceActual] : textoMostrar;
  }
  
  textoActual = textoCompleto.substring(0, floor(contadorLetras));
  
  if (mostrarConversacion) {
    text(textoActual, 500, 700, 900, 120);
  }
  
  if (!mostrandoVideo && miImagen === gifSecundario) {
    botonSiguienteGif.show();
    botonA.hide();
    botonB.hide();
    botonSiguiente.hide();
  } else if (!mostrarConversacion) {
    botonA.hide();
    botonB.hide();
    botonSiguiente.hide();
    botonSiguienteGif.hide();
  } else if (contadorLetras < textoCompleto.length) {
    contadorLetras += velocidad;
    botonA.hide();
    botonB.hide();
    botonSiguiente.hide();
    botonSiguienteGif.hide();
  } else {
    if (estado === "pregunta") {
      botonA.show();
      botonB.show();
      botonSiguiente.hide();
      botonSiguienteGif.hide();
    } else {
      botonA.hide();
      botonB.hide();
      botonSiguiente.show();
      botonSiguienteGif.hide();
    }
  }
}

function responderPositivo() {
  miImagen = imagenPositiva;
  respuestasActuales = respuestasPositivas[indiceActual];
  indiceRespuesta = 0;
  textoMostrar = respuestasActuales[indiceRespuesta];
  estado = "respuesta";
  contadorLetras = 0;
  textoActual = "";
}

function responderNegativo() {
  miImagen = imagenNegativa;
  respuestasActuales = respuestasNegativas[indiceActual];
  indiceRespuesta = 0;
  textoMostrar = respuestasActuales[indiceRespuesta];
  estado = "respuesta";
  contadorLetras = 0;
  textoActual = "";
}

function siguientePregunta() {
  if (estado === "respuesta" && indiceRespuesta < respuestasActuales.length - 1) {
    indiceRespuesta++;
    textoMostrar = respuestasActuales[indiceRespuesta];
    contadorLetras = 0;
    textoActual = "";
    return;
  }

  indiceActual = (indiceActual + 1) % preguntas.length;
  indiceRespuesta = 0;
  mostrandoVideo = false;
  miImagen = gifSecundario;
  estado = "pregunta";
  contadorLetras = 0;
  textoActual = "";
  textoMostrar = "";
  respuestasActuales = [];
}

function siguienteGif() {
  miImagen = gifSiguiente;
  mostrarConversacion = true;
  estado = "pregunta";
  contadorLetras = 0;
  textoActual = "";
  textoMostrar = "";
  respuestasActuales = [];
  botonSiguienteGif.hide();
}