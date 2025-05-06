// Array proporcionado que no se modifica
var posibilidades = ["piedra", "papel", "tijera"];

// Selección de elementos del DOM (HTML)
let nombreJugador = document.querySelector('input[name="nombre"]'); //Campo para el nombre del jugador
let numPartidas = document.querySelector('input[name="partidas"]'); //Campo para número de partidas
let btnJugar = document.querySelector('button'); //Botón "Jugar"
let btnYa = document.querySelector('h2 button');//Botón "Ya"
let btnReset = document.querySelector('#historial + button'); //Botón de "RESET"
let imagenesJugador = document.querySelectorAll('#jugador img'); // Imágenes usadas por el jugador
let imagenMaquina = document.querySelector('#maquina img'); //Imágenes usadas por la maquina
let actual = document.getElementById("actual"); //Tiradas actuales
let total = document.getElementById("total"); //Tiradas totales
let historial = document.getElementById("historial"); // Historial de resultados

let tiradas = 0; //Contador de las tiradas jugadas
let maxPartidas = 0; //Contador con el número de tiradas seleeccionado por el jugador
let eleccionJugador; //La opción seleccionada por el jugador
let partidaIniciada = false; // Controla si se ha iniciado la partida

// Eventos de botón
btnJugar.addEventListener("click", comenzarPartida); //Para comenzar el juego
btnYa.addEventListener("click", realizarTirada); //Para darle paso a la maquina
btnReset.addEventListener("click", resetearPartida); //Para resetear el juego

imagenesJugador.forEach((img, i) => {
    img.addEventListener("click", () => seleccionarImagenJugador(i));
});

// Función para iniciar la partida y validar los datos
function comenzarPartida() {
    let valido = true;
    
    // Validación del nombre
    if(nombreJugador.value.length <= 3 || !isNaN(nombreJugador.value[0])){
        nombreJugador.classList.add("fondoRojo");
        valido = false;
    } else {
        nombreJugador.classList.remove("fondoRojo");
    }
    
    // Validación del número de partidas
    if(numPartidas.value <= 0){
        numPartidas.classList.add("fondoRojo");
        valido = false;
    } else {
        numPartidas.classList.remove("fondoRojo");
    }
    // Si todo es válido, comienza el juego
    if(valido){
        maxPartidas = parseInt(numPartidas.value);
        total.textContent = maxPartidas;
        nombreJugador.disabled = true;
        numPartidas.disabled = true;
        partidaIniciada = true;
    }
}

// Función para elección y tirada del usuario jugador
function seleccionarImagenJugador(indice){
    // Solo se permite seleccionar si la partida ha sido iniciada
    if (!partidaIniciada) return;
    
    eleccionJugador = indice;
    imagenesJugador.forEach((img, i) => {
        img.src = `img/${posibilidades[i]}Jugador.png`;
        img.className = i === indice ? "seleccionado" : "noSeleccionado";
    });
}
// Función para realizar una tirada y excepciones que puedan surgir 
function realizarTirada(){
    if(!partidaIniciada) {
        alert("Debes iniciar la partida pulsando 'JUGAR'");
        return;
    }
    if(tiradas >= maxPartidas){
        alert("Has alcanzado el número máximo de partidas.");
        return;
    }
    if(eleccionJugador === undefined){
        alert("Por favor, selecciona una opción.");
        return;
    }

    // Generar opción aleatoria para la máquina
    let indiceMaquina = Math.floor(Math.random() * posibilidades.length);
    imagenMaquina.src = `img/${posibilidades[indiceMaquina]}Ordenador.png`;

    // Determinar el resultado
    let resultado;
    if(eleccionJugador === indiceMaquina){
        resultado = "Empate";
    } else if(eleccionJugador === (indiceMaquina + 1) % posibilidades.length){
        resultado = "Gana " + nombreJugador.value;
    } else {
        resultado = "Gana la máquina";
    }

    // Añadir resultado al historial
    historial.innerHTML += `<li>${resultado}</li>`;
    tiradas++;
    actual.textContent = tiradas;
}

// Función para reiniciar la partida sin borrar el historial
function resetearPartida(){
    // Según la especificaciones de la PAC se añade "Nueva partida" y se mantiene el historial.
    historial.innerHTML += '<li>Nueva partida</li>';
    
    // Restaurar los campos de entrada y reiniciar contadores
    nombreJugador.disabled = false;
    numPartidas.disabled = false;
    numPartidas.value = "0";
    actual.textContent = "0";
    total.textContent = "0";
    tiradas = 0;
    eleccionJugador = undefined;
    partidaIniciada = false;

    // Restaurar imágenes a su estado por defecto
    imagenesJugador.forEach(img => {
        img.src = "img/defecto.png";
        img.className = "noSeleccionado";
    });
    imagenMaquina.src = "img/defecto.png";
}
