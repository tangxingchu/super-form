<template lang="pug">
  div
    toolbar(@clickUpdateAction="updateForm" @clickInsertAction="insertForm" @clickDelAction="delForm")
    dynamic-form(:form-config="formConfig" v-model="hehe" ref="form-run")
</template>

<script>
import { mapState } from 'vuex';
import { insertInfoData,
  updateInfoData,
  queryFormData } from '../../utils/requestDict';

export default {
  data() {
    return {
      hehe: {},
      loading: false,
      form: {
        formItemList: [],
      },
      itemId: this.$route.query.id
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
        "id": this.itemId,
        "nodeId": "02020301",
        "tableName": "da_aj_145"
      }
      queryFormData(params).then(res => {
        console.log(JSON.parse(res.data.formJson));
        // this.$store.commit('UPDATE_FORM',JSON.parse(res.data.formJson));
        // this.form = JSON.parse(res.data.formJson);
        this.formConfig = JSON.parse(res.data.formJson);
      })
    },
    updateForm() {
      updateInfoData({id:this.itemId}).then(() => {
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
      insertInfoData({id:this.itemId}).then(() => {
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
