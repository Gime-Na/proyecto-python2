console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // usuario_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        url:'https://sitiomvc1.pythonanywhere.com/usuarios/'+id,
        id:0,
        email:"",
        contrasena:"",
        rol:""
        
       }  
    },
    methods: {
        
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id = data.id
                    this.email = data.email;
                    this.contrasena= data.contrasena
                    this.rol = data.rol
                                       
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let usuario = {
                email:this.email,
                contrasena: this.contrasena,
                rol:this.rol
                
            }
            var options = {
                body: JSON.stringify(usuario),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./admin.html"; // navega a usuarios.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
