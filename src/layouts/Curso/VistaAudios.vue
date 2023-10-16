<script setup>
import { ref } from 'vue';
import { useUIStore } from '../../stores/ui';

const ui = useUIStore()
const props = defineProps({
    audio: String,
    caratula: String,
    titulo: String
});

console.log(props.audio)

</script>

<template>
    <div class="row full-width justify-center">
        <div class="col-md-7 col-xs-11 justify-center items-center">
            <div class="column fit justify-center" style="gap: 20px;">
                <q-img :src="props.caratula" fit="contain" class="col-8" />
                <div class="text-h6 text-grey-8">{{ titulo }}</div>
                <audio class="full-width" controls controlsList="nodownload" preload="none" :src="props.audio"
                    type="audio/mpeg">
                </audio>
            </div>
        </div>
    </div>
</template>