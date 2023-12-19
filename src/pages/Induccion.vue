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
                            <div class="text-h5 fuente-subtitulos q-pb-lg">"Mira lo facil que funciona"</div>
                            <q-video class="full-width" :ratio="16 / 9" src="https://www.youtube.com/embed/U3wwVAG-jzc" />
                        </div>

                    </div>
                    <q-separator vertical size="2px" style="background-color:var(--primario)" />
                    <div class="col " style="height: 100%;">
                        <div class="text-h5 fuente-subtitulos q-pb-lg">Instrucciones</div>
                        <div>
                            <ul class="lista q-pr-lg">
                                En el menú principal izquierdo puedes acceder a todas las secciones.
                                <li>PROGRAMAS: Contiene los Programas adquiridos y también otros programas disponibles,
                                    en la parte superior derecha vas a encontrar un botón de demostración del funcionamiento
                                    del contenido.</li>
                                <li>SOCIAL MEDIA: Contiene un los medios sociales donde puedes acceder y encontrar material
                                    de interés,
                                    relacionado a los programas que se ofrecen en esta plataforma.</li>
                                <li>USUARIO: encuentras información sobre el tipo de usuario que eres y a lo que tienes
                                    acceso</li>
                                <li>CONFIGURACIÓN: contiene tus datos de registro.</li>
                            </ul>
                            <div class="text-h6 q-pa-lg" style="text-align:center;width:100% ">Es un placer tenerte aquí -
                                <b>Bienvenid@</b>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column q-pa-sm" v-if="$q.platform.is.mobile" style="width: 100vw; height:calc(100vh - 51px)">
                    <div class="col-1 text-h5 row justify-center items-center">"Mira lo facil que funciona"</div>
                    <q-video class="full-width" :ratio="16 / 9" src="https://www.youtube.com/embed/U3wwVAG-jzc" />
                    <div class=" col-1 text-h5 row justify-center items-center">
                        Instrucciones
                    </div>
                    <div class="col">
                        <q-scroll-area style="width: 100%; height:100%; background-color:var(--gris4); border-radius:5px">
                            <ul class="lista q-pr-lg">
                                En el menú principal izquierdo puedes acceder a todas las secciones.
                                <li>PROGRAMAS: Contiene los Programas adquiridos y también otros programas disponibles,
                                    en la parte superior derecha vas a encontrar un botón de demostración del funcionamiento
                                    del contenido.</li>
                                <li>SOCIAL MEDIA: Contiene un los medios sociales donde puedes acceder y encontrar material
                                    de interés,
                                    relacionado a los programas que se ofrecen en esta plataforma.</li>
                                <li>USUARIO: encuentras información sobre el tipo de usuario que eres y a lo que tienes
                                    acceso</li>
                                <li>CONFIGURACIÓN: contiene tus datos de registro.</li>
                            </ul>
                            <div class="text-h6 q-pa-lg" style="text-align:center;width:100% ">Es un placer tenerte aqui
                                ¡Bienvenid@!</div>
                        </q-scroll-area>
                    </div>
                </div>
            </div>
    </div>
</template>
<template v-else>
    <q-spinner color="primary" size="3em" :thickness="4" />
</template></template>