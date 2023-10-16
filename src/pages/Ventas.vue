<script setup>
    import '../css/ventas.css'
    import { useAdicionalStore } from '../stores/adicional';
    import { useUIStore } from '../stores/ui';
    import { useCursosStore } from '../stores/cursos';

    const adicionalStore = useAdicionalStore();
    const ui=useUIStore()
    const curso=useCursosStore()
    adicionalStore.obtenerCoachingVentas()

    function cargarCurso(id){
  ui.dashboard('curso')
  ui.menu_curso=false
  curso.cargarCurso(id)
}
</script>
<template>
    <div class="col-12 row justify-center">
        <div class="row col-11 q-pt-xl q-pb-lg" style="height: calc(100vh - 51px);">
        
        <div class="column fit">
          <div class="row col-1 text-h5">Capacitacion en Ventas</div>
          <div class="row col">
            <div class="col">
                <div class="column fit" style="gap:30px">
                    <template v-if="adicionalStore.loading">
                    <div class="row justify-center">
                        <q-spinner size="50px" color="primary" />
                    </div>
                        
                    </template>
                    <template v-else>
                    
                    
                        <q-scroll-area class="col" style="width: 100%; height:100%;">
                            <q-card  bordered v-for="cap_ventas in adicionalStore.coaching_ventas_capacitacion" class="tarjeta-ventas q-pa-md shadow-7" style="margin:25px" >
                            <q-card-section horizontal>
                                
                                    
                                        <q-img
                                        class="col-5"
                                        
                                        :src="cap_ventas.thumbnail"
                                        />
                                   
                                    
                                   
                                  
                                 <q-card-section >
                                 <div class="text-h6 q-pb-md q-ma-none">{{cap_ventas.titulo}}</div>
                                    <div class="subtitulo">{{cap_ventas.descripcion}}</div>
                                    
                                 </q-card-section>
                            </q-card-section>
                            </q-card>
                        </q-scroll-area>
                    </template>
                </div>
            </div>
            <q-separator vertical color="primary" size="2px"/>
            <div class="col">
            <div class="column fit">
                <template v-if="adicionalStore.loading">
                    <div class="row justify-center">
                        <q-spinner size="50px" color="primary" />
                    </div>
                    </template>
                    <template v-else>
                        <q-scroll-area class="col q-pa-md q-pl-lg " style="width: 100%; height:100%;" >
                            <q-card flat bordered v-for="curso in adicionalStore.cursos" class="tarjeta-ventas q-pa-none shadow-2" style="margin-bottom: 30px;">
                            <q-card-section horizontal>
                                
                                    
                                        <q-img
                                        class="col-4"
                                        :src="curso.thumb"
                                        
                                        />
                                   
                                    
                                   
                                  
                                 <q-card-section >
                                 <div class="column justify-between fit q-pa-lg">
                                    <div class="text-h6 text-uppercase text-bold">{{curso.titulo}}</div>
                                    <div class="subtitulo">Descripcion</div>
                                    <q-btn class="full-width" color="primary" no-caps label="Ingresar" v-if="curso.adquirido" v-on:click="cargarCurso(curso.id)"></q-btn>
                                    <q-btn class="full-width" color="primary" no-caps label="Comprar" v-else></q-btn>  
                                </div>
                                 </q-card-section>
                            </q-card-section>
                            </q-card>
                        </q-scroll-area>
                    </template>
                </div>
            </div>
          
            </div>
        
        </div>
        
        </div>
    </div>
    
</template>