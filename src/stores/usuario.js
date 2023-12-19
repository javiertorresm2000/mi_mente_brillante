import { defineStore } from "pinia";
import router from '../routes/routes.js';
import { LocalStorage, SessionStorage, useQuasar } from 'quasar'

// Comentado debido a que no se tiene el .env original
// let urlBase=import.meta.env.VITE_URL
let urlBase = 'https://backend.mimentebrillante.com/wp-json'
let userAdm=import.meta.env.VITE_USER
let passAdm=import.meta.env.VITE_PASS
let nuevo=false

export const useUsuarioStore = defineStore("usuario",{
    state: ()=>{
        return {
            usuario:{
                id:'',
                nombre:'',
                apellido:'',
                correo:'',
                rol:'',
                sexo:'',
                edad:'',
                token:'',
                error:false,
                mensaje_error:'',
                loading:false,
                recordar:false,
                reg_error_mail:false,
                reg_success:false,
                loading1:false,
                restaurar_p1:false,
                restaurar_p2:false,
                restaurar_p3:false,
                restaurar_p4:false,
                loading2:false,
                finalizar:false,
                loading3:false,
                loading4:false,
                loading5:false,
                shipping:{
                    address:'',
                    address2:'',
                    city:'',
                    country:'',
                    postcode:'',
                    phone:'',
                    state:''
                },
                billing:{
                    address:'',
                    address2:'',
                    city:'',
                    country:'',
                    postcode:'',
                    phone:'',
                    state:'',
                    
                },
            }
        }
    },
    actions:{
        async login(username,password){
         this.usuario.loading=true
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": `${username}`,
            "password": `${password}`
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        let url=urlBase+"/jwt-auth/v1/token"
        await fetch(url, requestOptions)
        .then(response => response.text())
        .then((result) => {
                            const res=JSON.parse(result)
                            
                            if(res.data){
                                this.usuario.error=true
                                this.usuario.mensaje_error='Error al iniciar sesion'
                                this.usuario.loading=false
                            }
                            else{
                                if(this.usuario.recordar){

                                    let us={
                                        id:res.id,
                                        correo:res.correo,
                                        token:res.token,
                                        rol:res.rol,
                                        nombre:res.nombre,
                                        apellido:res.apellido,
                                    }
                                    LocalStorage.set('usuario', us)
                                }
                                this.usuario.loading=false
                            this.usuario.id=res.id
                            this.usuario.correo=res.email
                            this.usuario.token=res.token
                            this.usuario.rol=res.rol
                            this.usuario.nombre=res.nombre
                            this.usuario.apellido=res.apellido  
                            this.usuario.loading=false 
                            this.recordar=false,
                            this.reg_error_mail=false,
                            this.reg_success=false
                            if(!nuevo){
                                nuevo=false
                                router.push('/school/dashboard/programas/marketing') 
                            }
                            
                            }
                                  
                            })
        .catch(error => console.log('error', error));



        },
        logout(){
                            this.usuario.id=''
                            this.usuario.correo=''
                            this.usuario.token=''
                            this.usuario.rol=''
                            this.usuario.nombre=''
                            this.usuario.apellido=''  
                            this.error=false,
                            this.mensaje_error=''
                            this.loading=false
                            this.usuario.reg_success=false
                            this.usuario.restaurar_p1=false
                            this.usuario.restaurar_p2=false
                            this.usuario.restaurar_p3=false
                            this.usuario.restaurar_p4=false
                            this.usuario.loading2=false
                            this.usuario.finalizar=false
                            router.push('/school') 
                            LocalStorage.clear()
        },
        async validarToken(token){
            const $q = useQuasar()
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+token);

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
            };
            
            await fetch("https://backend.mimentebrillante.com/wp-json/jwt-auth/v1/token/validate", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res=JSON.parse(result)
                if(res.data){
                    if(res.data.status==200){
                        
                        const user=$q.localStorage.getItem('usuario')
                        this.usuario.id=user.id
                        this.usuario.correo=user.correo
                        this.usuario.token=user.token
                        this.usuario.rol=user.rol
                        this.usuario.nombre=user.nombre
                        this.usuario.apellido=user.apellido
                        this.error=false,
                        this.mensaje_error='',
                        this.loading=false
                        this.usuario.reg_success=false
                        router.push('/school/dashboard/programas/marketing')
                    }
                }
            })
            .catch(error => console.log(error));
        },
        async registrarUsuario(nombre,apellido,correo,cont,ciudad,sexo){
            this.usuario.loading1=true
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "email": correo,
            "first_name": nombre,
            "last_name": apellido,
            "username": correo,
            "password": cont,
            "billing": {
                "first_name": nombre,
                "last_name": apellido,
                "company": "",
                "address_1": "",
                "address_2": "",
                "city": ciudad,
                "state": "",
                "postcode": "",
                "country": "",
                "email": correo,
                "phone": ""
            },
            "shipping": {
                "first_name": nombre,
                "last_name": apellido,
                "company": "",
                "address_1": "",
                "address_2": "",
                "city": ciudad,
                "state": "",
                "postcode": "",
                "country": ""
            }
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://backend.mimentebrillante.com/wp-json/wc/v3/customers/?consumer_key=ck_064ab6b10ced568b52999d41a924205befb7b38f&consumer_secret=cs_20ea32eb25c778fabb0c13dcea46db818cdfde3c", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res=JSON.parse(result)
                nuevo=true
                this.login(correo,cont)
                var myHeaders1 = new Headers();
                myHeaders1.append("Content-Type", "application/json");
                myHeaders1.append("Authorization","Basic am9yaXZlcmFAZ21haWwuY29tOmhJMFIgUHV4dSBHbVlRIHBUbnUgZjcyTyBFR2F2");

                var raw1 = JSON.stringify({
                "description": sexo
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders1,
                body: raw1,
                redirect: 'follow'
                };
                
                fetch("https://backend.mimentebrillante.com/wp-json/wp/v2/users/"+res.id, requestOptions)
                .then(response => response.text())
                .then(result => {
                    this.usuario.loading1=false
                    router.push('/school/dashboard/programas/marketing') 
                })
                .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));


            // this.usuario.loading1=true
            // var myHeaders = new Headers();
            // myHeaders.append("Content-Type", "application/json");

            // var raw = JSON.stringify({
            // "username": correo,
            // "email": correo,
            // "password": cont,
            // "fname": nombre,
            // "lname": apellido
            // });

            // var requestOptions = {
            // method: 'POST',
            // headers: myHeaders,
            // body: raw,
            // redirect: 'follow'
            // };

            // fetch("https://backend.mimentebrillante.com/wp-json/wp/v2/users/register", requestOptions)
            // .then(response => response.text())
            // .then(result => {
            //     const res=JSON.parse(result)
                
            //     if(res.code===200){
            //         this.usuario.loading1=false
            //         this.usuario.reg_success=true
            //         setTimeout(() => {
            //             this.login(correo,cont)
            //         }, 2000);
            //     }
            //     else if(res.code===406){
            //         this.loading1=false
            //         this.usuario.mensaje_error='El correo ya esta registrado'
            //         this.usuario.reg_error_mail=true
            //     }
            // })
            // .catch(error => console.log('error', error));

        },
        async enviarCodigo(correo){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "email": correo
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://backend.mimentebrillante.com/wp-json/bdpwr/v1/reset-password", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res=JSON.parse(result)
                if(res.data.status===200){
                    this.usuario.restaurar_p2=true
                    this.usuario.loading2=false
                }
                else{
                    this.usuario.loading2=false
                    this.usuario.mensaje_error='El correo no esta registrado'
                    this.usuario.reg_error_mail=true
                    this.usuario.restaurar_p2=false
                    this.usuario.restaurar_p1=true
                }
            })
            .catch(error => console.log('error', error));
        },
        verificarCodigo(correo,codigo){
            this.usuario.loading2=true
            this.usuario.restaurar_p2=false
            this.usuario.restaurar_p3=true
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "email": correo,
            "code": codigo
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://backend.mimentebrillante.com/wp-json/bdpwr/v1/validate-code", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res=JSON.parse(result)
                if(res.data.status===200){
                    
                    this.usuario.loading2=false
                    this.usuario.restaurar_p2=false
                    this.usuario.restaurar_p3=true
                }
                else{
                    this.usuario.loading2=false
                    this.usuario.mensaje_error='El codigo es incorrecto'
                    this.usuario.reg_error_mail=true
                    this.usuario.restaurar_p2=true
                    this.usuario.restaurar_p1=false
                    this.usuario.restaurar_p3=false
                }
            })
            .catch(error => console.log('error', error));
        },
        async cambiarPassword(correo,cont,codigo){
            this.usuario.loading2=true
            
            this.usuario.restaurar_p3=false
            this.usuario.restaurar_p4=true
            var myHeaders = new Headers();
            
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "email": correo,
            "password": cont,
            "code": codigo
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://backend.mimentebrillante.com/wp-json/bdpwr/v1/set-password", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res=JSON.parse(result)
                if(res.data.status===200){
                    this.usuario.loading2=false
                    
                    this.usuario.restaurar_p3=false
                    this.usuario.restaurar_p4=true
                }
                else{
                    this.usuario.loading2=false
                    this.usuario.mensaje_error='Error al cambiar la contraseña'
                    this.usuario.reg_error_mail=true
                    this.usuario.restaurar_p3=true
                    this.usuario.restaurar_p2=false
                    this.usuario.restaurar_p4=false
                }
            })
            .catch(error => console.log('error', error));
        },
        async listarDatosUsuario(){
            this.usuario.loading3=true
            
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
              
              fetch("https://backend.mimentebrillante.com/wp-json/wc/v3/customers/"+this.usuario.id+"?consumer_key=ck_064ab6b10ced568b52999d41a924205befb7b38f&consumer_secret=cs_20ea32eb25c778fabb0c13dcea46db818cdfde3c", requestOptions)
                .then(response => response.text())
                .then(result => {
                    const res=JSON.parse(result)
                    
                    
                    
                    this.usuario.billing.address=res.billing.address_1
                    this.usuario.billing.address2=res.billing.address_2
                    this.usuario.billing.city=res.billing.city
                    this.usuario.billing.country=res.billing.country
                    this.usuario.billing.postcode=res.billing.postcode
                    this.usuario.billing.phone=res.billing.phone

                   //agregar sexo
                   
                  
                 
                   var myHeaders1 = new Headers();
                   myHeaders1.append("Content-Type", "application/json");
                   myHeaders1.append("Authorization","Basic am9yaXZlcmFAZ21haWwuY29tOmhJMFIgUHV4dSBHbVlRIHBUbnUgZjcyTyBFR2F2");
   
                   var requestOptions = {
                   method: 'GET',
                   headers: myHeaders1,
                   
                   redirect: 'follow'
                   };
                   
                   fetch("https://backend.mimentebrillante.com/wp-json/wp/v2/users/"+this.usuario.id, requestOptions)
                   .then(response => response.text())
                   .then(result => {
                        const res1=JSON.parse(result)
                        this.usuario.loading3=false
                       this.usuario.sexo=res1.description
                        
                   })
                   .catch(error => console.log('error', error));

                })
                .catch(error => console.log('error', error));

            },
            async actualizarUsuario(fname,lname,add1,city,post,country,phone,sex){
                this.usuario.loading4=true
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "first_name": fname,
                "last_name": lname,
                "billing": {
                    "first_name": fname,
                    "last_name": lname,
                    "address_1": add1,
                   
                    "city": city,
                    "postcode": post,
                    "country": country,
                    
                    "phone": phone
                },
                "shipping": {
                    "first_name": fname,
                    "last_name": lname,
                    "address_1": add1,
                   
                    "city": city,
                    "postcode": post,
                    "country": country,
                    "phone":phone
                }
                });

                var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("https://backend.mimentebrillante.com/wp-json/wc/v3/customers/"+this.usuario.id+"?consumer_key=ck_064ab6b10ced568b52999d41a924205befb7b38f&consumer_secret=cs_20ea32eb25c778fabb0c13dcea46db818cdfde3c", requestOptions)
                .then(response => response.text())
                .then(result => {
                    //actualiza sexo
                    var myHeaders1 = new Headers();
                    myHeaders1.append("Content-Type", "application/json");
                    myHeaders1.append("Authorization","Basic am9yaXZlcmFAZ21haWwuY29tOmhJMFIgUHV4dSBHbVlRIHBUbnUgZjcyTyBFR2F2");
    
                    var raw1 = JSON.stringify({
                    "description": sex
                    });
    
                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders1,
                    body: raw1,
                    redirect: 'follow'
                    };
                    
                    fetch("https://backend.mimentebrillante.com/wp-json/wp/v2/users/"+this.usuario.id, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        this.usuario.loading4=false
                        
                       
                    })
                    .catch(error => console.log('error', error));
                    
                    
                })
                .catch(error => console.log('error', error));
            
            },
            async actualizarPass(newP){
                this.usuario.loading5=true
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", this.usuario.token);

                var raw = JSON.stringify({
                "password": newP
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("https://backend.mimentebrillante.com/wp-json/wp/v2/users/"+this.usuario.id, requestOptions)
                .then(response => response.text())
                .then(result => {
                    this.usuario.loading5=false
                })
                .catch(error => console.log('error', error));
            },
            async creaUsuarioLogin(){
                
            }
        
    },
   
   
})