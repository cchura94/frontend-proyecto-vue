<template>
  <div>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8>
        <v-card class="elevation-6">
          <v-toolbar >
            <v-toolbar-title>Nuevo Usuario</v-toolbar-title>
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
            <v-btn color="primary" @click="registrarUsuario()" :disabled="!valido"
              >Registrar Usuario</v-btn
            >
          </v-card-actions>

          {{ usuario }} - {{ valido }}
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      valido: true,
      usuario: {
        nombre: '',
        correo: '',
        password: ''
      },
       correoRules: [
                v => !!v || 'El Correo es obligatorio',
                v => /.+@.+\..+/.test(v) || 'El correo no es Valido',
            ],
      nombreRules: [
                v => !!v || 'El Correo es obligatorio',
            ],
    }
  },
  methods:{
    async registrarUsuario(){

       const {data} = await axios.post('http://127.0.0.1:3000/api/usuario', this.usuario);
      console.log(data);
      this.$router.push({name: 'ListaUsuario'})

    }
  }
};
</script>

<style>
</style>