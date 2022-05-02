<template>
  <div class="nav-header">
    <el-icon class="fold-menu" :size="30" @click="handleFoldClick">
      <component :is="isFoldIcon"></component>
    </el-icon>
    <div class="content">
      <wj-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import WjBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'

import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    UserInfo,
    WjBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()

    const isFold = ref(false)

    const isFoldIcon = computed(() => (!isFold.value ? 'fold' : 'expand'))

    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑数据
    const breadcrumbs = computed(() =>
      pathMapBreadcrumbs(store.state.login.userMenus, route.path)
    )

    return {
      isFold,
      isFoldIcon,
      breadcrumbs,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    cursor: pointer;
  }
  .content {
    display: flex;
    flex: 1;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
