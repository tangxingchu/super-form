<template>
  <el-container id="app">
    <el-header>
      <el-menu
        v-bind:default-active="$route.path"
        v-bind:show-timeout="0"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-submenu index="/editor">
          <template slot="title">编辑器</template>
          <el-menu-item index="/editor/form">表单</el-menu-item>
          <el-menu-item index="/editor/table">表格</el-menu-item>
        </el-submenu>
        <el-menu-item index="/preview">预览</el-menu-item>
      </el-menu>
      <theme-picker id="theme-picker" ></theme-picker>
    </el-header>
  </el-container>
</template>

<script>
import ThemePicker from '@/components/themePicker';

export default {
  components: { ThemePicker },
};
</script>

<style lang="less">
html,
body,
#app {
  margin: 0;
  font-size: 14px;
  height: 100%;
}
.el-header {
  padding: 0 !important;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.c666 {
  color: #606266;
}
.mt5 {
  margin-top: 5px;
}
#theme-picker {
  position: fixed;
  right: 10px;
  top: 10px;
}
</style>
