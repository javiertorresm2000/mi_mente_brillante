<script setup>
import { useQuasar } from 'quasar';
import { useUIStore } from './stores/ui';
import router  from './routes/routes'
import './css/main.css'
import './css/colores.css'
import { ref } from 'vue';
import { useUsuarioStore } from './stores/usuario';

let reLogin=ref(false)
const $q = useQuasar()
const usuario=useUsuarioStore()
const ui=useUIStore()
ui.inicializar()

const user=$q.localStorage.getItem('usuario')
if(user){
    
   
    usuario.validarToken(user.token)
       // router.push('/dashboard')
    
}

document.addEventListener("contextmenu", function (e){
    e.preventDefault();
}, false);

// import { useQuasar } from 'quasar'

// const q=useQuasar()
// let p=q.platform
// let device=ref('')
// let orientation=ref('')
// let w=window.visualViewport.width
// let h=window.visualViewport.height
// let o=ref(window.screen.orientation)
// let root=document.documentElement
// let tamw=ref(w+'px')
// let tamh=ref(h+'px')
// root.style.setProperty('--w',w+'px')
// root.style.setProperty('--h',h+'px')


// if(p.is.mobile){
//     device.value='smartphone'
//     if(o.value.type==='landscape-primary'){
//         if(h>480){
//         device.value='tablet'
//         }
//         orientation.value=o.value.type
//     }
//     else if(o.value.type=='portrait-primary'){
//         if(w>480){
//         device.value='tablet'
//         }
//         orientation.value=o.value.type
//     }
// }
// else{
//     device.value='desktop'
//     orientation.value='landscape-primary'
// }



// function onResize(size){
    
//     if(size.width>1024&&device.value=='desktop'){
//         w=size.width
//     }
//     if(size.height>600&&device.value=='desktop'){
//         h=window.visualViewport.height
//     }
   
//     if(orientation.value===o.value.type){
//         tamw.value=w+'px'
//         tamh.value=h+'px'
       
//     }
//     else{
//         tamw.value=h+'px'
//         tamh.value=w+'px'
        
//         if(device.value!='desktop'){
           
//             tamw.value=window.visualViewport.width+'px'
//             tamh.value=window.visualViewport.height+'px'
//         }
//     }
    
// }

</script>

<template>
<div class="row" :style="'width:'+ui.tamw+' '+';height:'+ui.tamh+' '" v-auto-animate>

    <router-view  :device="ui.device" :orientation="ui.o.type" ></router-view>
</div>

<q-resize-observer @resize="ui.onResize" />
</template>

<style>
body{
    background-color: black;
}
</style>