<template>
  <v-data-table
    :headers="columnas"
    :items="lista_productos"
    :options.sync="opciones"
    :page="page"
    :server-items-length="total_productos"
    :loading="cargando"
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
                    sm="6"
                    md="6"
                  >
                    <input type="file" ref="img" @change="imagenSeleccionada">
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                  <v-img :src="`http://127.0.0.1:3000/imagenes/${ProductoItem.imagen}`"></v-img>
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

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Está seguro de eliminar el Producto?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

         <v-dialog
      v-model="dialog_asignar"
      width="500"
    >

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Asignar Sucursal
        </v-card-title>

        <v-card-text>
          <v-row align="center">
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-select
                v-model="dataAsignar.sucursal_id"
                :items="lista_sucursales"
                item-text="nombre"
                item-value="id"
                label="Seleciconar Sucursal"
              ></v-select>
            </v-col>
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
            <v-text-field
            v-model="dataAsignar.stock"
              label="Cantidad"
              type="number"
            ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="asignarProductoSucursal()"
          >
            Asignar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    </v-toolbar>


  </template>

<template v-slot:[`item.imagen`]="{ item }">
      <v-img :src="`http://127.0.0.1:3000/imagenes/${item.imagen}`" width="70px"></v-img>
    </template>

  <template v-slot:[`item.actions`]="{ item }">

    <v-btn
        small
        color="warning"
        @click="asignarProducto(item)"
      >
        Asignar Producto
      </v-btn>

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
import * as sucService from "../../services/sucursalService.js"

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
      lista_sucursales: [],
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
       dialogDelete: false,
       productoIndex: -1,
       img: false,
       opciones: {
         itemsPerPage: 5
       },
       page: 1,
       total_productos: 0,
       cargando: true,
       dialog_asignar: false,
        asignarItem: {},
        dataAsignar: {
          stock: 1
        }
    }
  },
  async mounted(){
    this.listarProductos()
    const {data} = await sucService.listar();
    this.lista_sucursales = data
  },
  methods:{
    async listarProductos(){
      this.cargando = true
      // peticion al servidor
      const { page, itemsPerPage } =this.opciones;
      let nro_pagina = page

      const {data} = await prodService.listar(nro_pagina, itemsPerPage)
      console.log(data)
      this.total_productos = data.count
      this.lista_productos = data.rows
      this.cargando = false
    },
    async guardarProducto(){
      if (this.productoIndex > -1) {
        let formData = new FormData;
        formData.append("nombre", this.ProductoItem.nombre)
        formData.append("precio", this.ProductoItem.precio)
        formData.append("descripcion", this.ProductoItem.descripcion)
        formData.append("categoriaId", this.ProductoItem.categoriaId)
        if(this.img){
          formData.append("imagen", this.ProductoItem.imagen)
        }
  
        const {data} = await prodService.modificar(this.ProductoItem.id, formData)
      }else{

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
      }
      this.listarProductos()
      this.cerrar()
      this.img = false
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
    },
    editItem (item) {
      console.log(item);
        this.productoIndex = this.lista_productos.indexOf(item)
        this.ProductoItem = Object.assign({}, item)
        this.dialog = true
      },
     deleteItem (item) {
        this.productoIndex = this.lista_productos.indexOf(item)
        this.ProductoItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      asignarProducto(item){
        // this.editedIndex = this.lista_sucursales.indexOf(item)
        this.asignarItem = Object.assign({}, item)
        this.dialog_asignar = true
      },
      async asignarProductoSucursal(){
        await prodService.asignarProducto(this.asignarItem.id, this.dataAsignar);
      },

      async deleteItemConfirm () {
        // this.lista_productos.splice(this.ProductoIndex, 1)
        await prodService.eliminar(this.ProductoItem.id)
        this.closeDelete()
        this.listarProductos()
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.ProductoItem = Object.assign({}, this.ProductoItem)
          this.productoIndex = -1
        })
      },
  },
  watch: {
    opciones: {
      handler(){
        this.listarProductos()
      }
    }
  }

}
</script>

<style>

</style>