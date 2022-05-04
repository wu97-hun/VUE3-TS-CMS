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
        <el-button
          v-if="isCreate"
          type="primary"
          size="small"
          @click="handleNewClick"
        >
          新建数据
        </el-button>
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
      <template #handler="scope">
        <div class="handler-btns">
          <el-button
            icon="edit"
            size="small"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            icon="delete"
            size="small"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
          >
            删除
          </el-button>
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
import {
  defineProps,
  defineEmits,
  defineExpose,
  computed,
  ref,
  watch
} from 'vue'

import { useStore } from '@/store'

import WjTable, { ITable } from '@/base-ui/table'

import { usePermission } from '@/hooks/use-permission'

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

// script setup中定义emits的方法
const emit = defineEmits<{
  (e: 'newBtnClick'): void
  (e: 'editBtnClick', item: any): void
}>()

const store = useStore()

// 获取权限
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

// 双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 })

watch(pageInfo, () => getPageData())

// 发送网络请求
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
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

// 获取动态插槽
const otherPropsSlots = props.contentTableConfig?.propList.filter((item) => {
  if (item.slotName === 'status') return false
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})

// 删除按钮
const handleDeleteClick = (item: any) => {
  store.dispatch('system/deletePageDataAction', {
    pageName: props.pageName,
    id: item.id
  })
}

// 新增数据
const handleNewClick = () => {
  emit('newBtnClick')
}

// 修改数据
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}

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
