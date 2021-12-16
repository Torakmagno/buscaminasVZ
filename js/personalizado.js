// Leer los parámetros

const url = new URL(window.location); // http://localhost:5500/personalizado.html?nivel=P&filas=12&columnas=12&luces=34

const filas = Number(url.searchParams.get("filas"));
const columnas = Number(url.searchParams.get("columnas"));
const minas = Number(url.searchParams.get("luces"));
const contador = document.getElementById("intentos");



const elementos = document.getElementsByTagName("td"); // -> Devuelve lista de todos los <td></td>
const tabla = document.getElementById("tablero"); // -> Devuelve el elemento cuyo id es tablero
const niveles = document.getElementById("niveles");

let finalizado = false;

let destapadas = 0; 



// Crear tabla
let contenido = "";

// Ireramos las filas
for (let i = 0; i < filas; i++) {
  let contenidoFila = "";

    // Por cada fila iteramos columnas
    for (let j = 0; j < columnas; j++) {
      contenidoFila += "<td></td>";
    }

    contenido += "<tr>" + contenidoFila + "</tr>";
}

tabla.innerHTML = contenido;





// Itera las filas
for (let i = 0; i < tabla.rows.length; i++) {
  const fila = tabla.rows[i]; // i (num fila) -> fila (elemento en si)

  for (let j = 0; j < fila.cells.length; j++) {
    const casilla = fila.cells[j];

    // i -> (num fila)
    // j -> (num columna)
    // casilla -> (td)
    
    // asignamos onclick a la casilla
    casilla.onclick = () => {

      if(finalizado == false) { // Solo se ejecuta si no hay ganador

          intentos++;
          contador.innerHTML = "Intentos : " + intentos; 

          // Si el usuario no ha perdido
          if(finalizado == false) {
            
          // 2 casos: Mina / No mina (almacenado en el atributo)
          // Leemos si tiene mina
          if(casilla.getAttribute("mina") != "true") {
            // iluminamos del color
            casilla.classList.add("iluminado"); // Interruptor de clases
            destapadas++;
          } else {
            casilla.classList.add("explotado");
            finalizado = true;
            document.getElementById("mensajeTablero").innerHTML = "Has perdido!";

            // Paramos el crono
            clearInterval(reloj);
            document.getElementById('boton1').value = 'continuar';
          }
          }
      
      comprobarGanador();
    }

  }
  }

  // const array = [ 10, 40, 30 ];

  // array[0] -> 10
  // array[1] -> 40
  // array[2] -> 30

  // array.length -> 3


  
}

let generados = 0;

while(generados < minas) {
  const fila = getRandomArbitrary(0, tabla.rows.length);
  const columna = getRandomArbitrary(0, tabla.rows[0].cells.length);

  if(!tabla.rows[fila].cells[columna].getAttribute("mina") != "true") { // Si la lista de clases no contiene iluminado 
    tabla.rows[fila].cells[columna].setAttribute("mina", "true");
    generados++;
  }
}

// Retorna un número aleatorio entre min (incluido) y max (incluido)
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * max) - min;
}

// Comprueba si hay ganador
function comprobarGanador() {

  // Que las casillas que quedan tengan todas bomba
  if(((filas * columnas) - destapadas) == minas) {
    document.getElementById("mensajeTablero").innerHTML = "Has ganado!";
    // Solo llega si no ha saltado el return -> Todas están iluminadas
    finalizado = true;

    // Paramos el crono
    clearInterval(reloj);
    document.getElementById('boton1').value = 'continuar';
  }

}

niveles.onsubmit = (event) => {
  event.preventDefault(); // No recarga la página
  const nivel = document.querySelector('input[name="nivel"]:checked').value; // Nos devuelve el valor del nivel seleccionado (F M S)

  if(nivel == "F") {
    window.location = "facil.html";
  } else if(nivel == "M") {
    window.location = "medio.html";
  } else if(nivel == "D") {
    window.location = "dificil.html";
  } else if(nivel == "P") {
    // Tener en cuenta lo que ha puesto el usuario (filas, columnas, luces)
    
    const data = new FormData(event.target); // Habilita getters y setters para el formulario
    
    const filas = data.get("filas");
    const columnas = data.get("columnas");
    const luces = data.get("luces");

    const url = new URL("/personalizado.html", window.location.origin); // personalizado.html

    url.searchParams.append("filas", filas); // personalizado.html?filas=3
    url.searchParams.append("columnas", columnas);
    url.searchParams.append("luces", luces);

    window.location = url.toString();
    
  }
}