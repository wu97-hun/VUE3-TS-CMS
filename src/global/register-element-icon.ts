import { App } from 'vue'
import { isValidKey } from '@/utils/keyValid'

import * as ElIconModules from '@element-plus/icons-vue'

export default function (app: App): void {
  Object.keys(ElIconModules).forEach((key) => {
    // app.component(key, (ElIconModules as any)[key]) ζθε¦δΈ
    if (isValidKey(key, ElIconModules)) {
      app.component(key, ElIconModules[key])
    }
  })
}
