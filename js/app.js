const barrios = [
  "Centro de Algeciras",
  "Barrio de La Piñera",
  "Barrio de La Bajadilla",
  "Barrio del Saladillo",
  "Barrio de San Jose Artesano ",
  "Barrio de El Rinconcillo",
  "Barrio de San Bernabé",
  "Barrio de San Isidro",
  "Barrio de El Acebuchal",
  "Barrio de El Cortijo Vides"
];

const barriosTrafico = [
  "Centro de Algeciras",
  "Barrio de San Jose Artesano "
];

const sensores = [];

const contenedor = document.getElementById("sensores");

// Crear sensores iniciales
barrios.forEach(barrio => {

  // crear sensor
  const sensor = {
    barrio,
    temperatura: 16 + Math.random() * 4,
    aire: 30 + Math.random() * 20,
    humedad : 50 + Math.random() * 20,
    ruido : 40 + Math.random() * 20
  };

  if (barriosTrafico.includes(barrio)) {
  sensor.aire += 15; 
  sensor.ruido += 15;
  }
  sensores.push(sensor);

  // crear tarjeta
  const panel = document.createElement("div");
  panel.classList.add("panel");
  panel.id = barrio;

  panel.innerHTML = `
    <h3>📡 ${barrio}</h3>
    <p>🌡 Temperatura: <span class="temp"></span></p>
    <p>🌫 Calidad aire: <span class="aire"></span></p>
    <p>💧 Humedad: <span class="humedad"></span></p>
    <p>🔊 Ruido: <span class="ruido"></span></p>
    <p class="alerta"></p>
  `;

  contenedor.appendChild(panel);

});


function obtenerTemperaturaBase() {

  const hora = new Date().getHours();

  if (hora >= 6 && hora < 10) return 16;   // mañana
  if (hora >= 10 && hora < 16) return 20;  // mediodía
  if (hora >= 16 && hora < 20) return 18;  // tarde
  if (hora >= 20 && hora < 24) return 16;  // noche
  return 14; // madrugada

}


function obtenerContaminacionBase() {

  const hora = new Date().getHours();

  if (hora >= 7 && hora <= 9) return 65;   // tráfico mañana
  if (hora >= 13 && hora <= 15) return 55; // actividad puerto
  if (hora >= 18 && hora <= 21) return 70; // tráfico tarde
  return 40; // normal

}

function actualizarSensores() {

  sensores.forEach(sensor => {

  const baseTemp = obtenerTemperaturaBase();
  const baseAire = obtenerContaminacionBase();

  const cambioTemp = (Math.random() - 0.5) * 0.5;
  const cambioAire = (Math.random() - 0.5) * 3;
  const cambioHumedad = (Math.random() - 0.5) * 2;
  const cambioRuido = (Math.random() - 0.5) * 3;


  
  sensor.temperatura = sensor.temperatura + cambioTemp;
  sensor.aire = sensor.aire + cambioAire;

  
  sensor.humedad = sensor.humedad + cambioHumedad;
  sensor.ruido = sensor.ruido + cambioRuido;

 
  sensor.temperatura = (baseTemp + sensor.temperatura) / 2;
  sensor.aire = (baseAire + sensor.aire) / 2;


  const panel = document.getElementById(sensor.barrio);



    const temp = panel.querySelector(".temp");
    const aire = panel.querySelector(".aire");
    const humedad = panel.querySelector(".humedad");
    const ruido = panel.querySelector(".ruido");
    const alerta = panel.querySelector(".alerta");



    const temperatura = sensor.temperatura.toFixed(1);
    const calidad = Math.round(sensor.aire);
    const humedadValor = sensor.humedad.toFixed(1);
    const ruidoValor = sensor.ruido.toFixed(0);



    humedad.textContent = humedadValor + " %";
    ruido.textContent = ruidoValor + " dB";
    temp.textContent = temperatura + " °C";
    aire.textContent = calidad + " ICA";



    alerta.className = "alerta";

    if (temperatura > 28) {
      alerta.textContent = "🔥 Alerta por alta temperatura";
      alerta.classList.add("alerta-roja");
    }
    else if (calidad > 80) {
      alerta.textContent = "⚠️ Calidad del aire deficiente";
      alerta.classList.add("alerta-amarilla");
    }
    else if (ruido > 75){
        alerta.textContent = "⚠️ Nivel de ruido elevado ";
        alerta.classList.add("alerta-amarilla");
    }
    else if (humedad > 75){
        alerta.textContent = "⚠️ Humedad ambiental elevado";
        alerta.classList.add("alerta-amarilla")
    }
    else {
      alerta.textContent = "✅ Condiciones ambientales normales";
      alerta.classList.add("alerta-verde");
    }

  });

}

function actualizarHora(){

 const ahora = new Date().toLocaleTimeString();

 document.getElementById("ultimaActualizacion").textContent =
 "Última actualización: " + ahora;

}

// actualizar cada 10 segundos
setInterval(actualizarSensores, 10000);

actualizarSensores();

setInterval(actualizarHora, 10000);