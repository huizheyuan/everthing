import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    uid: '',
    photo: '',
    nickname: '',
    signature: '',
    sex: '',
    tel: '',
    mail: '',
    passwd: '',
    participation: '',
    footprint: '',
    focus: '',
    token: getToken()
  },
  mutations: {
    setUid (state, id) { state.uid = id },
    setPhoto (state, photo) { state.photo = photo },
    setNickname (state, name) { state.nickname = name },
    setSignature (state, sig) { state.signature = sig },
    setSex (state, sex) { state.sex = sex },
    setTel (state, tel) { state.tel = tel },
    setMail (state, mail) { state.mail = mail },
    setPasswd (state, passwd) { state.passwd = passwd },
    setParticipation (state, participation) { state.participation = participation },
    setFootprint (state, footprint) { state.footprint = footprint },
    setFocus (state, focus) { state.focus = focus },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
  },
  actions: {
    getUserInfo ({ commit }, res) {
      commit('setUid', res.uid)
      commit('setPhoto', res.photo)
      commit('setNickname', res.nickname)
      commit('setSignature', res.signature)
      commit('setSex', res.sex)
      commit('setTel', res.tel)
      commit('setMail', res.mail)
      commit('setPasswd', res.passwd)
      commit('setParticipation', res.participation)
      commit('setFootprint', res.footprint)
      commit('setFocus', res.focus)
    },
    handleLogOut ({ commit }, res) {
      commit('setUid', undefined)
      commit('setPhoto', '')
      commit('setNickname', '')
      commit('setTel', res.tel)
      commit('setMail', res.mail)
      commit('setParticipation', '')
      commit('setFootprint', '')
      commit('setFocus', '')
      localStorage.token = ''
    },
  }
}
