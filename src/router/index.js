import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PlantillaAdmin from '../plantilla/PlantillaAdmin'
import PlantillaPagina from '../plantilla/PlantillaPagina'

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
