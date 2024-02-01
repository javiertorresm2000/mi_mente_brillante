<script setup>
import { ref } from 'vue';
import { useUIStore } from '../../stores/ui';
import { useUsuarioStore } from '../../stores/usuario';
import router from '../../routes/routes';

const usuario = useUsuarioStore()
const ui = useUIStore()
let sexo = ref('')
let estiloReg = ref('')
let nombre = ref('')
let acceptTerms = ref(false)
let acceptTermsError = ref(false)
let acceptTermsErrorMessage = ref('')
let apellido = ref('')
let mail = ref('')
let ciudad = ref('')
let isPwd = ref(true)
let isPwd1 = ref(true)
let pass1 = ref('')
let pass2 = ref('')
let error = ref(false)
let mensaje = ref('')
let mailError = ref(false)
let options = [
    {
        label: 'M',
        value: 'M'
    },
    {
        label: 'F',
        value: 'F'
    }
]
let group = ref()
if (ui.device == 'smartphone' && ui.orientation == 'portrait-primary') {

    estiloReg.value = 'width:100vw; padding-bottom:40px'
}
else if (ui.device == 'tablet' && ui.orientation == 'landscape-primary') {
    estiloReg.value = 'width:calc((100vw / 12) * 4)'

}
else if (ui.device == 'tablet' && ui.orientation == 'portrait-primary') {
    estiloReg.value = 'width:calc((100vw / 12) * 9); padding:50px'

}
else {
    estiloReg.value = 'width:calc((100vw / 12) * 4); padding:50px'

}

function registro() {
    error.value = false
    acceptTermsError.value = false
    if (nombre.value == '' || apellido.value == '' || mail.value == '' || pass1.value == '' || pass2.value == '') {
        usuario.usuario.reg_error_mail = true
        usuario.usuario.mensaje_error = 'Todos los campos son obligatorios'
    }
    else if (pass1.value != pass2.value) {
        error.value = true
        mensaje.value = 'Las contraseñas no coinciden'
    }
    else if (!acceptTerms.value) {
        acceptTermsError.value = true
        acceptTermsErrorMessage.value = 'Acepta los términos de uso'
    }
    else {
        usuario.registrarUsuario(nombre.value, apellido.value, mail.value, pass1.value, ciudad.value, sexo.value)
    }
}

function isValidEmail(val) {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || 'Email invalido';
}


</script>
<template>
    <!-- <q-card class="q-pa-lg column no-wrap amarillo" style="border-radius: 15px; gap:20px; background-color: #063343;" :style="estiloReg"> -->
    <q-card id="login" class="shadow-9 column q-pa-xl full-width justify-center redondeado-15 bg-azul2" style="gap: 20px;">
        <!-- <q-btn icon="fa fa-times-circle" color="white" flat round dense v-close-popup size="10px"
            style="position: absolute; top: 10px; right:10px" v-on:click="usuario.logout" /> -->
        <!--<q-btn v-if="$q.platform.is.mobile" icon="fa fa-times-circle" color="white" flat round dense v-close-popup size="10px" style="position: absolute; top: 10px; right:10px" v-on:click="usuario.logout"/>-->
        <div class="col-1 row items-center q-pb-none" style="position: relative;">
            <div class=" text-h5 fuente-subtitulos text t-amarillo ">Registro</div>
        </div>


        <div class="column no-wrap" style="gap: 10px;" v-if="!usuario.usuario.reg_success">
            <div class="text-white">Ingresa tus datos para registrarte.</div>
            <div class="row" style="gap:10px">
                <q-input class="col" dense outlined v-model="nombre" label="Nombre" bg-color="white"
                    :rules="[val => !!val || 'Dato requerido']" :disable="usuario.usuario.loading1" />
                <q-input class="col" dense outlined v-model="apellido" label="Apellido" bg-color="white"
                    :rules="[val => !!val || 'Dato requerido']" :disable="usuario.usuario.loading1" />
            </div>
            <!-- <div class="row" style="gap:10px;">
                <div class="row items-center " style="width: 40%;">
                    <div class="col-3" style="color: white;">Sexo</div>
                    <q-option-group
                    v-model="sexo"
                    :options="options"
                    color="bg-amarillo"
                    dark
                    inline
                    dense
                    
                    style="color: white;"
                    />
                </div> 
                    
                    <q-input class="col" dense outlined v-model="ciudad" label="Ciudad o region" bg-color="white" :rules="[val => !!val || 'Dato requerido']" :disable="usuario.usuario.loading1" />  
                </div> -->
            <q-input dense outlined v-model="mail" label="Correo" bg-color="white" debounce="1500" :error="mailError"
                :rules="[val => !!val || 'Dato requerido', isValidEmail,]" :disable="usuario.usuario.loading1">
                <template v-slot:error>
                    {{ mensaje }}
                </template>
            </q-input>

            <q-input v-model="pass2" outlined :type="isPwd1 ? 'password' : 'text'" label="Contraseña" dense bg-color="white"
                :disable="usuario.usuario.loading1">
                <template v-slot:append>
                    <q-icon :name="isPwd1 ? 'fas fa-eye-slash' : 'fas fa-eye'" class="cursor-pointer"
                        @click="isPwd1 = !isPwd1" size="20px" />
                </template>

            </q-input>
            <q-input v-model="pass1" outlined :type="isPwd ? 'password' : 'text'" label="Repetir contraseña " dense
                bg-color="white" :error="error" :disable="usuario.usuario.loading1">
                <template v-slot:append>
                    <q-icon :name="isPwd ? 'fas fa-eye-slash' : 'fas fa-eye'" class="cursor-pointer" @click="isPwd = !isPwd"
                        size="20px" />
                </template>
                <template v-slot:error>
                    {{ mensaje }}
                </template>
            </q-input>
            <div style="display: flex; align-items: center;">
                <q-checkbox v-model="acceptTerms" keep-color color="primary" />
                <a style="color:#ffffff;" class="texto">Acepto &nbsp</a>
                <a style="color:#a6a6a6;" href="https://mimentebrillante.com/terminos.html" target="_blank"
                    class="texto-amarillo1">términos de uso</a>
            </div>
            <template v-if="acceptTermsError">
                <span style="color: red;">
                    {{ acceptTermsErrorMessage }}
                </span>
            </template>
            <q-btn class="full-width bg-amarillo text-white" label="Registrarme" v-on:click="registro"
                :loading="usuario.usuario.loading1" :disable="usuario.usuario.loading1"></q-btn>
            <br>
            <div class="col"> Si ya tienes cuenta da click en el siguiente botón</div>
            <q-btn class="full-width bg-azul0 texto-amarillo1 text-bold" label="Iniciar sesión" v-on:click="() => router.push('/school')"
                :loading="usuario.usuario.loading">
            </q-btn>
        </div>
        <div v-else class="row" style="gap:15px">
            <q-spinner color="primary" size="3em" :thickness="3" />
            <div class=" col text-white">Usuario {{ mail }} registrado satisfactoriamente! Iniciando sesion...</div>
        </div>
    </q-card>
    <q-dialog v-model="usuario.usuario.reg_error_mail" @hide="usuario.usuario.loading1 = false">
        <q-card class="q-pa-md bg-amarillo text-black" style="border-radius: 15px;">
            {{ usuario.usuario.mensaje_error }}
        </q-card>
    </q-dialog>
</template>