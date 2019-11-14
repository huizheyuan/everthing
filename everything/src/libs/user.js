import $qs from 'qs'
import {SERVER} from '@/config'
import axios from 'axios'

//注册
export const userReg = (mForm) => {
    return axios({
        url: SERVER + 'user/reg',
        method: 'post',
        data: $qs.stringify( mForm )
    })
}
//登录
export const userLogin = (mForm) => {
    return axios({
        url: SERVER + 'user/login',
        method: 'post',
        data: $qs.stringify( mForm )
    })
}
//token
export const getToken = () => {
    const token = localStorage.token  
    if (token) return token
    else return false
}
//退出
export const quit = (token) => {
    if (token){
        let data={token: token};
        return axios({
            url: SERVER + 'user/logout',
            method: 'post',
            data: $qs.stringify(data)
        })
    }
}
//获取用户信息
export const getUserInfo = (token) => {
    if (token){
        let data={token: token};  
        return axios({
            url: SERVER + 'user/getuser',
            method: 'post',
            data: $qs.stringify(data)
        })
    }
}
//注销账号
export const cancelAccount = (token) => {
    if (token){
        let data={token: token};  
        return axios({
            url: SERVER + 'user/cancel',
            method: 'post',
            data: $qs.stringify(data)
        })
    }
}
