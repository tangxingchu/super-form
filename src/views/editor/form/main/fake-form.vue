<template>
  <el-form
    :inline="formConfig.inline"
    :label-position="formConfig.labelPosition"
    :label-width="formConfig.labelWidth"
    :size="formConfig.size"
    class="dynamic-form fake-form"
  >
    <el-row :gutter="8">
      <draggable v-model="formConfig.formItemList">
        <transition-group name="list-complete">
          <el-col
              v-for="(item,i) in formConfig.formItemList"
              :key="item.key"
              :span="item.span"
              :class="{'selected': $store.state.itemKey===item.key, 'unselected': $store.state.itemKey!==item.key}"
              class="draggable list-complete-item"
              @click.native="select(item.key)"
            >
              <fake-form-item :item="item"></fake-form-item>
              <i class="el-icon-delete" @click.stop="deleteItem(i)"></i>
            </el-col>
        </transition-group>
      </draggable>
    </el-row>
  </el-form>
</template>

<script>
import Draggable from 'vuedraggable';
import FakeFormItem from './fake-form-item';

export default {
  components: { FakeFormItem, Draggable },
  props: {
    formConfig: {
      type: Object,
      required: true,
    },
  },
  methods: {
    select(key) {
      this.$store.commit('SELECT_ITEM', key);
    },
    deleteItem(i) {
      this.formConfig.formItemList.splice(i, 1);
    },
  },
};
</script>

<style lang="less">
.fake-form {
  .draggable {
    position: relative;
    padding: 5px 10px 0 5px;
    cursor: move;

    i[class^='el-icon'] {
      display: none;
      position: absolute;
      right: 3px;
      top: 3px;
      cursor: pointer;
      color: #ff3c00b9;
    }

    &:hover {
      i[class^='el-icon'] {
        display: inline;
      }
    }
  }

  .selected {
    border: 1px dashed #40a0ffce;
    background-color: #add8e62b;
    border-radius: 3px;
  }
  .unselected {
    border: 1px dashed transparent;
    background-color: transparent;
    border-radius: 3px;
  }

  .el-form-item {
    label {
      cursor: move;
    }
  }

  &.el-form--inline {
    .draggable {
      display: inline-block;
    }
  }
}

.list-complete-item {
  transition: all 1s;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
