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
      return form
        .validate()
        .then((data) => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    queryForm(){
      let params = {
        "nodeId": "020203",
        "tableName": "da_xm_144"
      }
      queryFormData(params).then(res => {
        // console.log(JSON.parse(res.data.formJson));
        // this.$store.commit('UPDATE_FORM',JSON.parse(res.data.formJson));
        // this.form = JSON.parse(res.data.formJson);
        if(res.data && res.data.length == 1) {
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
        this.validate().then(data => console.log(data));
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
