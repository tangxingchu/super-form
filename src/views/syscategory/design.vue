<template >
  <el-container>
    <EditorFormAside style="width:380px;"></EditorFormAside>
    <EditorFormMain></EditorFormMain>
  </el-container>
</template>

<script>
import EditorFormAside from '../editor/form/aside';
import EditorFormMain from '../editor/form/main';

export default {
  components: {
	  EditorFormAside,
	  EditorFormMain,
  },

};
</script>
