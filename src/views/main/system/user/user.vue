<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { usePageSearch } from '@/hooks/use-page-search'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    // 封装hooks
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    return {
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
