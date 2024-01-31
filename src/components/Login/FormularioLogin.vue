<script setup>
import { ref } from 'vue'
import { useUsuarioStore } from '../../stores/usuario';
import FormularioRegistro from './FormularioRegistro.vue'
import FormularioRestaurar from './FormularioRestaurar.vue'


const usuario = useUsuarioStore()

const props = defineProps({
    orientation: String,
    device: String
})
let user = ref('')
let registro = ref(false)
let restaurar = ref(false)
let pass = ref('')
let isPwd = ref(true)

function login(user, pass) {
    if (user == '' || pass == '') {
        usuario.usuario.error = true
        usuario.usuario.mensaje_error = 'Todos los campos son obligatorios'
    }
    else if (!isValidEmail(user)) {
        usuario.usuario.error = true
        usuario.usuario.mensaje_error = 'Email invalido'
    }

    else {
        usuario.login(user, pass)
    }

}

function isValidEmail(val) {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val);
}

</script>
<template>
    <q-card id="login" class="shadow-9 column q-pa-xl full-width justify-center redondeado-15 bg-azul2" style="gap: 20px;">
        <div class="col-1 text-h5 fuente-subtitulos text t-amarillo ">Iniciar Sesion</div>
        <div class="col column justify-center" style="gap:10px">
            <q-input dense filled bg-color="white" v-model="user" label="Correo electronico"
                :disable="usuario.usuario.loading" />
            <q-input v-model="pass" label="Contraseña" dense bg-color="white" filled :type="isPwd ? 'password' : 'text'"
                :disable="usuario.usuario.loading">
                <template v-slot:append>
                    <q-icon :name="isPwd ? 'fas fa-eye-slash' : 'fas fa-eye'" class="cursor-pointer" @click="isPwd = !isPwd"
                        size="20px" />
                </template>
            </q-input>
            <q-checkbox v-model="usuario.usuario.recordar" label="Recuerda mis datos"></q-checkbox>
            <q-btn class="full-width bg-amarillo text-white text-bold" label="Ingresar" v-on:click="login(user, pass)"
                :loading="usuario.usuario.loading">
            </q-btn>

        </div>

        <div class="col-2 column" style="gap:10px">
            <div class="col"><span class="texto-amarillo1" v-on:click="restaurar = true">Olvidaste tu contraseña? </span>
            </div>
        <br>
            <div class="col"> Si aun no tienes cuenta <span class="texto-amarillo1" v-on:click="registro=true">registrate en el siguiente botón </span></div>
            <q-btn class="full-width bg-azul0 texto-amarillo1 text-bold" label="Registrate aquí" v-on:click="registro=true"
                :loading="usuario.usuario.loading">
            </q-btn>
        </div>
    </q-card>
    <q-dialog persistent v-model="registro" transition-show="slide-up" transition-hide="slide-down">
        <formulario-registro></formulario-registro>
    </q-dialog>
    <q-dialog persistent v-model="restaurar" transition-show="slide-up" transition-hide="slide-down">
        <formulario-restaurar></formulario-restaurar>
    </q-dialog>
    <q-dialog v-model="usuario.usuario.error">
        <q-card class="q-pa-lg bg-amarillo text-black row items-center" style="gap: 15px; border-radius: 10px;">
            <q-icon name='fas fa-exclamation-triangle' size='20px' />{{ usuario.usuario.mensaje_error }}
        </q-card>
    </q-dialog>
</template>