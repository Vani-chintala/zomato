

 export const getLoggedIn = (username) => {
 // store the firstname in ls which u get from backend in console
 localStorage.setItem('loggedInUsername', username)
 //refresh
 window.location = window.location.href
}

export const getLoggedOut = () => {
    //clear the localstorage
    localStorage.clear()
    // refresh 
    window.location = window.location.href
}