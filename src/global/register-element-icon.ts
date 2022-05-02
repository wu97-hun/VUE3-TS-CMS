import { App } from 'vue'
import { isValidKey } from '@/utils/keyValid'

import * as ElIconModules from '@element-plus/icons-vue'

export default function (app: App): void {
  Object.keys(ElIconModules).forEach((key) => {
    if (isValidKey(key, ElIconModules)) {
      app.component(key, ElIconModules[key])
    }
  })
}
