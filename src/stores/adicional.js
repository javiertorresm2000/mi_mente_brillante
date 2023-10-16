import { defineStore } from "pinia";
import {useUsuarioStore} from './usuario';

const usuario=useUsuarioStore();

export const useAdicionalStore = defineStore("adicional",{

    state:()=>{
        return{
            loading:false,
            error:false,
            mensaje:'',
            induccion_izq:{
                video_url:'',
                titulo:'',
            },
            induccion_der:{
                titulo:'',
                descripcion:''
            },
            cursos:[
                {
                    titulo:'',
                    id:0,
                    thumb:'',
                    modulo:'',
                    adquirido:false,
                    categoria:'',
                    descripcion:'',
                }
            ],
           
            coaching_ventas_capacitacion:[
                
                    {
                        titulo:'',
                        descripcion:'',
                        thumbnail:'',
                        url:''
                    }
                
            ],
            coaching_ventas_derecha:[
                {
                    titulo:'',
                    descripcion:'',
                    thumbnail:'',
                    url:'',
                    id:''
                }
            ],
            coaching_conferencias:{
                titulo:'',
                descripcion:'',
            },
            coaching_conferencias_videos:[
                
                    {
                        titulo:'',
                        descripcion:'',
                        thumbnail:'',
                        url:''
                    }
                
            ],
            coaching_PNL_izquierda:{
                titulo:'',
                contenido:[
                    {
                        titulo:'',
                        descripcion:'',
                        thumbnail:'',
                        url:''
                    }
                ]
            },
            coaching_PNL_derecha:{
                afirmaciones:{
                    titulo:'',
                    descripcion:'',
                    manual:'',
                    audios:[
                        {
                            titulo:'',
                            url:''
                        }
                    ]
                    },
                meditaciones:{
                    titulo:'',
                    descripcion:'',
                    audios:[
                        {
                            titulo:'',
                            url:''
                        }
                    ]
                }
                }
        }
    },
    actions:{
        async obtenerInduccion(){
            this.loading=true
            var myHeaders = new Headers();
            myHeaders.append("Authorization","Bearer "+usuario.usuario.token);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }
            
            await fetch("https://backend.mimentebrillante.com/wp-json/v1/ui/induccion", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res= JSON.parse(result)
                if(res.error){
                    this.mensaje='Error al obtener los datos'
                    this.error=true
                    this.loading=false
                }else{
                    this.loading=false
                    this.error=false
                    this.induccion_izq=res.map(function(ind){
                        return{
                            video_url:ind.video_v,
                            titulo:ind.titulo_v
                        }
                    })
                    this.induccion_der=res.map(function(ind){
                        return{
                            titulo:ind.titulo_d,
                            descripcion:ind.descripcion_d
                        }
                    })
                    

                }
            })
        },
        async obtenerCoachingVentas(){
            this.loading=true
            var myHeaders = new Headers();
            myHeaders.append("Authorization","Bearer "+usuario.usuario.token);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }
            
            await fetch("https://backend.mimentebrillante.com/wp-json/v1/ui/coaching-ventas", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res= JSON.parse(result)
                if(res.error){
                    this.mensaje='Error al obtener los datos'
                    this.error=true
                    this.loading=false
                }else{
                    this.loading=false
                    this.error=false
                    this.coaching_ventas_capacitacion=res.map(function(ventas){
                        return {
                            titulo:ventas.titulo,
                            descripcion:ventas.descripcion,
                            thumbnail:ventas.thumbnail.sizes.medium_large,
                            url:ventas.url
                        }
                    })
                    
                    this.obtenerCursosCategoria(34)
                }
            })
        },
        async obtenerCoachingConferencias(){
            this.loading=true
            var myHeaders = new Headers();
            myHeaders.append("Authorization","Bearer "+usuario.usuario.token);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }
            
            await fetch("https://backend.mimentebrillante.com/wp-json/v1/ui/coaching-conferencias", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res= JSON.parse(result)
                if(res.error){
                    this.mensaje='Error al obtener los datos'
                    this.error=true
                    this.loading=false
                }else{
                    this.loading=false
                    this.error=false
                    this.coaching_ventas_capacitacion=res.map(function(ventas){
                        return {
                            titulo:ventas.titulo,
                            descripcion:ventas.descripcion,
                            thumbnail:ventas.thumbnail.sizes.medium_large,
                            url:ventas.url
                        }
                    })
                    
                    this.obtenerCursosCategoria(34)
                }
            })
        },
        async obtenerCursosCategoria(categoria){
            this.loading=true
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+usuario.usuario.token);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
              };

            await fetch("https://backend.mimentebrillante.com/wp-json/ldlms/v2/sfwd-courses/?ld_course_category="+categoria, requestOptions)
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
                            categoria:curs.ld_course_category[0]
                            
                        }
                    })
                    
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
                    
                    this.cursos.forEach(function(c){
                        res.forEach(function(cu){
                            
                            if(c.id===cu.id){
                                c.adquirido=true
                            }
                            
                        })
                    })
                   this.loading=false
                }
                console.log(this.cursos)
              })
              .catch(error => console.log('error', error));
        },
        
    }
})

