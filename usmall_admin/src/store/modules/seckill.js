import {
    requestSeckillList
  } from '../../util/request'
  
  const state = {
    list: []
  }
  const mutations = {
    changeSeckillList(state, arr) {
      state.list = arr
    }
  }
  const actions = {
    requestList(context) {
        requestSeckillList().then(res => {
        context.commit("changeSeckillList", res.data.list)
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
  