import $qs from 'qs'
import {SERVER} from '@/config'

export const login = ({ tel, passwd }) => {
  const data = {
    tel: tel,
    passwd
  }
  return this.$axios.request({
    url: SERVER + '/user/login',
    data: $qs.stringify(data),
    method: 'post'
  })
}

// export const getUserInfo = (token) => {
//   return this.$axios.request({
//     url: SERVER + '/user/getuser',
//     method: 'post',
//     data: $qs.stringify(token)
//   })
// }

export const logout = (token) => {
  return this.$axios.request({
    url: SERVER + '/user/logout',
    method: 'post',
    data: $qs.stringify(token)
  })
}
