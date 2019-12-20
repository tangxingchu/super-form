<template lang="pug">
  div
    toolbar(@clickUpdateAction="updateForm" @clickInsertAction="insertForm" @clickDelAction="delForm")
    dynamic-form(:form-config="formConfig" v-model="hehe" ref="form-run")
</template>

<script>
import { mapState } from 'vuex';
import { insertFormData,
  updateFormData,
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
    let queryParams = this.$route.query;
    if(queryParams.nodeId === "undefined" || queryParams.tableName === "undefined") {
      this.$message({
          message: '请传入对应的nodeId和tableName',
          type: 'info',
      });
      return;
    }
    this.queryForm(queryParams);
  },
  methods: {
    validate(callback) {
      // this.loading = true;
      const form = this.$refs['form-run'].$children[0];
      form
        .validate(callback)
        // .then((data) => {
        //   this.loading = false;
        // })
        // .catch(() => {
        //   this.loading = false;
        // });
    },
    queryForm(queryParams){
      queryFormData(queryParams).then(res => {
        // console.log(JSON.parse(res.data.formJson));
        // this.$store.commit('UPDATE_FORM',JSON.parse(res.data.formJson));
        // this.form = JSON.parse(res.data.formJson);
        if(res.data && res.data.length > 0) {
          this.formConfig = JSON.parse(res.data[0].formJson);
        } else {
          this.$message({
                message: '没有找到相关数据',
                type: 'error',
            });
        }
      })
    },
    updateForm() {
      updateFormData({nodeid: "020203", values: JSON.stringify(this.hehe)}).then(() => {
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
        this.validate((flag, obj) => {
          if(flag) {
            insertFormData({nodeid: "020203", values: JSON.stringify(this.hehe)}).then(() => {
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
          }
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
