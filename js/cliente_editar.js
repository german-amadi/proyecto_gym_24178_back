console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({ 
    data() {
      return {
        id: 0,
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        categoria_plan: "",
        imagen: "",
        url: "https://usercodo24178.pythonanywhere.com/clientes/"+ id,
      };  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id= data.id
                    this.nombre = data.nombre
                    this.apellido = data.apellido
                    this.fecha_nacimiento= data.fecha_nacimiento
                    this.categoria_plan= data.categoria_plan
                    this.imagen= data.imagen                    
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let Cliente = {
                nombre:this.nombre,
                apellido: this.apellido,
                fecha_nacimiento:this.fecha_nacimiento,
                categoria_plan: this.categoria_plan,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(Cliente),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./clientes.html"; // navega a productos.html          
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
