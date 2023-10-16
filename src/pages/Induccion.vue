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
                            <q-video class="full-width" :ratio="16 / 9" src="https://www.youtube.com/embed/4ChLs7ynBZg" />
                        </div>

                    </div>
                    <q-separator vertical size="2px" style="background-color:var(--primario)" />
                    <div class="col " style="height: 100%;">
                        <div class="text-h5 fuente-subtitulos q-pb-lg">Instrucciones</div>
                        <div>
                            <ul class="lista q-pr-lg">
                                <li>En el menú principal izquierdo puedes acceder a todas las secciones.</li>
                                <li>PROGRAMAS: Contiene los cursos adquiridos y también los cursos disponibles, en la parte
                                    superior derecha vas a encontrar un botón de demostración del funcionamiento del
                                    contenido.</li>
                                <li>Cuando ingresas a un curso, vas a encontrar la sección de video, ebook y audiolibro,
                                    elige como quieres comenzar tu aprendizaje.</li>
                                <li>Puedes aprender a través de videos ilustrados, ebooks o audiolibros, los tres formatos
                                    tienen el mismo contenido.</li>
                                <li>Nuestro método principal es la retroalimentación, por eso te recomendamos estudiar el
                                    material en todos los formatos, de esa forma tu aprendizaje en la práctica va a ser más
                                    eficiente.</li>
                                <li>COACHING: Contiene un programa gratuito de capacitación y programación neurolingüística
                                    enfocada al área comercial. Solo con estar registrado puedes acceder a este programa.
                                </li>
                                <li>CONFIGURACIÓN: contiene tus datos de registro.</li>
                            </ul>
                            <div class="text-h6 q-pa-lg" style="text-align:center;width:100% ">Es un placer tenerte aqui
                                ¡Bienvenid@!</div>
                        </div>
                    </div>
                </div>
                <div class="column q-pa-sm" v-if="$q.platform.is.mobile" style="width: 100vw; height:calc(100vh - 51px)">
                    <div class="col-1 text-h5 row justify-center items-center">"Mira lo facil que funciona"</div>
                    <q-video class="full-width" :ratio="16 / 9" src="https://www.youtube.com/embed/4ChLs7ynBZg" />
                    <div class=" col-1 text-h5 row justify-center items-center">
                        Instrucciones
                    </div>
                    <div class="col">
                        <q-scroll-area style="width: 100%; height:100%; background-color:var(--gris4); border-radius:5px">
                            <ul class="lista q-pr-lg">
                                <li>En el menú principal izquierdo puedes acceder a todas las secciones.</li>
                                <li>PROGRAMAS: Contiene los cursos adquiridos y también los cursos disponibles, en la parte
                                    superior derecha vas a encontrar un botón de demostración del funcionamiento del
                                    contenido.</li>
                                <li>Cuando ingresas a un curso, vas a encontrar la sección de video, ebook y audiolibro,
                                    elige como quieres comenzar tu aprendizaje.</li>
                                <li>Puedes aprender a través de videos ilustrados, ebooks o audiolibros, los tres formatos
                                    tienen el mismo contenido.</li>
                                <li>Nuestro método principal es la retroalimentación, por eso te recomendamos estudiar el
                                    material en todos los formatos, de esa forma tu aprendizaje en la práctica va a ser más
                                    eficiente.</li>
                                <li>COACHING: Contiene un programa gratuito de capacitación y programación neurolingüística
                                    enfocada al área comercial. Solo con estar registrado puedes acceder a este programa.
                                </li>
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
    </template>
</template>