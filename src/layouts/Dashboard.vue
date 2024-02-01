<script setup>
import '../css/dashboard.css'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import router from '../routes/routes'
import { useUsuarioStore } from '../stores/usuario'
import { useUIStore } from '../stores/ui'



const ui=useUIStore()
const usuario=useUsuarioStore()
if(usuario.usuario.token===''){
  // Srouter.push('/')
}
else{
  router.push('/school/dashboard/programas/marketing')
  
 
}
ui.dashboard=function(pagina){
  router.push('/school/dashboard/'+pagina)
}
const q = useQuasar()
const notificaciones= ref(false)


function toggleLeftDrawer () {
        ui.menu=!ui.menu
      }

function  showNotif (position) {

   q.notify({
          message: 'Jim pinged you.',
          icon: 'fas fa-star',
          position:'top-right'
        })
}

function cambiarPagina(destino){
  router.push(destino)
}

</script>

<template>
    <q-layout view="hHh LpR fFf" class="bg-white">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="fas fa-bars" @click="toggleLeftDrawer">
         <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
          <strong>Mostrar / Esconder1</strong> menu lateral
        </q-tooltip>
        </q-btn>
        <div>
       <img src="../img/logogris.png" alt="" class="tinte-gris encajar-imagen">
       </div>
        <q-toolbar-title class="cabecera">
          <div class="logotipo"></div>
          <div class="acciones">
          <q-separator vertical inset />
            <div class="perfil-btn">
               <q-btn-dropdown 
               flat
               icon="fas fa-user-circle"
               label="Perfil"
               :ripple="false"
               no-caps
               class="full-width full-height"
               content-class="submenu-top"
               menu-anchor="bottom end"
            >
                <div class="submenu-p">
                  <div class="submenu-perfil">
                    <p class="nombre-usuario">{{usuario.usuario.nombre+' '+usuario.usuario.apellido}} </p>
                    <p class="correo-usuario">{{usuario.usuario.correo}}</p>
                  </div>
                  <q-separator/>
                  <q-btn flat no-caps :ripple="false"  align="left" v-on:click="cambiarPagina('/school/dashboard/usuario')">
                    Usuario
                  </q-btn>
                  
                  
                  
                  
                  <q-separator/>
                  <q-btn flat no-caps :ripple="false"  align="left" v-on:click="cambiarPagina('/school/dashboard/configuracion')">
                    Configuracion
                  </q-btn>
                  <q-separator/>
                  <q-btn flat no-caps :ripple="false"  align="left" v-on:click="usuario.logout">
                    Cerrar Sesion
                  </q-btn>
                </div>
              </q-btn-dropdown>
            </div>
            <q-separator vertical inset />
            
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-dialog v-model="notificaciones" position="right">
    
    </q-dialog>
    <q-drawer :width="200" show-if-above v-model="ui.menu" side="left" bordered class="menu-lateral" :breakpoint="1181">
      
      <q-expansion-item
         header-class="boton-menu"
         group="somegroup"
         class="no-icon"
        dense
        default-opened
        dense-toggle
        label="PROGRAMAS"
        v-on:click="cambiarPagina('/school/dashboard/programas/marketing')"
      ></q-expansion-item>
      <q-separator inset />
      <q-expansion-item
         header-class="boton-menu"
         group="somegroup"
         class="no-icon"
        dense
        dense-toggle
        label="INDUCCION"
        v-on:click="cambiarPagina('/school/dashboard/induccion')"
      >
        
      </q-expansion-item>
      <!-- <q-separator inset /> -->
      <!-- <q-expansion-item
         header-class="boton-menu"
         group="somegroup"
         class="no-icon"
        dense
        dense-toggle
        label="ORIENTACION"
        
      >
        
      </q-expansion-item> -->
      <q-separator inset />
      <q-expansion-item
         header-class="boton-menu"
         group="somegroup"
        dense
        dense-toggle
        label="SOCIAL MEDIA"
        
      >
        <a class="social-media-item" href="https://blog.mimentebrillante.com" target="_blank">
          <span>Blog</span>
          <img src="../img/icons/blog_icon.png" alt="" class="encajar-imagen">
        </a>
        <a class="social-media-item" href="https://www.instagram.com/mimente_brillante/" target="_blank">
          <span>Instagram</span>
          <img src="../img/icons/instagram_icon.png" alt="" class="encajar-imagen">
        </a>
        <a class="social-media-item" href="https://www.youtube.com/@mimente_brillante/videos" target="_blank">
          <span>Youtube</span>
          <img src="../img/icons/youtube_icon.png" alt="" class="encajar-imagen">
        </a>
      </q-expansion-item>
      <q-separator inset />
      <q-expansion-item
         header-class="boton-menu"
         group="somegroup"
         class="no-icon"
        dense
        dense-toggle
        label="USUARIO"
        v-on:click="cambiarPagina('/school/dashboard/usuario')"
      >
        
      </q-expansion-item>
      <q-separator inset />
      <q-expansion-item
         header-class="boton-menu"
         group="somegroup"
         class="no-icon"
        dense
        dense-toggle
        label="CONFIGURACION"
        v-on:click="cambiarPagina('/school/dashboard/configuracion')"
      >
        
      </q-expansion-item>
    </q-drawer>
    

    <q-page-container class="bg-white row full-height justify-center" v-auto-animate>
    
      <router-view ></router-view>
    
     
    </q-page-container>

  </q-layout>
</template>

