import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallBackFn = (item?: any) => void

export function usePageModal(
  newCallBack?: CallBackFn,
  editCallBack?: CallBackFn
) {
  const pageModelRef = ref<InstanceType<typeof PageModal>>()

  const defaultInfo = ref({})

  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    newCallBack && newCallBack()
  }

  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCallBack && editCallBack(item)
  }

  return [pageModelRef, defaultInfo, handleNewData, handleEditData]
}
