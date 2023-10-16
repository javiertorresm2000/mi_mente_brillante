
<template>
    <div class="row q-pa-md justify-around" style="gap:30px">
    <q-card flat  class="programa q-pl-xl q-pr-xl q-pt-sm" v-for="n in 4" v-if="$q.platform.is.desktop">
      <q-card-section horizontal>
        <q-card-section style="position: relative;">
        <div class="cover-container1" style="position: relative;">
          <div class="sombra-container">
            <div class="sombra"></div>
          </div>
          <div class="contenedor-cover" :style="`background-image:url('/src/img/programas/${n}.png');`">
            
          </div>
        </div>
          
        </q-card-section>
        <q-card-section class="q-gutter-sm">
          <div class="text-h6 fuente-titulos2 texto-amarillo1">Modulo 1</div>
          <div class="texto fuente-titulos2-bold">MARKETING DE INFLUENCIA</div>
          <div class="subtexto texto-gris2">Progreso</div>
          <div class="progreso">
            <div class="separador-progreso"></div>
            <div class="circulo-progreso-lleno"></div>
            
            <div class="circulo-progreso-vacio"></div>
            
            <div class="circulo-progreso-vacio"></div>
            
            <div class="circulo-progreso-vacio"></div>
            
            <div class="circulo-progreso-vacio"></div>
            
          </div>
          
          <q-btn label="Ingresar" class="bg-gris text-white" style="width: 100%;"></q-btn>
          <div class="footer"></div>
        </q-card-section>
      </q-card-section>
    </q-card>


  <q-card flat  class="programa q-pl-sm q-pr-sm programa-mobile" v-for="n in 4" v-if="$q.platform.is.mobile">
      <q-card-section>
        <q-card-section style="position: relative;">
        <div class="cover-container1 row justify-center" style="position: relative;">
          
          <div class="contenedor-cover" :style="`background-image:url('/src/img/programas/${n}.png');`">
            
          </div>
        </div>
          
        </q-card-section>
        <q-card-section class="q-gutter-sm">
          <div class="text-h6 fuente-titulos2 texto-amarillo1">Modulo 1</div>
          <div class="texto fuente-titulos2-bold">MARKETING DE INFLUENCIA</div>
          <div class="subtexto texto-gris2">Progreso</div>
          <div class="progreso">
            <div class="separador-progreso"></div>
            <div class="circulo-progreso-lleno"></div>
            
            <div class="circulo-progreso-vacio"></div>
            
            <div class="circulo-progreso-vacio"></div>
            
            <div class="circulo-progreso-vacio"></div>
            
            <div class="circulo-progreso-vacio"></div>
            
          </div>
          
          <q-btn label="Ingresar" class="bg-gris text-white" style="width: 100%;"></q-btn>
          
        </q-card-section>
      </q-card-section>
    </q-card>

    </div>
</template>