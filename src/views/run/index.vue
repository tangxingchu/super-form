<template lang="pug">
  div(style="text-align: left;")
    toolbar(@clickUpdateAction="updateForm" @clickInsertAction="insertForm" @clickDelAction="delForm")
    dynamic-form(:form-config="formConfig" v-model="hehe" ref="form-run")
</template>

<script>
import { mapState } from 'vuex';
import {
  insertFormData,
  updateFormData,
  queryFormData,
  selectFormData,
  getValueByDictKey,
} from '../../utils/requestDict';

export default {
  data() {
    return {
      hehe: {},
      loading: false,
      form: {
        formItemList: [],
      },
      itemId: this.$route.query.id,
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
  mounted() {
    // console.log(`formItemList:${this.formConfig.formItemList}`);
    // console.log(`queryForm:${this.queryForm()}`);
    let queryParams = this.$route.query;
    if (!queryParams.nodeId) {
      this.$message({
        message: '请传入对应的nodeId',
        type: 'info',
      });
      return;
    }
    if (!queryParams.id && !queryParams.tableName) {
      this.$message({
        message: '请传入对应的数据id或者tableName',
        type: 'info',
      });
      return;
    }
    // let loading;
    // function startLoading() {    //使用Element loading-start 方法
    //   loading = Loading.service({
    //     lock: true,
    //     text: '拼命加载中...',
    //     background:'rgba(255,255,255,0)',
    //   })
    // }
    // function endLoading() {    //使用Element loading-close 方法
    //   loading.close()
    // }
    // startLoading();
    this.queryForm(queryParams)
      .then(() => {
        // endLoading();
        if (queryParams.id) {
          selectFormData({
            id: parseInt(queryParams.id),
            nodeId: queryParams.nodeId,
          }).then(result => {
            if (result.data && result.data.length > 0) {
              let formData = {};
              this.formConfig.formItemList.forEach(item => {
                formData[item.name] = result.data[0][item.name];
              });              
              this.hehe = {...formData};
            } else {
              this.$message({
                message: '没有查询到数据',
                type: 'error',
              });
              return;
            }
            //初始化字典与全宗数据
            let dictKyes = [];
            this.formConfig.formItemList.map(item => {
              if (item.name === 'fonds_no') {
                item.displayName = result.data[0]["fonds_name"];
              }
              if (item.name === 'department') {
                item.displayName = result.data[0]["org_name"];
                item.fondsCode = result.data[0]["fonds_no"];
              }
              if (item.dictKey) {
                dictKyes.push(item.dictKey);
              }
              return item;
            });
            //初始化字典

            dictKyes.forEach(dictKey => {
              let params = {
                dictKey,
                fondsCode: this.hehe.fonds_no,
              };
              getValueByDictKey(params)
                .then(res => {
                  let options = [];
                  res.data.forEach(item => {
                    options.push({
                      value: item.dictKey,
                      label: item.dictValue,
                    });
                  });
                  this.formConfig.formItemList.map(item => {
                    if (item.dictKey == dictKey) {
                      item.options = options;
                    }
                    return item;
                  });
                  this.hehe = { ...this.hehe};
                });
            });
          });
        }
      })
      .catch(e => {
        // endLoading();
      });
  },
  methods: {
    validate(callback) {
      // this.loading = true;
      const form = this.$refs['form-run'].$children[0];
      form.validate(callback);
      // .then((data) => {
      //   this.loading = false;
      // })
      // .catch(() => {
      //   this.loading = false;
      // });
    },
    queryForm(queryParams) {
      return queryFormData({ nodeId: queryParams.nodeId }).then(res => {
        // console.log(JSON.parse(res.data.formJson));
        // this.$store.commit('UPDATE_FORM',JSON.parse(res.data.formJson));
        // this.form = JSON.parse(res.data.formJson);
        if (res.data && res.data.length > 0) {
          this.formConfig = JSON.parse(res.data[0].formJson);
        } else {
          this.$message({
            message: '没有找到相关数据',
            type: 'error',
          });
        }
      });
    },
    updateForm() {
      updateFormData({ id: this.$route.query.id, nodeid: this.$route.query.nodeId, values: JSON.stringify(this.hehe) })
        .then(() => {
          this.$message({
            message: '数据修改成功',
            type: 'success',
          });
        })
        .catch(e => {
          this.$message({
            message: '数据修改失败',
            type: 'error',
          });
          throw new Error(e);
        });
    },
    insertForm() {
      this.validate((flag, obj) => {
        if (flag) {
          insertFormData({
            nodeid: this.$route.query.nodeId,
            values: JSON.stringify(this.hehe),
          })
            .then(() => {
              this.$message({
                message: '数据新增成功',
                type: 'success',
              });
            })
            .catch(e => {
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
