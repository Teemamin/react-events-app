import { redirect } from "react-router-dom"

export const getTokenDuration = ()=>{
    const storedExpirationTime = localStorage.getItem('exp')
    const expirationDate = new Date(storedExpirationTime)
    const now = new Date()
    const duration = expirationDate.getTime() - now.getTime() //deduct the current time from the exp time
    //if the token is valid it will be a postive value if not it will be a neg
    return duration
}
export const getAuthToken = ()=>{
    const token = localStorage.getItem('token')
    if(!token){
        return null
    }
    const tokenDuration = getTokenDuration()
    if(tokenDuration < 0){
        //that means it has exp
        return 'Expired'

    }
    return token 
}

export const tokenLoader = ()=>{
    return getAuthToken()
}

export const checkAuthLoader = ()=>{
    //route protection
    const token = getAuthToken()
    if(!token){
        return redirect('/auth')
    }
    return null
}