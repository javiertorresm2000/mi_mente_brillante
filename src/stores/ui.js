import { defineStore } from "pinia";
import { ref } from 'vue';
import { useQuasar } from 'quasar'

export const useUIStore = defineStore('ui',{
    state:()=>{
        const q=useQuasar()
        const w1=window.visualViewport.width
        const h1=window.visualViewport.height
        return{
            p:q.platform,
            device:'',
            orientation:'',
            w:window.visualViewport.width,
            h:window.visualViewport.height,
            o:window.screen.orientation,
            tamw:w1+'px',
            tamh:h1+'px',
            dashboard:'',
            menu:true,
            menu_curso:false,
            carousel:ref()
        }
    },
    actions:{
        inicializar(){
            if(this.p.is.mobile){
                this.device='smartphone'
                if(this.o.type==='landscape-primary'){
                    if(this.h>480){
                    this.device='tablet'
                    }
                    this.orientation=this.o.type
                }
                else if(this.o.type=='portrait-primary'){
                    if(this.w>480){
                    this.device='tablet'
                    }
                    this.orientation=this.o.type
                }
            }
            else{
                this.device='desktop'
                this.orientation='landscape-primary'
            }
        },
        onResize(size){
    
            if(size.width>1024&&this.device=='desktop'){
                this.w=size.width
            }
            if(size.height>600&&this.device=='desktop'){
                this.h=window.visualViewport.height
            }
           
            if(this.orientation===this.o.type){
                this.tamw=this.w+'px'
                this.tamh=this.h+'px'
               
            }
            else{
                this.tamw=this.h+'px'
                this.tamh=this.w+'px'
                
                if(this.device!='desktop'){
                   
                    this.tamw=window.visualViewport.width+'px'
                    this.tamh=window.visualViewport.height+'px'
                }
            }
            
        }

    }
})