import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PlantillaAdmin from '../plantilla/PlantillaAdmin'
import PlantillaPagina from '../plantilla/PlantillaPagina'
import ListaUsuario from '../views/admin/usuario/ListaUsuario.vue'
import NuevoUsuario from '../views/admin/usuario/NuevoUsuario.vue'
import Usuario from '../views/admin/usuario/Usuario.vue'
import Producto from '../views/admin/Producto.vue'
import Sucursal from '../views/admin/Sucursal.vue'

import Inicio from '../views/pagina/Inicio.vue'
import Productos from '../views/pagina/Productos.vue'
import Login from '../views/pagina/Login.vue'

import Admin from '../views/admin/Admin.vue'
// Guard
import {authGuard} from '../guards/authGuard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: PlantillaPagina,
    children: [
      {
        path: '/',
        name: 'Inicio',
        component: Inicio
      },
      {
        path: '/productos',
        name: 'Productos',
        component: Productos
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      }
    ]

  },
  {
    path: '/admin',
    component: PlantillaAdmin,
    beforeEnter: authGuard,
    children: [
      {
        path: '/',
        name: 'Admin',
        component: Admin
      },
      {
        path: 'usuario',
        component: Usuario,
        children: [
          {
            path: '/',
            name: 'ListaUsuario',
            component: ListaUsuario
          },
          {
            path: 'nuevo',
            name: 'NuevoUsuario',
            component: NuevoUsuario
          },
        ]
      },
      {
        path: 'producto',
        name: 'Producto',
        component: Producto
      },
      {
        path: 'sucursal',
        name: 'Sucursal',
        component: Sucursal
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
