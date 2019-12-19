<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%;">
            <el-table-column
              prop="id"
              label="id"
              width="180">
            </el-table-column>
            <el-table-column
              prop="dictValue"
              label="dictValue"
              width="180">
            </el-table-column>
            <el-table-column
              prop="infoTitle"
              label="infoTitle">
            </el-table-column>

            <el-table-column
              prop="parentId"
              label="地址">
              <template slot-scope="scope">
                  <button @click="openDetail(scope.row)">修改</button>
                  <button @click="delItem(scope.row)">删除</button>
              </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import { infoInformationselectByList,deleteInfoInformation } from "@/utils/requestDict";

    export default {
        data() {
            return {
                hehe: {},
                loading: false,
                tableData: [],
            };
        },
        computed: {
            // formConfig: {
            //   get() {
            //     return this.$store.state.form;
            //   },
            //   set(newV) {
            //     this.$store.commit('UPDATE_FORM', newV);
            //   },
            // },
        },
        mounted(){    
            // console.log(`formItemList:${this.formConfig.formItemList}`);
            // console.log(`queryForm:${this.queryForm()}`);
            this.querylist();
        },
        methods: {
            delItem(item){
                console.log(item);
                deleteInfoInformation({id:item.id}).then(res=>{
                        alert(res.msg)

                        this.querylist();
                });
            },
            openDetail(item){
                this.$router.push({
                    path:"/run",
                    query:{
                        id:item.id,
                    }
                })
            },
            querylist(){
                infoInformationselectByList().then(res => {
                    // console.log(JSON.parse(res.data));
                    this.tableData = res.data;
                    // this.formConfig = JSON.parse(res.data.formJson);
                });
            },
        },
    }
</script>