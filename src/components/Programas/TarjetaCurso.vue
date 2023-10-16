<script setup>
import router from '../../routes/routes';
import { useCursosStore } from '../../stores/cursos';
import { useUIStore } from '../../stores/ui';

let esperarVenta=false


const props=defineProps({
    id:Number,
    thumb:String,
    titulo:String,
    modulo:String,
    comprar:Boolean,
    stepsTotal:Number,
    stepsCompleted:Number,
    url_compra:String
})

let porcentaje=(100*props.stepsCompleted)/props.stepsTotal
console.log('porcentaje:'+porcentaje)
const ui=useUIStore()
const curso=useCursosStore()

function cargarCurso(id){
  ui.dashboard('curso')
  ui.menu_curso=false
  curso.cargarCurso(id)
}
function abrir_pago(url_compra){
  esperarVenta=true
  const url = url_compra;
const windowName = 'Compra de curso';
const windowFeatures = 'width=850,height=600,menubar=no,toolbar=no,location=no';

let venta=window.open(url, windowName, windowFeatures);

}
window.onfocus = function() {
  // This code will be executed when the window gains focus
  if(esperarVenta){
    console.log("Window is in focus");
    esperarVenta=false
  }
  
};

</script>
<template>

<q-card class="   shadow-5" style="border-radius: 10px; background-image: url('/src/img/programas/bg-02.png'); background-size: cover;" :class="ui.device==='smartphone'?'col-12 q-pl-md q-pr-md q-pt-md q-pb-sm':'col-5 q-pl-xl q-pr-xl q-pt-lg q-pb-lg'">
        
        <q-card-section horizontal >
          <q-img spinner-color="primary"  class="col-4 imagen-cover-curso"
          :src="thumb" style="border-radius: 0; "></q-img>
          <q-card-section class="q-pl-lg q-pt-none q-pr-none full-width q-pb-lg justify-between column" style="gap:10px">
            <div class="column">
              <div class="text-h6 text-primary" >{{modulo}}</div>
              <div class="text-h7" style="text-transform:uppercase">{{titulo}}</div>
            </div>
            
            <div class="tex-caption" v-if="comprar">Progreso</div>
            <div class="row items-center" v-if="comprar">
              <div class=" col" style="height:3px;" :class="porcentaje>0?'bg-primary':'bg-grey'"></div>
              <q-icon size="10px" :color="porcentaje>10?'primary':'grey'" name="fas fa-circle"></q-icon>
              <div class="bg-primary col" style="height:3px;" :class="porcentaje>20?'bg-primary':'bg-grey'"></div>
              <q-icon size="10px" :color="porcentaje>30?'primary':'grey'" name="fas fa-circle"></q-icon>
              <div class="bg-primary col" style="height:3px;" :class="porcentaje>40?'bg-primary':'bg-grey'"></div>
              <q-icon  size="10px" :color="porcentaje>50?'primary':'gey'" name="fas fa-circle"></q-icon>
              <div class="bg-primary col" style="height:3px;" :class="porcentaje>60?'bg-primary':'bg-grey'"></div>
              <q-icon size="10px" :color="porcentaje>70?'primary':'grey'" name="fas fa-circle"></q-icon>
              <div class="bg-primary col" style="height:3px;" :class="porcentaje>80?'bg-primary':'bg-grey'"></div>
              <q-icon size="10px" :color="porcentaje==100?'primary':'gray'" name="fas fa-circle"></q-icon>
            </div>
            
            <q-btn flat color="white"  class="bg-primary full-width q-mb-sm" v-if="!comprar" @click="abrir_pago(url_compra)"  >Comprar</q-btn>
            <q-btn flat color="white"  class="bg-primary full-width q-mb-sm" v-else v-on:click="cargarCurso(props.id)">Ingresar</q-btn>
          </q-card-section>
          
          
          
        </q-card-section>
      </q-card>
      

</template>