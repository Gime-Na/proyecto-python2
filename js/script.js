const { createApp } = Vue
createApp({
    data() {
        return {
            usuarios: [],
            url: 'https://sitiomvc1.pythonanywhere.com/usuarios',
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            id: 0,
            email: "",
            contrasena: "",
            //confirmPassword: "",
            rol: ""

        }
    },
    methods: {
        fetchData(url) {//recibe ,busca la url
            fetch(url)/*funcion asincronica (llama a fetch le paso como parametro la(url) de donde esta la api que me tiene que traer)*/
                .then(response => response.json())
                .then(data => { //recibe el data, variable que trae los datos del json
                    this.usuarios = data; //(le asigno la variable data a usuarios (esta variable "data" almacenala en este arreglo usuarios)
                    this.cargando = false
                    console.log(this.usuarios)
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(id) {
            const url = this.url + '/' + id; //eliminar id
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })

        },
        //REGISTRO
        registro() {//  AGREGA UN NUEVO USUARIO
            let usuario = { //variable usuario
                email: this.email,
                contrasena: this.contrasena,
                //confirmPassword: this.confirmPassword,
                rol: this.rol
            }
            var options = { //variable opciones
                body: JSON.stringify(usuario), //metodo que convierte un objeto o valor de js en una cadena de texto json(reemplaza valores)
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)

                    .then(function () { //then retorna una promesa
                        alert("Registro grabado")
                        window.location.href = "./admin.html";  // recarga usuarios.html

                    })
                    .catch(err => {
                        console.error(err);
                        alert("Error al Grabar")  // se ejecuta
                    })
                
            //this.error = [];
            //validacion
            /*if (!this.email) {
                this.error.push('El correo electrónico es obligatorio.');
            } else
                if (!this.validEmail(this.email)) {
                    this.error.push('El correo electrónico debe ser válido.');
                }
            if (validEmail()== true && validPassword() == true && validConfirmPassword() == true) {*/




                
            /*}else{
                alert("cargue los datos correctos")*/
            
        },
        //login
        login() {
            console.log(this.usuario);
            usuario = this.usuario
            sessionStorage.setItem("adm", 0)//Cuando se le pasa un nombre de clave y un valor, 
            //añade dicha clave al almacenamiento, o la actualiza el valor de la clave si ya existe.
            var i = 0
            while (i < this.usuarios.length && this.usuarios[i].usuario != this.usuario) {
                i++
            }
            if (i < (this.usuarios.length)) {
                if (this.usuarios[i].password == this.password) { //comparar contraseñas
                    if (this.usuarios[i].rol == 1) {
                        sessionStorage.setItem("adm", 1)

                    }
                    window.location.href = "./admin.html";
                } else {
                    window.location.href = "./index.html";//se esta ejecutando
                }
            } else {
                alert('Contraseña incorrecta')//SE ESTA EJECUTANDO
            }
        },
        
        validEmail() {
            var exp = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
            if (exp.test(this.email)) {
                return null;
            } else {
                return true;
            }
        },
        validPassword() {
            var exp = (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/); //expresion regular
            if (exp.test(this.password)) {
                return false;
            } else {
                return true;
            }
        },
        validConfirmPassword() {
            if (this.password !== this.confirmPassword) {
                return false;

            } else {
                return true;
            }
        }

    },
    

    created() {
        this.fetchData(this.url)// created() se ejecuta cada vez que se crea el objeto VUE
    },
}).mount('#app')
