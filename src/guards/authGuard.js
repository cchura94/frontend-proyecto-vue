export const authGuard = function(to, from, next){
    // verificar el access_token
    try{
        const authUser = JSON.parse(localStorage.getItem("authuser")) 

        if(authUser && authUser.access_token){
            next()
        }else{
            next({name: "Login"})
        }

    }catch(error){
        localStorage.clear();
        next({name: "Login"})
    }

}