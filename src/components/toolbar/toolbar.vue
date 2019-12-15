<template>
    <el-row style="margin-bottom: 16px;">
        <el-col :span="24">
            <el-button icon="el-icon-plus" type="primary" size="small" @click="insert">新增</el-button>
            <el-button icon="el-icon-edit" type="primary" size="small" style="margin-left: 8px;" @click="update">修改</el-button>
            <el-button icon="el-icon-close" type="danger" size="small" style="margin-left: 8px;" @click="del">删除</el-button>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        update() {
            this.$emit('clickUpdateAction');
        },
        del() {
            this.$emit('clickDelAction');
        },
        insert() {
            this.$emit('clickInsertAction');
        },
    },
}
</script>