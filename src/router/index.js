import Vue from 'vue';
import Router from 'vue-router';
import Preview from '@/views/preview/preview';
import Run from '@/views/run';
import Editor from '@/views/editor';
import Syscategory from '@/views/syscategory';
import EditorFormAside from '@/views/editor/form/aside';
import EditorFormMain from '@/views/editor/form/main';
import EditorTableAside from '@/views/editor/table/aside';
import EditorTableMain from '@/views/editor/table/main';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/design',
      redirect: '/design/form',
      component: Editor,
      children: [
        {
          path: 'form',
          components: {
            aside: EditorFormAside,
            main: EditorFormMain,
          },
        },
        {
          path: 'table',
          components: {
            aside: EditorTableAside,
            main: EditorTableMain,
          },
        },
      ],
    },
    {
      path: '/preview',
      component: Preview,
    },
    {
      path: '/run',
      component: Run,
    },
    {
      path: '*',
      redirect: '/syscategory',
    },
    {
      path: '/syscategory',
      component: Syscategory,
    },
  ],
});
