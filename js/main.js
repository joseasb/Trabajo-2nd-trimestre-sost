const btnDesplegable= document.querySelector("#MenuDesplegable");
const lista = document.querySelector("#lista");

btnDesplegable.addEventListener("click", () => {
      lista.classList.toggle("hidden");
      btnDesplegable.textContent =
        lista.classList.contains("hidden") ? "☰" : "✖";
});