<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="user-name">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="circle-close" @click="handleExitClick">
            退出登录
          </el-dropdown-item>
          <el-dropdown-item icon="user" divided>用户信息</el-dropdown-item>
          <el-dropdown-item icon="management">系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import localCache from '@/utils/cache'

import { useRouter } from 'vue-router'

import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const router = useRouter()

    const name = computed(() => store.state.login.userInfo.name)

    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }
    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.user-info {
  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }

  .user-name {
    padding-left: 6px;
    font-weight: bold;
  }
}
</style>
