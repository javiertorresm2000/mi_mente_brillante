<script setup>

import router from '../routes/routes.js';

function cambiarPagina(destino){
  router.push(destino)
}
</script>
<template>
<div class="column q-pa-lg " style="gap: 20px;">
                    
                        <div class="text-h5 texto-amarillo1">Registro</div>
                    
                    
                        <q-input dense outlined v-model="text" label="Nombre" class="bg-white" />
                        <q-input dense outlined v-model="text" label="Apellido" class="bg-white" />
                        <div class="q-row">
                          <q-option-group
                            v-model="group"
                            :options="options"
                            color="texto-amarillo1"
                            type="checkbox"
                          />
                          <q-input dense outlined v-model="text" label="Ciudad o region" class="bg-white"></q-input>
                        </div>
                        
                        <q-checkbox label="Recuerda mis datos"></q-checkbox>
                         <q-btn class="full-width bg-amarillo text-white"  label="Registrarme"></q-btn>
                    
                   <div> Si tienes cuenta <span class="texto-amarillo1" v-on:click="cambiarPagina('/')">ingresa aqui</span></div>
                    

                    
                </div>
</template>