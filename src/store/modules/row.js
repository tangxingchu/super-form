export default {
    state: {
        gutter:'',//栅格间隔
        justify: '',//flex 布局下的水平排列方式
        align: '',//flex 布局下的垂直排列方式
        cols: [],
    },
    mutations: {
      UPDATE_ROW(state, payload) {
        Object.assign(state, payload);
      },
    },
  };
  