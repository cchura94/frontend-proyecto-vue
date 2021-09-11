<template>    
    <div>
         <v-navigation-drawer
            v-model="drawer"
            clipped="false"
            fixed
            app
        >

        <v-list dense>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

         </v-navigation-drawer>

 <v-toolbar
      :clipped-left="true"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
           <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">ADMINISTRACIÓN</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-notifications</v-icon>
      </v-btn>
      
    </v-toolbar>


        <router-view/>
    </div>
</template>
<script>
export default {
    data(){
        return {
            drawer: null,
            items: [
        { 
            icon: 'mdi-contacts', text: 'Usuarios',
            children: [
                { icon: 'mdi-add', text: 'Lista Usuario' },
                { icon: 'mdi-add', text: 'Nuevo Usuario' }
            ] 
          },
        { icon: 'mdi-post', text: 'Productos' },
        { icon: 'mdi-post', text: 'Sucursal' },
        
       
        { icon: 'mdi-settings', text: 'Categorias' },
        { icon: 'mdi-chat_bubble', text: 'Send feedback' },
        { icon: 'mdi-help', text: 'Help' },
        { icon: 'mdi-phonelink', text: 'App downloads' },
        { icon: 'mdi-keyboard', text: 'Go to the old version' }
      ]
        }
    }
}
</script>