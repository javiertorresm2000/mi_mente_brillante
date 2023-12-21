<script setup>
import { useUIStore } from '../stores/ui';
import TarjetaCurso from '../components/Programas/TarjetaCurso.vue'
import { useCursosStore } from '../stores/cursos';
import { ref } from 'vue';

const ui = useUIStore()
let cursos = useCursosStore()


cursos.obtenerCursos()
let accion_comprar = ref(false)
let url_compra = ref('')

</script>

<template>
  <template v-if="!cursos.loading">
    <div class="text-weight-bold text-h5 " :class="ui.device === 'smartphone' ? 'q-pa-sm' : 'q-pa-lg'">Tus programas</div>
    <template v-if="cursos.total_adquiridos == 0">
      <div :class="ui.device === 'smartphone' ? 'q-pa-sm' : 'q-pa-lg'">No tienes programas en tu biblioteca</div>
    </template>
  </template>
  <div class=" row  wrap justify-center q-pt-md" style="gap: 40px;" :class="ui.device === 'smartphone' ? 'q-pa-sm' : 'q-pa-lg'">

    <template v-for="c in cursos.cursos" v-if="!cursos.loading">
      <template v-if="(c.adquirido)">
        <TarjetaCurso :categoria="c.categoria" :titulo="c.titulo" :thumb="c.thumb" :id="c.id" :modulo="c.modulo"
          :comprar="c.adquirido" :stepsTotal="c.stepsTotal" :stepsCompleted="c.stepsCompleted" :url_compra="c.url_compra">
        </TarjetaCurso>
      </template>
    </template>
    <template v-else>
      <div class="q-pt-xl">
        <q-spinner color="primary" size="5em" :thickness="4" />
      </div>
    </template>
  </div>
  <template v-if="!cursos.loading">
    <q-separator />
    <div class="text-weight-bold text-h5" :class="ui.device === 'smartphone' ? 'q-pa-sm' : 'q-pa-lg'">Programas disponibles
    </div>
    <template v-if="cursos.cursos.length == cursos.total_adquiridos">
      <div :class="ui.device === 'smartphone' ? 'q-pa-sm' : 'q-pa-lg'">No hay mas Programas</div>
    </template>
  </template>
  <div class=" row  wrap justify-center q-pt-md" style="gap: 40px;" :class="ui.device === 'smartphone' ? 'q-pa-sm' : 'q-pa-lg'">
    <template v-for="c in cursos.cursos" v-if="!cursos.loading">
      <template v-if="(!c.adquirido)">
        <TarjetaCurso :categoria="c.categoria" :titulo="c.titulo" :thumb="c.thumb" :id="c.id" :modulo="c.modulo"
          :comprar="c.adquirido" :stepsTotal="c.stepsTotal" :stepsCompleted="c.stepsCompleted" :url_compra="c.url_compra">
        </TarjetaCurso>
      </template>
    </template>
  </div>
  <q-dialog v-model="accion_comprar" persistent medium="true">
    <q-card>
      <q-bar>
        <div>Comprar curso</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <div class="column" style='width=800px !important; height:80vh !important'>
        <iframe :src="url_compra" frameborder="0" width="100%" height="100%" style="width:100%; height:100%vh "></iframe>
      </div>
    </q-card>
  </q-dialog>
</template>