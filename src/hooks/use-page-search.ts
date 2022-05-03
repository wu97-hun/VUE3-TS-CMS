import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  // 组件的ref
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, handleResetClick, handleQueryClick]
}
