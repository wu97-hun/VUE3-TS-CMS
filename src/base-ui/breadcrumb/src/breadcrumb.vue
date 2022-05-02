<template>
  <div class="wj-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item>
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import type { IBreadcrumb } from '../types'

import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    breadcrumbs: {
      // prop为引用类型时需使用 PropType 指定构造函数
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less"></style>
