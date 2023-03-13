import Cookies from 'universal-cookie';
 const storeToken = (token:string)=>{
     const cookies = new Cookies();
     cookies.set('token',token,{
         path:"/",
         maxAge:1200,
         secure:true,
         sameSite:'lax',
     })
 }


 export {storeToken}