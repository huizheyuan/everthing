import $qs from 'qs'
import {SERVER} from '@/config'
import axios from 'axios'

//tags
export const tags = () => {
  return axios({
    url: SERVER + 'content/tags',
    method: 'get'
  })
}
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
