/* eslint-disable */
export default {
  "input": {
    "type": 'input', // 必要, String
    "subtype": 'text',
    "name": "",
    "label": '文本', // 必要, String
    "disabled": false, //禁用, Boolean
    "readonly": false, //只读, Boolean
    // "block": true, //独占一行, Boolean, 如果选项太长也会自动换行
    "value": '', // 默认值
    "placeholder": '请输入一些文本',
    "rules": [
      // 验证规则, Array
      // https://github.com/yiminghe/async-validator
      { "required": true, "message": '不能为空', 'trigger': 'blur' },
      { "min": 1, "max": 8, "message": '长度在 1 到 8 个字符', 'trigger': 'blur' },
      { "pattern": '^[\\w\\u4e00-\\u9fa5-_]+$', "message": '正则验证失败:^[\\w\\u4e00-\\u9fa5-_]+$', 'trigger': 'blur' },
    ],
    "span": 24,
  },
  "number": {
    "type": 'number', // number 类型目前采用的是"输入前"限制, 使用rules验证会出现bug
    "name": "",
    "label": '数字',
    "value": 16,
    "decimal1": 2, // 允许的小数位数
    "min": 0,
    "max": 99998,
    "prepend": '￥', // String, 前缀
    "append": '元', // String, 后缀（单位）
    "span": 24,
  },
  "switch": {
    "type": 'switch',
    "name": "",
    "label": '开关',
    "appearance": "switch", // 外观, 'switch'开关(默认) / checkbox勾选
    "value": true,
    "span": 24,
  },
  "radio": {
    "type": 'radio',
    "name": "",
    "label": '单选',
    "value": '',
    // "options": [
    //   {
    //     "value": 'opt1',
    //     "label": '蒸羊羔',
    //     "disabled": false
    //   }
    // ],
    "dictKey": "",//字典key
    "button": false, // 按钮形状, inline模式下推荐开启, 多选框checkbox同样有效
    "border": true, // (非按钮形式)显示边框, inline模式下推荐开启, 多选框checkbox同样有效
    "rules": [
      { "required": true, "message": '请选择一项', "trigger": 'blur' },
    ],
    "span": 24,
  },
  "checkbox": {
    "type": 'checkbox',
    "name": "",
    "label": '多选',
    "value": [],
    "dictKey": "",//字典key
    "border": true,
    "button": false,
    // "max": 2, // 限制输入
    // "min": 1,
    // "options": [],
    "rules": [
      { "type": "array", "required": true, "min": 1, "max": 2, "message": '请勾选1~2项' },
    ],
    "span": 24,
  },
  "select": {
    "type": 'select',
    "name": "",
    "label": '下拉',
    "value": '',
    "dictKey": "",//字典key
    "disabled": false,
    "multiple": false,
    // "options": [],
    "placeholder": '请选择',
    "rules": [],
    "span": 24,
  },
  "date": {
    "type": 'date',
    "name": "",
    // "subtype": 'year',
    // "label": '年',
    "value": null,
    "disabled": false,
    // "valueFormat": 'yyyy', // 默认为Date对象, 形如"2017-12-12T05:39:34.000Z"
    // "viewFormat": 'yyyy年', // 显示在输入框中的格式, 如不填写, 则使用valueFormat, 仅 type=date 有效
    "rules": [
      { required: "true", message: "此项为必填项" }
    ],
    "placeholder": '请选择',
    "span": 24,
  },
  "cascader": {
    "type": 'cascader',
    "name": "",
    "label": '级联选择',
    "disabled": false,
    "filterable": false,
    "value": null,
    "placeholder": '请选择',
    "rules": [
      { "required": true, "type": 'array', "min": 1, "message": '请选择' },
    ],
    "span": 24,
  },
  "richtext": {
    "type": "richtext",
    "name": "",
    "label": "内容",
    "value": '',
    "span": 24,
  },
  "button": {
    "type": "button",
    "name": "",
    "label": "",
    "value": '按钮',
    "span": 24,
  },
  "dialogSelect": {
    "type": 'dialogSelect',
    "name": "",
    "label": '弹窗选择',
    "value": '',
    "disabled": false,
    "multiple": false,
    "placeholder": '请选择',
    "rules": [],
    "span": 24,
  },
  "dialogSelect2": {
    "type": 'dialogSelect2',
    "name": "",
    "label": '全宗选择',
    "value": '',
    "disabled": false,
    "multiple": false,
    "placeholder": '请选择',
    "rules": [],
    "span": 24,
  },
  "dialogSelect3": {
    "type": 'dialogSelect3',
    "name": "",
    "label": '组织选择',
    "value": '',
    "disabled": false,
    "multiple": false,
    "placeholder": '请选择',
    "rules": [],
    "span": 24,
  },
  "label": {
    "type": 'label',
    "name": "",
    "label": '标签',
    "span": 24,
    "align": "left",
    "fontSize": 18,
    "fontColor": "",
  },
  // {
  //   "type": 'rate',
  //   "label": '评分',
  //   "key": 'rate1',
  //   "value": 5,
  // },
  // {
  //   "type": 'color',
  //   "label": '颜色',
  //   "key": 'color1',
  //   // 选择透明度
  //   "showAlpha": true,
  //   // 颜色格式, String, hsl / hsv / hex / rgb, 默认值为 hex(showAlpha=false) / rgb(showAlpha=true)
  //   // "format": 'rgb',
  //   // "value": 'rgba(19, 206, 102, 0.8)',
  // },
  // {
  //   "type": 'slider', // 可以限制范围, 也可以选择数字范围
  //   "label": '滑块',
  //   "key": 'slider1',
  //   "value": 10,
  //   // "block": true,
  // },
  // {
  //   "type": 'slider',
  //   "label": '自定义范围',
  //   "key": 'slider2',
  //   "value": 70,
  //   "block": true,
  //   "showStops": true, // 显示间断点
  //   "step": 5, // 默认为1
  //   "min": 60,
  //   "max": 90,
  // },
  // {
  //   "type": 'slider',
  //   "isRange": true, // 选择范围
  //   "label": '选择范围',
  //   "key": 'slider3',
  //   // "value": null, // 默认值为[min, max]
  //   "block": true,
  //   "min": 0,
  //   "max": 100,
  // },
  // {
  //   "type": 'time',
  //   "label": '时间',
  //   "key": 'time1',
  //   "valueFormat": 'HH:mm:ss A',
  //   "placeholder": '选择时间',
  //   "rules": [{ "required": true, "message": '请选择一个时间' }]
  // },
  // {
  //   "type": 'time',
  //   "isRange": true, // 选择时间范围
  //   "label": '时间范围',
  //   "key": 'timeRange1',
  //   "valueFormat": 'HH:mm:ss',
  //   "viewFormat": 'HH:mm:ss',
  //   // "value": null, // 返回格式: ['00:00', '00:00']
  //   "rules": [{ "type": "array", "required": true, "message": '请选择一个时间范围' }]
  // },
}
