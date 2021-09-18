<template>
  <v-data-table
    :headers="columnas"
    :items="lista_productos"
    sort-by="id"
    class="elevation-1"
  >
  <template v-slot:top>
    <v-toolbar flat>
        <v-toolbar-title>GESTION PRODUCTOS</v-toolbar-title>

<v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>

            <v-spacer></v-spacer>
            
        <v-dialog
          v-model="dialog"
          max-width="700px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo Producto
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ tituloForm }}</span>
            
            </v-card-title>


            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="8"
                    md="8"
                  >
                    <v-text-field
                      v-model="ProductoItem.nombre"
                      label="Ingrese Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    md="4"
                  >
                    <v-text-field
                      v-model="ProductoItem.precio"
                      label="Ingrese Precio"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="ProductoItem.descripcion"
                      label="Ingrese Descripción"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <input type="file" ref="img" @change="imagenSeleccionada">
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                  <img src="" alt="">
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="cerrar"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="guardarProducto()"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-toolbar>


  </template>

<template v-slot:item.imagen="{ item }">
      <v-img :src="`http://127.0.0.1:3000/imagenes/${item.imagen}`" width="70px"></v-img>
    </template>

  <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>


  </v-data-table>
</template>

<script>
import * as prodService from "../../services/productoService.js"

export default {
  data(){
    return {
      columnas: [
        {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Precio', value: 'precio' },
        { text: 'Categoria', value: 'categoriaId' },
        { text: 'Imagen', value: 'imagen' },
        { text: 'Accciones', value: 'actions', sortable: false },
      ],
      lista_productos: [],
      tituloForm: 'Nuevo Producto',
      ProductoItem: {
        nombre: '',
        precio: 0,
        descripcion: '',
        categoriaId: 1,
        imagen: null,
      },
      defaultItem: {
        nombre: '',
        precio: 0,
        descripcion: '',
        categoriaId: 1,
        imagen: null,
      },
       dialog: false,
       productoIndex: -1,
       img: false,
    }
  },
  mounted(){
    this.listarProductos()
  },
  methods:{
    async listarProductos(){
      // peticion al servidor
      const {data} = await prodService.listar()
      console.log(data)
      this.lista_productos = data
    },
    async guardarProducto(){
      let formData = new FormData;
      formData.append("nombre", this.ProductoItem.nombre)
      formData.append("precio", this.ProductoItem.precio)
      formData.append("descripcion", this.ProductoItem.descripcion)
      formData.append("categoriaId", this.ProductoItem.categoriaId)
      if(this.img){
        formData.append("imagen", this.ProductoItem.imagen)
      }

      const {data} = await prodService.guardar(formData)
      console.log(data)
      this.listarProductos()
      this.cerrar()
    },
    cerrar () {
        this.dialog = false
        this.$nextTick(() => {
          this.ProductoItem = Object.assign({}, this.defaultItem)
          this.productoIndex = -1
        })
      },
    imagenSeleccionada(event){
      console.log(event.target.files[0])
      this.ProductoItem.imagen = event.target.files[0];
      this.img = true
    }
  }

}
</script>

<style>

</style>