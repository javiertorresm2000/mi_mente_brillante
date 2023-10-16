<script setup>
import '../css/programas.css'
import { useUIStore } from '../stores/ui';

const ui=useUIStore()
ui.menu_curso=false
</script>
<template>
   <div class="row justify-center pagina-full">
        <div class="col-10">
            <div class="column" style="height: 100%;">
                <div class="row col-1">
                    <div class="col">col 1</div>
                    <div class="col">col 2</div>
                </div>
                <div class="row col">
                    <div class=" row q-gutter-sm">
                        
                        <div class="col-5">
                        <q-card>
                        <q-card-section horizontal>
                            <q-card-section>
                            Texto
                            </q-card-section>

                            <q-img
                            class="col-5"
                            src="https://cdn.quasar.dev/img/parallax2.jpg"
                            />
                        </q-card-section>
                        </q-card>
                        </div>
                        <div class="col-5">2</div>
                        <div class="col-6">2</div>
                        <div class="col-6">2</div>
                    </div>
                </div>
            </div>
        </div>
   </div> 
</template>