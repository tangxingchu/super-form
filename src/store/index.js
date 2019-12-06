import Vue from 'vue';
import Vuex from 'vuex';
import form from './modules/form'; // 表单
import row from './modules/row'; // 布局row

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    itemKey: '', // 当前选中的item
    asideActiveName: 'items-list', // 侧边栏标签当前活动位置
    active: 0,
  },
  mutations: {
    SELECT_ITEM(state, newKey) {
      state.itemKey = newKey;
      // 只要itemKey变化, 就切换至'组件配置'页
      state.asideActiveName = 'item-config';
    },
    TOGGLE_ASIDE_ACTIVE(state, newName) {
      state.asideActiveName = newName;
    },
    UPDATE_ACTIVE(state, payload) {
      Object.assign(state, payload);
    },
  },
  modules: {
    // todo 表格table
    form,
    row,
  },
});

export default store;
