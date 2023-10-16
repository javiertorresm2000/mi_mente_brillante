<script setup>

import { ref } from 'vue';
import { useUIStore } from '../../stores/ui';
import { useUsuarioStore } from '../../stores/usuario';

const ui=useUIStore()
const usuario=useUsuarioStore()

let estiloReg=ref('')
usuario.usuario.restaurar_p1=true


let mail=ref('')
let mailerror=ref(false)
let code=ref('')
let codeerror=ref(false)
let mensaje=ref('')
let password=ref('')
let password1=ref('')

if(ui.device=='smartphone'&&ui.orientation=='portrait-primary'){
    
    estiloReg.value='width:100vw; padding-bottom:40px'
}
else if(ui.device=='tablet'&& ui.orientation=='landscape-primary'){
    estiloReg.value='width:calc((100vw / 12) * 4)'
   
}
else if(ui.device=='tablet'&& ui.orientation=='portrait-primary'){
    estiloReg.value='width:calc((100vw / 12) * 9); padding:50px'
    
}
else{
    estiloReg.value='width:calc((100vw / 12) * 4); padding:50px'
   
}

function enviarMail(value){
    
    if(isValidEmail(value)){
        usuario.usuario.loading2=true
        usuario.enviarCodigo(value)
        usuario.usuario.restaurar_p1=false
        usuario.usuario.restaurar_p2=true
        usuario.usuario.restaurar_p3=false
    }
    else{
        mailerror.value=true
        mensaje.value='Email invalido'
    }
    
}
function isValidEmail (val) {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || 'Email invalido';
  }

function verificarCodigo(){
    

    if(code.value==''){
        codeerror.value=true
        mensaje.value='El codigo es obligatorio'
    }
    else{
        usuario.usuario.loading2=true
        usuario.verificarCodigo(mail.value,code.value)
        usuario.usuario.restaurar_p1=false
        usuario.usuario.restaurar_p2=false
        usuario.usuario.restaurar_p3=true
    }
    loading.value=true
    paso1.value=false
    paso2.value=false
    paso3.value=true
    setTimeout(()=>{
        if(code.value=='0'){
            paso1.value=false
            paso2.value=true
            paso3.value=false
            mensaje.value='El codigo es incorrecto'
            codeerror.value=true
            mailerror.value=false
        }
        loading.value=false
    },'5000')
}

function cambiarPass(){
    if(password.value!=''&&password1.value!=''){
        if(password.value==password1.value){
            usuario.usuario.loading2=true
            usuario.cambiarPassword(mail.value,password.value,code.value)
        }
        else{
            usuario.usuario.reg_error_mail=true
            mensaje.value='Las contraseñas no coinciden'
        }
    }
    else{
        usuario.usuario.reg_error_mail=true
        mensaje.value='Las contraseñas son obligatorias'
    }
    
}
</script>
<template>
  <q-card class="bg-azul0 q-pa-lg column no-wrap amarillo" style="border-radius: 15px; gap:20px; background-color: #28363D;" :style="estiloReg" >
    <q-btn icon="fa fa-times-circle" color="white" flat round dense v-close-popup size="10px" style="position: absolute; top: 10px; right:10px" v-on:click="usuario.logout" />
    <div class="col-1 row items-center q-pb-none" style="position: relative;">
        <div class=" text-h5 fuente-subtitulos text-bold t-amarillo ">Restaurar contraseña</div>
    </div>
    <div class="col column" style="gap:15px" v-if="usuario.usuario.restaurar_p1">
        <div class="text-white">Ingresa el correo asociado con tu cuenta.</div>
        <div class="col-11 column no-wrap" style="gap: 10px;">
            <q-input dense outlined v-model="mail" label="Correo" bg-color="white" debounce="1500" :rules="[val => !!val || 'Dato requerido', isValidEmail,]" :disable="usuario.usuario.loading2" >
            <template v-slot:error>
                    {{mensaje}}
                </template>
        </q-input>

        </div>
        <div class="col-1">
            <q-btn class="full-width bg-amarillo text-white"  label="Restablecer contraseña" v-on:click="enviarMail(mail)"></q-btn>
        </div>
    </div>
    <div class="col column" v-if="usuario.usuario.restaurar_p2">
        <div class="row items-center " style="gap:20px" v-if="usuario.usuario.loading2">
            <q-spinner
                color="primary"
                size="2em"
                :thickness="3"
                />
            <div class="text-white">Enviando correo...</div>
        </div>
        <div v-else class="column" style="gap: 15px;">
            <div class="text-white">Ingresa el codigo enviado a tu correo.</div>
            <div class="col-11 column no-wrap" style="gap: 10px;">
                <q-input dense outlined v-model="code"  bg-color="white" style="width: 70%;" :error="codeerror" :rules="[ val => val.length <= 4 || '4 numeros como maximo' ]">
                    <template v-slot:error>
                    {{mensaje}}
                </template>
                </q-input>
            </div>
            <div class="col-1">
                <q-btn class="full-width bg-amarillo text-white"  label="Verificar codigo" v-on:click="usuario.verificarCodigo(mail,code)"></q-btn>
            </div>
        </div>
        

    </div>
    <div class="col column" v-if="usuario.usuario.restaurar_p3">
        <div class="row items-center " style="gap:20px" v-if="usuario.usuario.loading2">
            <q-spinner
                color="primary"
                size="2em"
                :thickness="3"
                />
            <div class="text-white">Verificando codigo...</div>
        </div>
        <div v-else class="column" style="gap: 15px;">
            <div class="text-white">Ingresa tu nueva contraseña.</div>
            <div class="col-11 column no-wrap" style="gap: 10px;">
                <q-input dense outlined v-model="password" bg-color="white" label="Contraseña"  />
                <q-input dense outlined v-model="password1" bg-color="white" label="Repetir contraseña"  />
            </div>
            <div class="col-1">
                <q-btn class="full-width bg-amarillo text-white"  label="Cambiar contraseña" v-on:click="cambiarPass"></q-btn>
            </div>
        </div>
        

    </div>
    <div class="col column" v-if="usuario.usuario.restaurar_p4">
        <div class="row items-center " style="gap:20px" v-if="usuario.usuario.loading2">
            <q-spinner
                color="primary"
                size="2em"
                :thickness="3"
                />
            <div class="text-white">Cambiando contraseña...</div>
        </div>
        <div v-else class="column" style="gap: 15px;">
            <div class="text-white">Cambio de contraseña exitoso.</div>
        </div>
        

    </div>

</q-card>
<q-dialog   v-model="usuario.usuario.reg_error_mail" @hide="usuario.usuario.loading2=false">
    <q-card class="q-pa-md bg-amarillo text-black" style="border-radius: 15px;">
         {{usuario.usuario.mensaje_error}}
    </q-card>
</q-dialog>
</template>