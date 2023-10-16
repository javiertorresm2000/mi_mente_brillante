

export const Login=function(user,pass){
//    // WARNING: For POST requests, body is set to null by browsers.
// var data = JSON.stringify({
//     "username": `${user}`,
//     "password": `${pass}`
//   });
  
//   var xhr = new XMLHttpRequest();
//   xhr.withCredentials = true;
  
//   xhr.addEventListener("readystatechange", function() {
//     if(this.readyState === 4) {
//       console.log(this.responseText);
//     }
//   });
  
//   xhr.open("POST", "https://backend.riverastudio.co/wp-json/jwt-auth/v1/token");
//   xhr.setRequestHeader("Content-Type", "application/json");
  
//   xhr.send(data);

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "username": `${user}`,
    "password": `${pass}`
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
let url=import.meta.env.VITE_URL
fetch(url, requestOptions)
  .then(response => response.text())
  .then((result) => {
                      
                    })
  .catch(error => console.log('error', error));



}