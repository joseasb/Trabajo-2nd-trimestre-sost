const btnDesplegable= document.querySelector("#MenuDesplegable");
const formulario = document.querySelector("#formulario")

btnDesplegable.addEventListener("click", () => {
  const lista = document.querySelector("#lista");
      lista.classList.toggle("hidden");
      btnDesplegable.textContent =
        lista.classList.contains("hidden") ? "☰" : "✖";
});

formulario.addEventListener("submit", (event) =>{
event.preventDefault();
const nombre= document.querySelector("#nombre");
const apellidos= document.querySelector("#apellidos");
const correo = document.querySelector("#correo");
const texto = document.querySelector("#texto");

function ValidarNombre(){
  if(!nombre.checkValidity()){
    nombre.reportValidity();
    return false;
} else{
  return true;
}
}

function ValidarApellidos(){
  if(!apellidos.checkValidity()){
    apellidos.reportValidity();
    return false;
} else{
  return true;
}
}

function ValidarCorreo() {

  const corrVal= correo.value;
  // 1. Debe contener un @
  const posArroba = corrVal.indexOf("@");
  if (posArroba === -1) return false;

  // 2. Debe contener un punto después del @
  const posPunto = corrVal.indexOf(".", posArroba + 1);
  if (posPunto === -1) return false;

  // 3. El @ no puede estar al principio
  if (posArroba === 0) return false;

  // 4. El punto no puede estar justo después del @
  if (posPunto === posArroba + 1) return false;

  // 5. El punto no puede ser el último carácter
  if (posPunto === corrVal.length - 1) return false;

  // 6. No puede haber espacios
  if (corrVal.includes(" ")) return false;

  return true;
}

function ValidarTexto(){
  if(!texto.checkValidity()){
    texto.reportValidity();
    return false;
} else{
  return true;
}
}

if(ValidarNombre() && ValidarApellidos() && ValidarCorreo() && ValidarTexto()){
  formulario.reset();
}
});