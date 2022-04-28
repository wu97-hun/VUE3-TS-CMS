<template>
  <div class="user">
    <div class="search">
      <wj-from v-bind="searchFormConfig" />
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WjFrom from '@/base-ui/form'

import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    WjFrom
  },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
