<script setup>
import { ref } from 'vue';
import { useUsuarioStore } from '../stores/usuario';

const usuario=useUsuarioStore()


const user=ref('')
const pass=ref('')
const check=ref(false)

</script>
<template>
   <div class="column q-pa-lg " style="gap: 20px;">
                    
                        <div class="text-h5 texto-amarillo1">Iniciar Sesion</div>
                    
                    
                        <q-input dense outlined v-model="user" label="Correo electronico" class="bg-white" />
                        <q-input dense outlined v-model="pass" label="Contraseña" class="bg-white" />
                        <q-checkbox v-model="check" label="Recuerda mis datos"></q-checkbox>
                         <q-btn class="full-width bg-amarillo text-white"  label="Ingresar" v-on:click="usuario.login(user,pass)"></q-btn>
                    <div><a href="#">Olvidaste tu contraseña?</a></div>
                   <div> Si aun no tienes cuenta <span class="texto-amarillo1" v-on:click="cambiarPagina('register')">registrate aqui </span></div>
                    

                    
                </div>
</template>