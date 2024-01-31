<script setup>
import { useAdicionalStore } from '../stores/adicional';

const adicional = useAdicionalStore()
adicional.obtenerInduccion()

</script>

<template>
    <template v-if="!adicional.loading">
        <div class="row items-center justify-center" style="height:calc(100vh - 51px) ;">
            <div class="row justify-center">
                <div class="col-11 row   q-gutter-lg " v-if="$q.platform.is.desktop">
                    <!-- <div class="col-7 ">
                        <div class="row" style="height: 100%;">
                            <div class="text-h5 fuente-subtitulos q-pb-lg" v-html="adicional.induccion_izq[0].titulo"></div>
                            <q-video class="full-width" :ratio="16 / 9" :src="adicional.induccion_izq[0].video_url" />
                        </div>

                    </div>
                    <q-separator vertical size="2px" style="background-color:var(--primario)" />
                    <div class="col " style="height: 100%;">
                        <div class="text-h5 fuente-subtitulos q-pb-lg" v-html="adicional.induccion_der[0].titulo"></div>
                        <div v-html="adicional.induccion_der[0].descripcion"></div>

                    </div> -->
                    <div class="col-7 ">
                        <div class="row" style="height: 100%;">
                            <div class="text-h5 fuente-subtitulos q-pb-lg">Reproduce el siguiente video</div>
                            <q-video class="full-width" :ratio="16 / 9" src="https://www.youtube.com/embed/U3wwVAG-jzc" />
                        </div>

                    </div>
                    <q-separator vertical size="2px" style="background-color:var(--primario)" />
                    <div class="col " style="height: 100%;">
                        <div class="text-h5 fuente-subtitulos q-pb-lg">Recomendaciones</div>
                        <div>
                            <ul class="lista q-pr-lg">
                                <b></b><br>
                                <li>Inicia tu sesión a esta plataforma desde <b>www.mimentebrillante.com</b> </li>
                                <li>En la sección de PROGRAMAS vas a encontrar un botón de reproducción en la parte superior derecha, donde puedes ver la demostración del funcionamiento del contenido de los programas. </li>
                                <li>Cada programa tiene un paso a paso el cual te guiara en el desarrollo de aprendizaje y practica.</li>
                                <li>Debes seguir los pasos según el cronograma de actividades para que tu proceso sea efectivo.</li>     
                            </ul>
                            <div class="text-h6 q-pa-lg" style="text-align:center;width:100% ">Es un gusto para nosotros el que seas parte de nuestra familia.     
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column q-pa-sm" v-if="$q.platform.is.mobile" style="width: 100vw; height:calc(100vh - 51px)">
                    <div class="col-1 text-h5 row justify-center items-center">Reproduce el siguiente video</div>
                    <q-video class="full-width" :ratio="16 / 9" src="https://www.youtube.com/embed/U3wwVAG-jzc" />
                    <div class=" col-1 text-h5 row justify-center items-center">
                        Recomendaciones
                    </div>
                    <div class="col">
                        <q-scroll-area style="width: 100%; height:100%; background-color:var(--gris4); border-radius:5px">
                            <ul class="lista q-pr-lg">
                                <b></b><br>
                                <li>Inicia tu sesión a esta plataforma desde <b>www.mimentebrillante.com</b> </li>
                                <li>En la sección de PROGRAMAS puedes acceder a los programas adquiridos y también a otros programas disponibles, En la parte superior derecha vas a encontrar un botón de reproducción donde puedes ver la demostración del funcionamiento del contenido de los programas. </li>
                                <li>Cada programa tiene un paso a paso el cual te guiara en el desarrollo de aprendizaje y practica.</li>
                                <li>Debes seguir los pasos según el cronograma de actividades para que tu proceso sea efectivo.</li>     
                            </ul>
                            <div class="text-h6 q-pa-lg" style="text-align:center;width:100% ">Es un gusto para nosotros que seas parte de nuestra familia.
                            </div>
                        </q-scroll-area>
                    </div>
                </div>
            </div>
    </div>
</template>
<template v-else>
    <q-spinner color="primary" size="3em" :thickness="4" />
</template></template>