<template>
    <el-select v-model="value" placeholder="请选择表单项" @change="selectChanged">
    <el-option-group
      v-for="group in data"
      :key="group.type"
      :label="group.label">
      <el-option
        v-for="item in group.children"
        :key="item.subtype || item.type"
        :label="item.label"
        :value="item.subtype || item.type">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
  export default {
    props: {
        fieldId: null
    },
    data() {
      return {
        data: [{
          label: '文本',
          type: 'input',
          children: [{
            label: '普通文本',
            type: 'input',
            subtype: 'text',
          },{
            label: '密码',
            type: 'input',
            subtype: 'password',
          },{
            label: '文本域',
            type: 'input',
            subtype: 'textarea',
          }]
        }, {
          type: 'other',
          label: '其他',
          children: [{
            label: '数字',
            type: 'number',
          }, {
            label: '开关',
            type: 'switch',
          }, {
            label: '单选框',
            type: 'radio',
          }, {
            label: '多选框',
            type: 'checkbox',
          }, {
            label: '下拉框',
            type: 'select',
          }, {
            label: '日期框',
            type: 'date',
          }, {
            label: '级联选择',
            type: 'cascader',
          }, {
            label: '富文本',
            type: 'richtext',
          }, {
            label: '按钮',
            type: 'button',
          }, {
            label: '弹窗',
            type: 'dialogSelect',
          }, {
            label: '全宗',
            type: 'dialogSelect2',
          }],
        }],
        defaultProps: {
          children: 'children',
          label: 'label',
          type: 'input',
          subtype: 'subtype',
        },
        value: '',
      };
    },
    methods: {
      getItem(type, data) {
        for(let i = 0; i < data.length; i++) {
          let element = data[i];
          if(element.type === type || element.subtype === type) {
             this.selElement = element;
             break;
           } else if(element.children) {
             this.getItem(type, element.children);
           }
        }
      },
      selectChanged(value) {
        this.getItem(this.value, this.data);
        console.log(this.selElement);
        this.$emit('sendFormItem', this.selElement, this.fieldId);
      }
    }
  };
</script>