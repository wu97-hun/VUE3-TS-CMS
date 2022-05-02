<template>
  <div class="page-search">
    <wj-from v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="search-button">
          <el-button :icon="Refresh">重置</el-button>
          <el-button type="primary" :icon="Search">搜索</el-button>
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
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return {
      formData,
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
