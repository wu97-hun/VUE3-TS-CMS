// 注册图标组件时出现的错误解决方案
export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object
}
