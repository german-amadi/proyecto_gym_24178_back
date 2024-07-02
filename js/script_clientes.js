const { createApp } = Vue
  createApp({
    data() {
      return {
        Cliente: [],
        //url:'http://localhost:5000/productos',
        // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url: "https://tpf24178.pythonanywhere.com/Clientes", // si ya lo subieron a pythonanywhere
        error: false,
        cargando: true,
        /*atributos para el guardar los valores del formulario */
        id: 0,
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        categoria_plan: "",
        imagen: "",
        searchTerm: "", // Término de búsqueda
      };
    },
    computed: {
      filteredClientes() {
        return this.Clientes.filter((cliente) => {
          return cliente.nombre
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        });
      },
    },
    methods: {
      fetchData(url) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            this.Clientes = data;
            this.cargando = false;
          })
          .catch((err) => {
            console.error(err);
            this.error = true;
          });
      },
      eliminar(id) {
        const url = this.url + "/" + id;
        var options = {
          method: "DELETE",
        };
        fetch(url, options)
          .then((res) => res.text()) // or res.json()
          .then((res) => {
            alert("Registro Eliminado");
            location.reload(); // recarga el json luego de eliminado el registro
          });
      },
      grabar() {
        let Cliente = {
          nombre: this.nombre,
          apellido: this.apellido,
          fecha_nacimiento: this.fecha_nacimiento,
          categoria_plan: this.categoria_plan,
          imagen: this.imagen,
        };
        var options = {
          body: JSON.stringify(Cliente),
          method: "POST",
          headers: { "Content-Type": "application/json" },
          redirect: "follow",
        };
        fetch(this.url, options)
          .then(function () {
            alert("Registro grabado");
            window.location.href = "./clientes.html"; // recarga productos.html
          })
          .catch((err) => {
            console.error(err);
            alert("Error al Grabar"); // puedo mostrar el error tambien
          });
      },
    },
    created() {
      this.fetchData(this.url);
    },
  }).mount("#app");
