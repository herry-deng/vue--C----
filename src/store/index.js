import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    showContent: false,
    size: 5,
    goodsList: [],
    type: null,
    countMap: {},
  },
  mutations: {
    storageChange(state, { id, value }) {
      if (state.countMap[id]) {
        if ((value === -1 && state.countMap[id] === 1) || value === -Infinity) {
          Vue.delete(state.countMap, id);
        } else {
          Vue.set(state.countMap, id, state.countMap[id] + value);
        }
      } else {
        Vue.set(state.countMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.countMap));
    },
    setCountMap(state, map) {
      state.countMap = map;
    },
    setSideList(state, list) {
      state.sideList = list;
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsType(state, type) {
      state.type = type;
    },
  },
  actions: {
    async getSideList({ commit }, type) {
      commit('setShowContent', false);
      const value = await api.getSideList(type);
      commit('setSideList', value);
      commit('setShowContent', true);
    },
    async getGoodsList({ state, commit }, options) {
      const { page, sortType } = options;
      const type = options.type || state.type;
      const { list, total } = await api.getGoodsList(type, page, state.size, sortType);
      commit('setGoodsList', list);
      commit('setGoodsType', type);
      if (total > state.goodsList.length) {
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
