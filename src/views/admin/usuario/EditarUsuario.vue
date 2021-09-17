<template>
     <div>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8>
        <v-card class="elevation-6">
          <v-toolbar >
            <v-toolbar-title>Editar Usuario</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="formRegistro" v-model="valido" lazy-validation>
              <v-text-field
                v-model="usuario.nombre"
                prepend-icon="mdi-account"
                name="nombre"
                label="Ingrese su Nombre"
                type="text"
                :rules="nombreRules"
              >
              </v-text-field>
              <v-text-field
                v-model="usuario.correo"
                prepend-icon="mdi-email"
                name="email"
                label="Ingrese su Correo"
                type="email"
                :rules="correoRules"
              >
              </v-text-field>
              <v-text-field
                v-model="usuario.password"
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Contraseña"
                type="password"
                :rules="[(v) => !!v || 'La Contraseña es obligatorio']"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="modificarUsuario()" :disabled="!valido"
              >Modificar Usuario</v-btn
            >
          </v-card-actions>

          {{ usuario }} - {{ valido }}
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
        v-model="snackbar"
        timeout="3000"
        :value="true"
        color="red"
        absolute
        right
        rounded="pill"
        top
        >
        {{ snackbar_text }}.
        </v-snackbar>
  </div>
</template>

<script>
import axios from "axios"

export default {
    data(){
        return {
            usuario: {
                nombre: '',
                correo: '',
                password: ''
            },
            valido: true,
 correoRules: [
                v => !!v || 'El Correo es obligatorio',
                v => /.+@.+\..+/.test(v) || 'El correo no es Valido',
            ],
      nombreRules: [
                v => !!v || 'El Correo es obligatorio',
            ],
              snackbar: false,
            snackbar_text: '',
        }
    },
    async mounted(){
        let id = this.$route.params.id
        
        const {data} = await axios.get('http://127.0.0.1:3000/api/usuario/'+id);
        console.log(data);
        this.usuario = data[0]
        this.usuario.password = ""
    },
    methods:{
        async modificarUsuario(){
            let id = this.$route.params.id
        
        const {data} = await axios.put('http://127.0.0.1:3000/api/usuario/'+id, this.usuario);
          console.log(data);
      if(data.error == true){
        this.snackbar = true
        this.snackbar_text = data.mensaje
      }else{

        this.$router.push({name: 'ListaUsuario'})
      }
        }
    }

}
</script>

<style>

</style>