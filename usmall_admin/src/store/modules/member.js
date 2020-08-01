import {
    requestMemberList  } from '../../util/request'
  
  const state = {
    list: []
  }
  const mutations = {
    changeMemberList(state, arr) {
      state.list = arr
    }
  }
  const actions = {
    requestList(context) {
        requestMemberList({
        istree: true
      }).then(res => {
        context.commit("changeMemberList", res.data.list)
      })
    }
  }
  const getters = {
    list(state) {
      return state.list
    }
  }
  export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
  }
  