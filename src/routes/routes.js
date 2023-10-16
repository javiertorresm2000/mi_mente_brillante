import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../layouts/Dashboard.vue'
import Login from '../layouts/Login.vue'

const routes = [
    {
      path: '/school/dashboard',
      component: Dashboard,
      children:[
        {
          path:'inicio',
          component: () => import('../pages/Inicio.vue')
        },
      {
        path:'usuario',
        component: () => import('../pages/Usuario.vue')
      },
      {
        path:'induccion',
        component: () => import('../pages/Induccion.vue')
      },
      {
        path:'ventas',
        component: () => import('../pages/Ventas.vue')
      },
      {
        path:'configuracion',
        component: () => import('../pages/Configuracion.vue')
      },
      {
        path:'Conferencias',
        component: () => import('../pages/Conferencias.vue')
      },
      {
        path: 'programas',
        component: () => import('../layouts/Programas.vue'),
        children:[{
          path:'marketing',
          component: () => import('../pages/Marketing.vue')
        }]
      },
      {
        path:'curso',
        component: () => import('../layouts/Curso.vue'),
        children:[
          {
            path:'libro-imagen',
            component: () => import('../layouts/Curso/VistaImagenes.vue')
          },
          {
            path:'libro-video',
            component: () => import('../layouts/Curso/VistaVideos.vue')
          },
          {
            path:'libro-audio',
            component: () => import('../layouts/Curso/VistaAudios.vue')
          }
        ]
      }
     

    ]
      
    },
    {
      path:'/school',
      component:Login,
      children:[{
        path:'login',
        component: () => import('../pages/Login.vue')
      },
      {
        path:'register',
        component:() => import('../pages/Register.vue')
      }
    ]
    }
    
    
  ]

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;



  
