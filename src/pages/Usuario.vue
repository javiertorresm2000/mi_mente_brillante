<script setup>
import '../css/usuario.css'
import { useUsuarioStore } from '../stores/usuario';
const usuario = useUsuarioStore()
const TEXTOS = {
    'usuario': {
        'rol': 'usuario',
        'icono': 'fas fa-exclamation',
        'titulo': `Bienvenido a nuestra familia`,
        'texto0': `Cuando obtienes un programa <b>tienes acceso ilimitado con un solo pago</b>, puedes acceder al contenido desde tu laptop o desde tu teléfono móvil.<br><br>
                         La eficiencia del proceso <b>depende de tu disciplina y constancia con el desarrollo de cada paso</b>, sabemos que si estas aquí es por que estas decidido a tomar acción para cambiar el rumbo de tu vida :)<br><br>
                         Si desarrollas cada programa que adquieres según el paso a paso y el cronograma de actividades; en las primeras semanas vas a comenzar a experimentar cambios positivos internos, principalmente en tu estado de animo y voluntad.`,

        'texto1': `Próximamente <b>podrás vincularte como embajador o asesor externo</b> donde a través de un código podrás recomendar nuestros programas y ganar comisiones por ventas.`
    },
    'cliente': {
        'rol': 'cliente',
        'icono': 'fas fa-exclamation',
        'titulo': `Bienvenido a nuestra familia`,
        'texto0': `Ahora perteneces a familia <b>Web Market Company.</b><br> Estamos complacidos por acompañarte en tu proceso de aprendizaje y nuestra satisfacción será aportar en tu crecimiento y conocimiento en el area <b>comercial</b>`,
        'texto1': `Puedes compartir tu codigo de Cliente a personas que quieran adquirir el programa y asi puedes obtener una ganancia del <b>15%</b> por cada venta`
    },
    'embajador': {
        'rol': 'embajador',
        'icono': 'fas fa-exclamation',
        'titulo': `Bienvenido a nuestro equipo`,
        'texto0': `Como embajador ademas de <b>tener acceso a la sección de coaching en el menú principal</b>, tambien puedes acceder a orientaciones y capacitaciones en temas comerciales`,
        'texto1': `Puedes compartir tu codigo de Embajador a personas que quieran adquirir el programa y asi puedes obtener una ganancia del <b>20%</b> por cada venta`
    },
    'partner': {
        'rol': 'partner',
        'icono': 'fas fa-exclamation',
        'titulo': `Eres parte de WMC`,
        'texto0': `Como socio externo, ya eres nuestro mejor aliado y puedes aportar en el crecimiento de la compañía <b>colaborando en estrategias de gestión comercial, apoyo de logistica en organizacion de actividades y planificacion de mercadeo</b>`,
        'texto1': `Puedes compartir tu codigo de Partner a personas que quieran adquirir nuestros productos vas puedes obtener una ganancia de <b>40%</b> por cada venta`
    },
    'coach': {
        'rol': 'coach',
        'titulo': `Preparado para enseñar`,
        'icono': 'fas fa-question',
        'texto0': `Gracias por pertenecer a nuestro equipo de entrenadores y aportar tu talento y conocimiento para <b>ayudar a formar personas con deseos de crecer comercial y financieramente.</b>`,
        'texto1': `Puedes compartir tu codigo de Coach a personas que quieran adquirir nuestros productos y asi npuedes obtener una ganancia del <b>30%</b> por cada venta`
    }
}
const textos = TEXTOS[usuario.usuario.rol] || TEXTOS['usuario']

</script>
<template>
    <div class="row justify-center bg-usuarios" style="height:calc(100vh - 51px)" v-if="$q.platform.is.desktop">
        <div class="col-10">
            <div class="column fit">
                <div class="col-9">
                    <div class="row fit">
                        <div class="col">
                            <div class="column fit">
                                <div class="col-3 gris3-fg text-h2 alinear-bottom fuente-titulos">
                                    {{ usuario.usuario.rol }}
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="column fit">
                                <div class="col-7 alinear-center q-pl-xl" style="gap:20px">
                                    <div class="text-h5 fuente-subtitulos" style="position:relative">
                                        {{ textos.titulo }}<q-icon class="texto-amarillo1 icono-admiracion"
                                            style="font-size:1.5em" :name="textos.icono" /></div>
                                    <p v-html="textos.texto0"></p>
                                </div>
                                <div class="col q-pl-xl">
                                    <div class="row alinear-center-full ">

                                        <div class="col-8 q-pa-sm separador" v-html="textos.texto1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row justify-center">
                        <div class="col-6">
                            <div class="codigo-usuario">
                                <span>Codigo:</span>
                                <q-input filled dense readonly />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="row" v-if="$q.platform.is.mobile"
        style="height:calc(100vh - 51px); width:100%; background-image: url('/src/img/Cover-usuarios.jpg'); background-size:130vh; background-position-y: 30vh; background-repeat: no-repeat;">
        <q-scroll-area style="height: 100%; width:100% ">
            <div class="column q-pa-lg" style="gap:30px">
                <div class="text-h3 fuente-titulos gris3-fg"> {{ textos.rol }}</div>
                <div class="text-h5 fuente-subtitulos" style="position: relative;">
                    {{ textos.titulo }}
                    <q-icon class="texto-amarillo1 icono-admiracion" style="font-size:1.5em" :name="textos.icono" />
                </div>
                <div class="bg-white" v-html="textos.texto0"></div>
                <div class="col-8 q-pa-sm separador" v-html="textos.texto1"
                    style=" background-color: rgba(255, 255, 255, 0.95);"></div>
                <div class="codigo-usuario q-pa-md bg-white shadow-7" style="border-radius: 10px;">
                    <span>Codigo:</span>
                    <q-input filled dense readonly />
                </div>
            </div>
        </q-scroll-area>
    </div>
</template>