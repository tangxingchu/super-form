<template lang="pug">
  div
    toolbar(@clickUpdateAction="updateForm" @clickInsertAction="insertForm" @clickDelAction="delForm")
    dynamic-form(:form-config="form" v-model="hehe" ref="form-preview")
    el-button(@click='$router.go(-1)' :size="form.size") 返回
    el-button(@click='validate' :loading="loading" type="primary" :size="form.size") 测试验证
    p 表单数据：
      pre {{hehe}}
    p 表单配置：
      pre {{form}}
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      hehe: {},
      loading: false,
    };
  },
  computed: {
    ...mapState(['form']),
  },
  mounted(){
    
    console.log(this.form.formItemList);
  },
  methods: {
    validate() {
      this.loading = true;
      const form = this.$refs['form-preview'].$children[0];
      form
        .validate()
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    updateForm() {
      this.$message({
          message: '预览模式不支持',
          type: 'warning',
      });
    },
    insertForm() {
      this.$message({
          message: '预览模式不支持',
          type: 'warning',
      });
    },
    delForm() {
      this.$message({
          message: '预览模式不支持',
          type: 'warning',
      });
    },
  },
};
</script>
