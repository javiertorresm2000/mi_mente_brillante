<script setup>
import { ref, watch } from 'vue';
import { useUIStore } from '../../stores/ui';

const ui = useUIStore()
const props = defineProps({
  imagenes: Object,
});

let fullscreen = ref(false)
let slide = ref(0)

watch(props, () => {
  slide.value = 0
})

</script>
<template>
  <template v-if="ui.device != 'desktop' && ui.orientation == 'portrait-primary'">
    <div class="column fit ">
      <div class="col-10  items-center">
        <q-carousel ref="carousel" swipeable animated arrows v-model="slide" v-model:fullscreen="fullscreen" height="100%"
          control-color="primary" transition-prev="slide-right" transition-next="slide-left">

          <q-carousel-slide :name="i" v-for="(imagen, i) in props.imagenes">
            <div class="row fit items-center justify-center">
              <img :src="imagen.url" class="fit  shadow-10"
                style="object-fit: contain;  max-height: calc(100vh - 300px) !important; height:auto !important; width:auto !important" />
            </div>
          </q-carousel-slide>

          <template v-slot:control>
            <q-carousel-control position="bottom-right" :offset="[18, 18]">
              <q-btn dense flat color="white" text-color="primary"
                :icon="fullscreen ? 'fas fa-compress' : 'fas fa-expand'" @click="fullscreen = !fullscreen" />
            </q-carousel-control>
          </template>
        </q-carousel>
        <!-- <q-img :src="imagen_actual" fit="contain"   spinner-color="primary" style="height: calc((100vh - 55px) - (100vh / 12) * 2);"/> -->
      </div>
      <div class="col-2 bg-grey-8">
        <q-scroll-area class="fit q-pa-md">
          <div class="row no-wrap " style="gap:15px">
            <template v-for="(img, i) in imagenes">
              <q-img :src="img.thumb" style="height: calc((100vh - 55px) - (100vh / 12) * 10); width:90px"
                v-on:click="slide = i" />
            </template>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="col-10 row  q-pa-xs" style="gap: 20px;">
      <div class="col-2 bg-grey-7" style="border-radius:10px">
        <q-scroll-area class="fit q-pa-md">
          <q-img class="q-mb-md" :src="img.thumb" v-for="(img, i) in imagenes" v-on:click="slide = i" />

        </q-scroll-area>
      </div>
      <div class="col-9 ">
        <q-carousel swipeable animated arrows v-model="slide" v-model:fullscreen="fullscreen" height="100%"
          control-color="primary" style="border-radius: 10px;" transition-prev="slide-right" transition-next="slide-left">

          <q-carousel-slide :name="i" v-for="(imagen, i) in props.imagenes">
            <div class="row items-center justify-center" style="">
              <img :src="imagen.url" class=" shadow-10" style="object-fit: contain; height:calc(100vh - 100px)" />
            </div>
          </q-carousel-slide>

          <template v-slot:control>
            <q-carousel-control position="bottom-right" :offset="[18, 18]">
              <q-btn dense flat color="white" text-color="primary"
                :icon="fullscreen ? 'fas fa-compress' : 'fas fa-expand'" @click="fullscreen = !fullscreen" />
            </q-carousel-control>
          </template>
        </q-carousel>
      </div>
    </div>
  </template>
</template>