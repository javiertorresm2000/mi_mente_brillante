<script setup>
import '../css/curso.css'
import { ref } from 'vue';
import router from '../routes/routes';
import { useCursosStore } from '../stores/cursos';
import { useUIStore } from '../stores/ui';


const ui = useUIStore()
const curso = useCursosStore()
let inicio = ref(0)
let seccion = ref('libro')
ui.menu = false
router.push('/school/dashboard/curso/libro-imagen')
ui.menu_curso = false

let menu_selected = ref()

let lec = ref([{ url: '/src/img/Cover0.jpg' }])
function cargaImagenes(img, menu) {
    menu_selected.value = menu

    router.push('/school/dashboard/curso/libro-imagen')
    lec.value = img
    if (ui.device !== 'desktop') {
        ui.menu_curso = false
    }
}
let lecv = ref('https://www.youtube.com/embed/JRMUwB_2lXc?modestbranding=1&rel=0&showinfo=0&autoplay=1')
let leca = ref()
let lecc = ref()
let lect = ref()
function cargaVideos(vid, menu) {
    menu_selected.value = menu
    inicio.value = 0
    router.push('/school/dashboard/curso/libro-video')
    lecv.value = vid + '?mode=opaque&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;wmode=transparent'
    if (ui.device !== 'desktop') {
        ui.menu_curso = false
    }
}
function cargaAudio(au, car, titulo, menu) {
    menu_selected.value = menu
    inicio.value = 0
    leca.value = au.url
    lect.value = titulo
    lecc.value = car.sizes.large
    router.push('/school/dashboard/curso/libro-audio')

    if (ui.device !== 'desktop') {
        ui.menu_curso = false
    }
}
</script>
<template>
    <template v-if="!curso.loading">
        <div class="fit bg-grey-6 row justify-center" style="position: relative;">
            <router-view :imagenes="lec" :video="lecv" :audio="leca" :caratula="lecc" :titulo="lect"
                :inicio="inicio"></router-view>
            <div style="position:absolute; right:0;top:15px">
                <q-btn color="primary" class="btn-toggle-menu" :icon="ui.menu_curso ? 'fas fa-caret-right' : 'fas fa-caret-left'" v-on:click="ui.menu_curso = !ui.menu_curso" />
            </div>
        </div>
        <q-drawer :width="350" :show-if-above="false" v-model="ui.menu_curso" class="column text-grey-2" side="right"
            style="background-color: #757575;">
            <div class="bg-grey-9 row q-pa-sm q-pt-md justify-evenly ">
                <q-tabs v-model="seccion" dense class="text-grey" active-color="primary" indicator-color="primary"
                    align="justify" narrow-indicator>
                    <q-tab name="video" label="Videos" icon="fas fa-play-circle" no-caps />
                    <q-tab name="libro" label="Contenido" icon="fas fa-book-open" no-caps />
                    <q-tab name="audiolibro" label="Audios" icon="fas fa-compact-disc" no-caps />
                </q-tabs>
            </div>
            <div class="q-pa-md q-pl-lg column">
                <div class="text-h5 text-primary" style="text-transform: uppercase;">PROGRAMA</div>
                <div class="text-caption"></div>
                <div class="text-h6">{{ curso.cursoActual.titulo }}</div>
            </div>
            <q-separator color="grey-6" size="2px" />
            <div class="col fit ">
                <q-tab-panels animated v-model="seccion">
                    <q-tab-panel name="video" class="q-pa-none bg-grey-7 row" style="height: calc(100vh - 270px)">
                        <q-scroll-area class="col fit">
                            <template v-for="(vid, index) in curso.cursoActual.lecciones">
                                <template v-if="vid.categoria == 29">
                                    <q-btn align="left" class="row full-width q-pa-md q-pl-xl boton-menu-curso-audio" flat
                                        :class="{'selected': `${vid.titulo}${index}` === menu_selected}"
                                        v-on:click="cargaVideos(vid.video_url, `${vid.titulo}${index}`)">
                                        <q-icon name="far fa-play-circle"></q-icon>
                                        <div class="col text-caption q-pl-md" style="text-align:left;">{{ vid.titulo }}</div>
                                    </q-btn>
                                    <q-separator color="grey-6" size="1px" />
                                </template>
                            </template>
                        </q-scroll-area>
                    </q-tab-panel>
                    <q-tab-panel name="libro" class="q-pa-none bg-grey-7 row" style="height: calc(100vh - 270px)">
                        <q-scroll-area class="col fit">
                            <template v-for="leccion in curso.cursoActual.lecciones">
                                <template v-if="leccion.categoria == 30">
                                    <q-expansion-item :label="leccion.titulo" expand-icon-class="text-primary"
                                        expand-icon="fas fa-caret-down" :header-inset-level=".3" class="q-mb-xs"
                                        group="lecciones">
                                        <div class="bg-grey-9">
                                            <q-btn no-caps flat class="full-width q-pl-xl boton-menu-curso" color="grey-8" text-color="white"
                                                align="left" label=""
                                                :class="{'selected': menu_selected === `${leccion.titulo}0`}"
                                                v-on:click="cargaImagenes(leccion.imagenes, `${leccion.titulo}0`)"></q-btn>
                                            <template v-for="(topico, index) in leccion.topicos">
                                                <template v-if="topico.categoria == 32">
                                                    <q-btn no-caps flat class="full-width q-pl-xl boton-menu-curso" color="grey-8"
                                                        :class="{'selected': `${leccion.titulo}${index + 1}` === menu_selected}"
                                                        text-color="white" align="left" :label="topico.titulo"
                                                        v-on:click="cargaImagenes(topico.imagenes, `${leccion.titulo}${index + 1}`)"></q-btn>
                                                </template>
                                            </template>
                                        </div>
                                    </q-expansion-item>
                                    <q-separator color="grey-6" size="1px" />
                                </template>
                            </template>
                        </q-scroll-area>
                    </q-tab-panel>

                    <q-tab-panel name="audiolibro" class="q-pa-none bg-grey-7 row" style="height: calc(100vh - 270px)">
                        <q-scroll-area class="col fit">
                            <template v-for="(au, index) in curso.cursoActual.lecciones">
                                <template v-if="au.categoria == 28">
                                    <q-btn align="left" class="row full-width q-pa-md q-pl-xl boton-menu-curso-audio" flat
                                        :class="{'selected': `${au.titulo}${index}` === menu_selected}"
                                        v-on:click="cargaAudio(au.audio_url, au.caratula_audio, au.titulo, `${au.titulo}${index}`)">
                                        <q-icon name="fas fa-music"></q-icon>
                                        <div class="col text-caption q-pl-md" style="text-align:left;">{{ au.titulo }}</div>
                                    </q-btn>
                                    <q-separator color="grey-6" size="1px" />
                                </template>

                            </template>
                        </q-scroll-area>
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </q-drawer>
    </template>
    <template v-else>
        <q-spinner color="primary" size="3em" :thickness="4" />
    </template>
</template>