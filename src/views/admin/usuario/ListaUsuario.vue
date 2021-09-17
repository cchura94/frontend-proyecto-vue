<template>
  <div>
      <h1>Lista de Usuarios</h1>

      <v-btn color="primary" to="/admin/usuario/nuevo">Nuevo Usuario</v-btn>

<v-card>
      <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            NOMBRE
          </th>
          <th class="text-left">
            CORREO
          </th>
          <th class="text-left">
            ESTADO
          </th>
          <th class="text-left">
            ACCIONES
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="usuario in lista_usuarios"
          :key="usuario.id"
        >
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.correo }}</td>
          <td>{{ usuario.estado }}</td>
          <td>
            <v-btn icon color="warning" :to="`/admin/usuario/${usuario.id}/editar`">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="danger" @click="eliminarUsuario(usuario)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
      
      </v-card>
     
      
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      lista_usuarios: [],
     
    }
  },
  mounted(){
    this.getListarUsuarios()
  },
  methods: {
    async getListarUsuarios(){
      // consumir desde node con axios
      const {data} = await axios.get('http://127.0.0.1:3000/api/usuario');
      
      this.lista_usuarios = data
    },
    async eliminarUsuario(usuario){
      if(confirm("¿Está Seguro de eliminar el registro?")){
        const {data} = await axios.delete('http://127.0.0.1:3000/api/usuario/'+usuario.id);
        this.getListarUsuarios()
      }
    }
  }

}
</script>

<style>

</style>