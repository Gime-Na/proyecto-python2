/*objeto VUE */
const { createApp } = Vue
createApp({/*metodos que quiero que se ejecute */
  data() {
    return {
      url: "./js/video.json",/*datos del html*/
      datos: [],
      error: false,
    }
  },
  methods: {
    fetchData(url) {
      fetch(url)/*funcion asincronica */
        .then(response => response.json())
        .then(
          data => {
            console.log(data)
            this.datos = data
          }
        )
        .catch(error => {
          console.log("Error:" + error)
          this.error = true
        });
    }
  },
  created() {  // created() se ejecuta cada vez que se crea el objeto VUE
    this.fetchData(this.url)/*url de la api primera funcion que se ejecuta */
  }
}).mount('#app')

/*nav-scrooll*/
/*El objeto Window controla aspectos de la ventana, su contenido, y los datos asociados a la 
misma, como la ubicación del documento actual, el tamaño, el desplazamiento, etc. Por 
ejemplo, podemos cargar un nuevo documento cambiando el valor de la ubicación. */
window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("abajo", window.scrollY > 0);/* .classList Devuelve la lista de clases del elemento HTML.
  (toggle)Si la clase no existe, la añade. Si no, la elimina.*//*Si expr(window.scroll > 0) es true, añade clase. Si no, la elimina.*/
  /*scrollY—Esta propiedad devuelve el número de píxeles en los que el documento se ha desplazado verticalmente.*/
})

/*VALIDACIÓN DE FORMULARIO*/
/*declaracion de variables*//*
let nombre = document.getElementById("name");
let apellido = document.getElementById("lastname");
let correo = document.getElementById("email");
let mensaje = document.getElementById("message");
let correcto = true;


/*function validar() {
 /* /*declaracion de variable dentro de la funcion*//*
  let datos = [nombre.value, apellido.value, correo.value, mensaje.value];

  for (let i = 0; i < datos.length; i++) {/*Recorre array de datos *//*
    if (datos[i] == "") {/*evalua si el campo esta vacio *//*
      correcto = false;

    }
  }
  if (correcto) {
    alert(nombre.value + " " + apellido.value + "\n" + correo.value + "\n" + mensaje.value);/*muestra valores*//*
  }
  else {
    alert("Debe completar todos los campos");/*mensaje*//*
  }

}*/
