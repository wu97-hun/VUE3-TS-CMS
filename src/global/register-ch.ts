import { App } from 'vue'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default function (app: App): void {
  app.use(ElementPlus, {
    locale: zhCn
  })
}
