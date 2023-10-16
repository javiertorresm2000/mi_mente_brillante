<script setup>
import { ref } from 'vue';
import { useUIStore } from '../../stores/ui';

const ui=useUIStore()
const props=defineProps({
        video: String,
        
    });



</script>
<template>
   
    
    
    <div class="row q-pa-lg col-12 items-center justify-center" >
        <q-video
        
      :src="props.video"
      style="width: 100%; height: 100%; border-radius: 10px;"

    />
   
</div>

</template>