<template>
  <div class="page-search">
    <wj-from v-bind="searchFormConfig" v-model="formData">
      <template #header> </template>
      <template #footer>
        <div class="search-button">
          <el-button :icon="Refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" :icon="Search" @click="handleQueryClick">
            搜索
          </el-button>
        </div>
      </template>
    </wj-from>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import WjFrom from '@/base-ui/form'

// 按钮上的图标
import { Search, Refresh } from '@element-plus/icons-vue'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    WjFrom
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定
    // 1.优化一: formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 2.优化二: 当用户点击重置
    const handleResetClick = () => {
      // 双向绑定实现
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      // 使用 model-value 和 update:modelValue 实现
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 搜索功能
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick,
      // 图标
      Search,
      Refresh
    }
  }
})
</script>

<style scoped lang="less">
.page-search {
  .search-button {
    text-align: right;
    padding: 20px;
    padding-right: 42px;
  }
}
</style>
