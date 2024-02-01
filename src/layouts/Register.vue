<script setup>

import { ref } from 'vue'
import FormularioLogin from '../components/Login/FormularioLogin.vue';
import FormularioRegistro from '../components/Login/FormularioRegistro.vue';


const props=defineProps({
    orientation:String,
    device:String
}
)

let tamh=ref()
function actualizaTam(){
    tamh.value=document.getElementById('login').offsetHeight
    
}

</script>
<template>
   <div class="col row justify-center bg-azul0" style="height:100%; width:100%; background-image: url('/src/img/bg11.jpg'); background-size:cover; background-position-y:center: start;; background-repeat: no-repeat;" v-if="props.device!='smartphone'&&props.orientation==='landscape-primary'">
        <div class="col-4 col-xl-3 row items-center" :class="props.device==='tablet'&&props.orientation==='landscape-primary' ? 'col-5' : 'col-4'">
            <!-- <formulario-login v-on:vnode-mounted="actualizaTam" :orientation="props.orientation" :device="props.device"></formulario-login> -->
            <formulario-registro v-on:vnode-mounted="actualizaTam" :orientation="props.orientation" :device="props.device"></formulario-registro>
        </div>
        <div class="col-4 col-xl-3  row items-center " :class="props.device==='tablet'&&props.orientation==='landscape-primary' ? 'col-5' : 'col-4'">
        </div>
   </div>
   <!-- muestra si es smartphone vertical -->
   <div class="col column" v-if="props.device!='desktop' && props.orientation==='portrait-primary'">
        <div class="col-11  q-pl-md q-pr-md column justify-center">
            
                <div class="col-1 row items-center justify-center">
                    <q-img src="../img/logogris.png" style="width: 100px; height:40px"/>
                </div>
                <div class="q-pt-lg row justify-center">
                    <div class="col-sm-9 col-12">
                        <formulario-registro v-on:vnode-mounted="actualizaTam" :orientation="props.orientation" :device="props.device"></formulario-registro>
                    </div>
                </div>
            
        </div>
        <div class="col row bg-primary justify-center items-center" style="font-size:medium; gap:15px">
            <div class="text-white">Mi mente brillante ®</div>
        </div>
   </div>
   <div class="col row justify-center items-center bg-azul0"  v-if="props.device==='smartphone'&&props.orientation==='landscape-primary'">
        <q-card class="q-pa-xl bg-amarillo text-black" style="border-radius: 15px;">
            <div class="text-h5">Gira tu telefono para acceder a la plataforma!</div>
        </q-card>
   </div>
  
   
</template>

