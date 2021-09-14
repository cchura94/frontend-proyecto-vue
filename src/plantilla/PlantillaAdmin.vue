<template>    
    <div>
         <v-navigation-drawer
            v-model="drawer"
            clipped="false"
            fixed
            app
        >

       <v-list>
         <template v-for="(item, i) in items">
          <v-list-item :key="i" v-if="!item.children">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title>{{item.text}}</v-list-item-title>
          </v-list-item>


          <v-list-group :key="i"
            :value="true"
            prepend-icon="mdi-account-circle"
            v-if="item.children"
          >
        <template v-slot:activator>
          <v-list-item-title>{{item.text}}</v-list-item-title>
        </template>

        <v-list-item
            v-for="(sub_item, j) in item.children"
            :key="j"
            link
          >
            <v-list-item-title v-text="sub_item.text"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="sub_item.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>

      </v-list-group>

         </template>

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
            icon: 'mdi-account', text: 'Usuarios',
            children: [
                { icon: 'mdi-account', text: 'Lista Usuario' },
                { icon: 'mdi-new', text: 'Nuevo Usuario' }
            ] 
          },
        { icon: 'mdi-post', text: 'Productos' },
        { icon: 'mdi-post', text: 'Sucursal' },
        
      ]
        }
    }
}
</script>