const osito = document.getElementById("osoInteractive");

osito.addEventListener("click", function (event) {
  const clicEnBrazo = event.target.closest("a");
  if (clicEnBrazo) {
    return;
  } else {
    event.preventDefault();
    osito.classList.toggle("sorpresa");

    if (osito.classList.contains("sorpresa")) {
      const rect = osito.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height * 0.35;
      window.launchConfetti(originX, originY, 200);
    }
  }
});
