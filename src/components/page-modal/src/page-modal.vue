<template>
  <div class="page-model">
    <el-dialog
      title="新建用户"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <wj-form v-bind="modalConfig" v-model="formData"></wj-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineExpose, ref, watch } from 'vue'

import { useStore } from '@/store'

import WjForm from '@/base-ui/form'

// 采用ts专有声明，有默认值
interface Props {
  modalConfig: any
  defaultInfo: any
  pageName: string
  // 如Role中的ElTree数据
  otherInfo?: any
}

const props = withDefaults(defineProps<Props>(), {
  defaultInfo: () => ({}),
  otherInfo: () => ({})
})

// 对 props.defaultInfo 进行监听，一改变则赋值
const formData = ref<any>({})

watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

// 关闭/打开模态框
const dialogVisible = ref(false)

const store = useStore()

// 点击确定按钮的逻辑
const handleConfirmClick = () => {
  dialogVisible.value = false
  // 当新建数据时props.defaultInfo为空对象
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    store.dispatch('system/editPageDataAction', {
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    })
  } else {
    // 新建
    store.dispatch('system/createPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    })
  }
}

defineExpose({
  dialogVisible
})
</script>

<style scoped lang="less"></style>
