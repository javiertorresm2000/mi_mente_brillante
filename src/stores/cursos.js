import { defineStore } from "pinia";
import {useUsuarioStore} from './usuario'
import { useUIStore } from './ui';

const usuario=useUsuarioStore()
const ui=useUIStore()

export const useCursosStore = defineStore("cursos",{
    state: ()=>{
        return {
            cursos:[{
                titulo:'',
                id:0,
                thumb:'',
                modulo:'',
                adquirido:false,
                stepsTotal:0,
                stepsCompleted:0,
                lastStep:0,
                categoria:'',
                url_compra:''
            }],
            usuario:usuario,
            mensaje:'',
            error:false,
            loading:false,
            menu_curso:false,
            total_adquiridos:0,
            cursoActual:
                {
                    id:0,
                    titulo:'',
                    stepsCompleted:0,
                    lecciones:[
                        {
                            id:0,
                            titulo:'',
                            categoria:'',
                            imagenes:[
                                {
                                    id:0,
                                    url:'',
                                    thumb:''
                                }
                            ],
                            video_url:'',
                            audio_url:'',
                            caratula_audio:'',
                            topicos:[
                                {
                                    id:0,
                                    titulo:'',
                                    imagenes:[
                                        {
                                            id:0,
                                            url:'',
                                            thumb:''
                                        }
                                    ],
                                    video_url:'',
                                    audio_url:'',
                                    caratula_audio:'',
                                }
                            ]
                        }
                    ]
                }
            
        }
    },
    actions:{
         obtenerCursos(){
            this.loading=true
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+usuario.usuario.token);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
              };

            fetch("https://backend.mimentebrillante.com/wp-json/ldlms/v2/sfwd-courses", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res=JSON.parse(result)
                if(res.error){
                    this.mensaje='Error obteniendo datos del servidor, intente nuevamente'
                    this.error=true
                    this.loading=false
                }
                else{
                    
                    this.cursos=res.map(function(curs){
                        return {
                        
                            titulo:curs.title.rendered,
                            id:curs.id,
                            thumb:curs.better_featured_image.media_details.sizes.medium.source_url,
                            modulo:curs.acf.modulo,
                            adquirido:false,
                            stepsTotal:0,
                            stepsCompleted:0,
                            lastStep:0,
                            categoria:curs.ld_course_category[0],
                            url_compra:curs.acf.url_compra
                            
                        }
                    })
                    console.log(this.cursos)
                    this.obtenerCursosUsuario()


                }

            })
            
            .catch(error => console.log('error', error));
        },
        obtenerCursosUsuario(){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+usuario.usuario.token);
            
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            
            fetch("https://backend.mimentebrillante.com/wp-json/ldlms/v2/users/"+usuario.usuario.id+"/courses", requestOptions)
              .then(response => response.text())
              .then(result => {
                const res=JSON.parse(result)
                if(res.error){
                    this.mensaje='Error obteniendo datos del servidor, intente nuevamente'
                    this.error=true
                    this.loading=false
                }
                else{
                    let contado=0
                    this.cursos.forEach(function(c){
                        res.forEach(function(cu){
                            
                            if(c.id===cu.id){
                                contado++
                                c.adquirido=true
                            }
                            
                        })
                    }
                   
                    )
                    this.total_adquiridos=contado
                    this.obtenerProgreso()
                }
              })
              .catch(error => console.log('error', error));
        },
        obtenerProgreso(){
            
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+usuario.usuario.token);

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch("https://backend.mimentebrillante.com/wp-json/ldlms/v2/users/"+usuario.usuario.id+"/course-progress", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res=JSON.parse(result)
                if(res.error){
                    this.mensaje='Error obteniendo datos del servidor, intente nuevamente'
                    this.error=true
                    this.loading=false
                }
                else{
                    this.loading=false
                    this.cursos.forEach(function(c){
                        res.forEach(function(cu){
                            
                            if(c.id===cu.course){
                                c.stepsTotal=cu.steps_total
                                c.stepsCompleted=cu.steps_completed
                                c.lastStep=cu.last_step
                            }
                            
                        })
                    })
                    
                    
                }
            })
            .catch(error => console.log('error', error));
        },
        cargarCurso(id){
            this.loading=true
           
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+usuario.usuario.token);
          
            
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            
            fetch("https://backend.mimentebrillante.com/wp-json/ldlms/v2/sfwd-lessons?course="+id, requestOptions)
              .then(response => response.text())
              .then(result => {
                const res=JSON.parse(result)
                if(res.error){
                    this.mensaje='Error obteniendo datos del servidor, intente nuevamente'
                    this.error=true
                    this.loading=false
                }
                else{
                    
                    
                    this.cursoActual.id=id
                    this.cursoActual.titulo=this.cursos.find(function(c){
                        return c.id===id
                    }).titulo
                    this.cursoActual.lecciones=res.map(function(leccion){

                       
                       if(leccion.acf.imagenes){
                        console.log(leccion.acf)

                        return {
                            id:leccion.id,
                            titulo:leccion.title.rendered,
                            categoria:leccion.ld_lesson_category[0],
                            topicos:[],
                            imagenes:leccion.acf.imagenes.map(function(imagen){
                                return {
                                   
                                    url:imagen,
                                    thumb:imagen
                                }
                            }),
                            video_url:leccion.acf.video,
                            audio_url:leccion.acf.audio,
                            caratula_audio:leccion.acf.caratula_audio,
                            
                        }
                    }else{
                        
                        return {
                            id:leccion.id,
                            titulo:leccion.title.rendered,
                            categoria:leccion.ld_lesson_category[0],
                            topicos:[],
                            video_url:leccion.acf.video,
                            audio_url:leccion.acf.audio,
                            caratula_audio:leccion.acf.caratula_audio,
                        }
                    }
                    
                    })
                    console.log(this.cursoActual)
                    this.cargarTopicos() 
                }
              })
              .catch(error => console.log('error', error));
        },
        cargarTopicos(){
            
         
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+usuario.usuario.token);

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
            
            Promise.all(this.cursoActual.lecciones.map(lec => 
                fetch("https://backend.mimentebrillante.com/wp-json/ldlms/v2/sfwd-topic?course="+this.cursoActual.id+"&lesson="+lec.id, requestOptions)
            .then(response => response.text()).then(result => {
                const res=JSON.parse(result)
               
                if(res.error){
                    this.mensaje='Error obteniendo datos del servidor, intente nuevamente'
                    this.error=true
                    this.loading=false
                }
                else{
                    
                    if(res.length>0){
                        lec.topicos=res.map(function(topico){
                            if(topico.acf.imagenes){
                                return {
                                    id:topico.id,
                                    titulo:topico.title.rendered,
                                    categoria:topico.ld_topic_category[0],
                                    imagenes:topico.acf.imagenes.map(function(imagen){
                                        return {
                                            
                                            url:imagen,
                                            thumb:imagen
                                        }
                                    }),
                                    video_url:topico.acf.video,
                                    audio_url:topico.acf.audio,
                                    caratula_audio:topico.acf.caratula_audio,
                                }
                            }else{
                                return {
                                    id:topico.id,
                                    titulo:topico.title.rendered,
                                    categoria:topico.ld_topic_category[0],
                                    imagenes:[],
                                }
                            }
                            
                        })
                    }
                    else{
                        lec.topicos=[]
                    }
                    
                }
            })
                ))
                .then(result=>{
                    this.loading=false
                    setTimeout(()=>{
                        ui.menu_curso=true
                    },2000)
                })

            // fetch("httpss://backend.wmarketcompany.com/wp-json/ldlms/v2/sfwd-topic?course="+this.cursoActual.id, requestOptions)
            // .then(response => response.text())
            // .then(result => {
            //     const res=JSON.parse(result)
                
            //     if(res.error){
            //         this.mensaje='Error obteniendo datos del servidor, intente nuevamente'
            //         this.error=true
            //         this.loading=false
            //     }
            //     else{
            //         topicos=res.map(function(topico){
            //             return{
            //                 id:topico.id,
            //                 titulo:topico.title.rendered,
            //                 leccion:topico.lesson,
            //             }
            //         })
            //         this.cursoActual.lecciones.forEach(function(leccion){
            //             for(let i=0;i<topicos.length;i++){
            //                 if(leccion.id===topicos[i].leccion){
                                
            //                     leccion.topicos.push(topicos[i])
            //                 }
                            
            //             }
            //         })
                    
            //     }
                
            // })
            // .catch(error => console.log('error', error));
        }
   
       
    }
})