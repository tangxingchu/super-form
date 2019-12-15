<template lang="pug">
  div
    toolbar(@clickUpdateAction="updateForm" @clickInsertAction="insertForm" @clickDelAction="delForm")
    dynamic-form(:form-config="form" v-model="hehe" ref="form-run")
</template>

<script>
import { mapState } from 'vuex';
import { insertFormData, updateFormData, deleteFormData } from '../../utils/requestDict';

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
      const form = this.$refs['form-run'].$children[0];
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
      updateFormData(this.hehe).then(() => {
            this.$message({
                message: '数据修改成功',
                type: 'success',
            });
        }).catch(e => {
            this.$message({
                message: '数据修改失败',
                type: 'error',
            });
        });
    },
    insertForm() {
        insertFormData(this.hehe).then(() => {
            this.$message({
                message: '数据新增成功',
                type: 'success',
            });
        }).catch(e => {
            this.$message({
                message: '数据新增失败',
                type: 'error',
            });
        });
    },
    delForm() {
      this.$message({
          message: '删除',
          type: 'info',
      });
    },
  },
};
</script>
