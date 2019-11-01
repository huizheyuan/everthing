import Vue from 'vue';
import Vuex from 'vuex';

import user from './user';
import content from './content';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV!='production',//严格模式：防止直接修改state
  state: {
    a: 12, b: 5,
    users: []
  },
  mutations: {//用commit调用—— this.$store.commit('addA', 3)
    addA(state, n){
      state.a+=n;
    },
    addB(state, n){
      state.b+=n;
    },
    setOnline(state, id){
      state.users.forEach(user=>{
        if(user.id==id){
          user.online=true;
        }
      });
    },
    setUsers(state, users){
      state.users=users;
    }
  },
  actions: {// 用dispatch调用—— this.$store.dispatch('addA', 4)
    addA({commit}, n){
      commit('addA', n);
    },
    addB({commit}, n){
      commit('addB', n);
    },
    setOnline({commit}, id){
      commit('setOnline', id);
    },
    async readUsers({commit}){
      let res=await fetch('http://localhost:8888/1.html');
      let users=await res.json();

      commit('setUsers', users);
    }
  },
  getters: {
    count(state){
      return state.a+state.b;
    },
    onlineUsers(state){
      return state.users.filter(user=>user.online);
    }
  },
  modules: {
    content: content,
    user: user
  }
})
