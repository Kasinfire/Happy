fetch("text/text.json")
  .then((response) => response.json()) 
  .then((data) => {
    const codigoBase64 = data.text;

    const textoTraducido = decodeURIComponent(escape(atob(codigoBase64)));

    document.getElementById("contenido-carta").innerText = textoTraducido;
  })
  .catch((error) => {
    console.error("Hubo un error al cargar la carta:", error);
  });

