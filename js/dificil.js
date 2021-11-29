const elementos = document.getElementsByTagName("td"); // -> Devuelve lista de todos los <td></td>
const tabla = document.getElementById("tablero"); // -> Devuelve el elemento cuyo id es tablero


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
      casilla.classList.toggle("iluminado") // Interruptor de clases

      // Iluminar las de alrededor

      // arriba
      if(i > 0) { 
        tabla.rows[i-1] // seleccionamos fila (una menos)
          .cells[j] // seleccionamos columna
          .classList.toggle("iluminado") // ilumninamos
      }
      
      // abajo
      if(i < tabla.rows.length - 1) {
        tabla.rows[i+1] // seleccionamos fila (una menos)
          .cells[j] // seleccionamos columna
          .classList.toggle("iluminado") // ilumninamos
      }
      
      // izquierda
      if(j > 0) {
        tabla.rows[i] // seleccionamos fila (una menos)
          .cells[j-1] // seleccionamos columna
          .classList.toggle("iluminado") // ilumninamos
      }

      // derecha
      if(j < tabla.rows[0].cells.length - 1) {
        tabla.rows[i] // seleccionamos fila (una menos)
        .cells[j+1] // seleccionamos columna
        .classList.toggle("iluminado") // ilumninamos
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

while(generados < 20) {
  const fila = getRandomArbitrary(0, tabla.rows.length);
  const columna = getRandomArbitrary(0, tabla.rows[0].cells.length);

  if(!tabla.rows[fila].cells[columna].classList.contains("iluminado")) { // Si la lista de clases no contiene iluminado 
    tabla.rows[fila].cells[columna].classList.toggle("iluminado");
    generados++;
  }
}


/*
  Pendientes:
    1. Cada jugada, comprobar si ha ganado
    2. Tablero de dimensiones modificables
    3. Crono + contador de jugadas
*/

// Retorna un número aleatorio entre min (incluido) y max (incluido)
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * max) - min;
}