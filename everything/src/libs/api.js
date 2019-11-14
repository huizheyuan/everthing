import $qs from 'qs'
import {SERVER} from '@/config'
import axios from 'axios'

//分类
export const catalogs = () => {
  return axios({
    url: SERVER + 'content/catalog',
    method: 'get'
  })
}
//发表辩题
export const publish = (mForm) => {
  return axios({
    url: SERVER + 'content/publish',
    method: 'post',
    data: $qs.stringify(mForm)
  })
}
