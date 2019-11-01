import Cookies from 'js-cookie'

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, { expires: 1 })
}

export const getToken = () => {
    const token = localStorage.token
    if (token) return token
    else return false
}