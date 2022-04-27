<template>
  <div class="login-account">
    <el-form
      ref="ruleFormRef"
      :model="account"
      :rules="rules"
      label-width="70px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号：" prop="name">
        <el-input v-model="account.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="account.password" autocomplete="off" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import type { FormInstance } from 'element-plus'
// 导入缓存工具
import LocalCache from '@/utils/cache'
// 使用vuex实例
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    // 获取vuex实例
    const store = useStore()
    // 给表单设置的ref
    const ruleFormRef = ref<FormInstance>()

    const account = reactive({
      // 如果为 undefined 则赋值 ''
      name: LocalCache.getCache('name') ?? '',
      password: LocalCache.getCache('password') ?? ''
    })

    const loginAction = (isKeepPassword: boolean) => {
      // 表单固定用法
      ruleFormRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            // 本地缓存
            LocalCache.setCache('name', account.name)
            LocalCache.setCache('password', account.password)
          } else {
            LocalCache.deleteCache('name')
            LocalCache.deleteCache('password')
          }
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return {
      ruleFormRef,
      account,
      rules,
      loginAction
    }
  }
})
</script>

<style lang="less" scoped></style>
