<template>
  <div class="wj-from">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="ietmStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { IFormItem } from '../types'

export default defineComponent({
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      // 如果默认值是对象或者数组等引用类型贼一定要使用箭头函数设置默认值
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    ietmStyle: {
      type: Object,
      default: () => ({
        padding: '10px 40px'
      })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px  4个 1个6份 总计24份
        lg: 8,
        md: 12,
        xs: 24
      })
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.wj-from {
  padding-top: 22px;
}
</style>
