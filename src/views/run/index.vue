<template lang="pug">
  div
    toolbar(@clickUpdateAction="updateForm" @clickInsertAction="insertForm" @clickDelAction="delForm")
    dynamic-form(:form-config="formConfig" v-model="hehe" ref="form-run")
</template>

<script>
import { mapState } from 'vuex';
import { insertFormData, updateFormData, deleteFormData, queryFormData } from '../../utils/requestDict';

export default {
  data() {
    return {
      hehe: {},
      loading: false,
      form: {
        formItemList: [],
      },
    };
  },
  computed: {
    formConfig: {
      get() {
        return this.$store.state.form;
      },
      set(newV) {
        this.$store.commit('UPDATE_FORM', newV);
      },
    },
  },
  mounted(){    
    // console.log(`formItemList:${this.formConfig.formItemList}`);
    // console.log(`queryForm:${this.queryForm()}`);
    this.queryForm();
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
    queryForm(){
      let params = {
        "id": 7,
        "nodeId": "0106",
        "tableName": "wj_jh_110"
      }
      queryFormData(params).then(res => {
        console.log(JSON.parse(res.data.formJson));
        // this.$store.commit('UPDATE_FORM',JSON.parse(res.data.formJson));
        // this.form = JSON.parse(res.data.formJson);
        this.formConfig = JSON.parse(res.data.formJson);
      })
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
