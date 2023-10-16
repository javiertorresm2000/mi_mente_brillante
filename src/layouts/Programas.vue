<script setup>
    import { ref } from 'vue';
    import '../css/programas.css'
import { useUIStore } from '../stores/ui';

    let video=ref(false)
    const ui=useUIStore()

</script>
<template>
<div>
    <q-dialog v-model="video" full-width>
        <q-card style="border-radius: 10px;" :style="ui.device=='smartphone'?'height: 50%':'height: 90%'">
            
            
                <q-video
                
                
                style="height: 100%"
                    src="https://www.youtube.com/embed/4ChLs7ynBZg"
                />
           
        </q-card>
    </q-dialog>
    </div>
    <div class="col row justify-center" >
    
        <div class="column fit " >
            <div class=" q-pa-md row  justify-center items-center">
                <div class="col-11 row justify-center">
                    <div  class="col row items-center">Bienvenido a mi mente brillante</div>
                    <div class="row justify-end" ><q-btn label="" icon-right="far fa-play-circle" size="md" class="bg-amarillo btn-dual" @click="video = true"></q-btn></div>
                </div>
            </div>
            <div class="col">
            <q-scroll-area class=" fit ">
                <router-view></router-view>
            </q-scroll-area>
                
            </div>
        
    </div>
    </div>
</template>