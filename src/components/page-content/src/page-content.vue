<template>
  <div class="page-content">
    <wj-table
      :dataList="dataList"
      :dataCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 表格页头插槽 -->
      <template #header> </template>
      <template #headerHandler>
        <el-button type="primary" size="small">新建用户</el-button>
        <el-button icon="refresh" size="small">刷新</el-button>
      </template>
      <!-- 表格内容插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handler-btns">
          <el-button icon="edit" size="small" type="text"> 编辑 </el-button>
          <el-button icon="delete" size="small" type="text"> 删除 </el-button>
        </div>
      </template>

      <!-- 表格页脚插槽 -->
      <template #footer> </template>

      <!-- 动态插槽 -->
      <!-- 使用此具名插槽向table传递插槽内容 -->
      <template
        v-for="item in otherPropsSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <!-- 使用此具名插槽接受由具体页面传来的特定的插槽 -->
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </wj-table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineExpose, computed, ref, watch } from 'vue'

import { useStore } from 'vuex'

import WjTable, { ITable } from '@/base-ui/table'

// script setup中定义props的方法
/*
// 采用ts专有声明，有默认值
interface Props {
    msg?: string
    labels?: string[]
}
const props = withDefaults(defineProps<Props>(), {
    msg: 'hello',
    labels: () => ['one', 'two']
})
*/
const props = defineProps<{
  contentTableConfig: ITable
  pageName: string
}>()

/*
// script setup中定义emits的方法
const emits = defineEmits<{
  (e: 'resetBtnClick'): void
  (e: 'queryBtnClick', num: number): void
}>()
*/

const store = useStore()

// 双向绑定pageInfo
const pageInfo = ref({ currentPage: 0, pageSize: 10 })

watch(pageInfo, () => getPageData())

// 发送网络请求
const getPageData = (queryInfo: any = {}) => {
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}

getPageData()

const dataList = computed(() =>
  store.getters[`system/pageListData`](props.pageName)
)

const dataCount = computed(() =>
  store.getters[`system/pageListDataCount`](props.pageName)
)

const otherPropsSlots = props.contentTableConfig?.propList.filter((item) => {
  if (item.slotName === 'status') return false
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})

// 使用script setup暴露子组件的属性和方法需要使用defineExpose
defineExpose({
  getPageData
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
