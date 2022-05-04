import { useStore } from '@/store'

export function usePermission(pageName: string, handlerName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handlerName}`
  // 返回一个布尔值
  return !!permissions.find((item) => item === verifyPermission)
}
