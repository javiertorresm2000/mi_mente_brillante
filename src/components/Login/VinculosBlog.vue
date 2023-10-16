<script setup>
import { ref } from 'vue'
    const props=defineProps({
        tamh:Number
    })
</script>
<template>
    <q-card flat class="column q-pa-xl full-width justify-center redondeado-15 bg-amarillo items-center" style="gap: 20px; " :style="'height:'+props.tamh+'px'">
        <q-img src="../../img/logo.png" style="width:50px"></q-img>


                
                
                    <p>{{props.tamh}}</p>
                
               
                    <q-btn class="text-black" color="white" label="BLOG"></q-btn>
                    <div class="row q-gutter-lg text-white " style="font-size: 2em">
                        <q-icon name="fab fa-facebook" />
                        <q-icon name="fab fa-twitter" />
                        <q-icon name="fab fa-youtube" />
                    </div>
    </q-card>
</template>