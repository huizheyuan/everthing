import { getUserInfo, getToken } from '../libs/user'

export default {
  state: {
    uid: '',
    photo: '',
    nickname: '',
    signature: '',
    sex: '',
    tel: '',
    mail: '',
    participation: '',
    footprint: '',
    focus: '',
    token: getToken(),
  },
  mutations: {
    setUid (state, id) { state.uid = id },
    setPhoto (state, photo) { state.photo = photo },
    setNickname (state, name) { state.nickname = name },
    setSignature (state, sig) { state.signature = sig },
    setSex (state, sex) { state.sex = sex },
    setTel (state, tel) { state.tel = tel },
    setMail (state, mail) { state.mail = mail },
    setParticipation (state, participation) { state.participation = participation },
    setFootprint (state, footprint) { state.footprint = footprint },
    setFocus (state, focus) { state.focus = focus },
  },
  actions: {
    getUserInfo ({ commit }, token) {
      getUserInfo(token).then(res => {
        const data = res.data.userInfo;
        commit('setUid', data.uid)
        commit('setPhoto', data.photo)
        commit('setNickname', data.nickname)
        commit('setSignature', data.signature)
        commit('setSex', data.sex)
        commit('setTel', data.tel)
        commit('setMail', data.mail)
        commit('setParticipation', data.participation)
        commit('setFootprint', data.footprint)
        commit('setFocus', data.focus)
      }).catch(err => {
        console.log("error", err);   
      })
    }
  },
  // getters: {
  //   headGetInfo(state){
  //     return {
  //       photo: state.photo, 
  //       nickname: state.nickname
  //     };
  //   },
  //   focusGetInfo(state){
  //     return {
  //       participation: state.participation,
  //       footprint: state.footprint,
  //       focus: state.focus
  //     }
  //   },
  //   mineGetInfo(state){
  //     return {
  //       photo: state.photo,
  //       nickname: state.nickname,
  //       signature: state.signature,
  //       sex: state.sex,
  //       tel: state.tel,
  //       mail: state.mail
  //     }
  //   }
  // }
}
