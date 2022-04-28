import { App } from 'vue'

import * as ElIconModules from '@element-plus/icons-vue'

export default function (app: App): void {
  for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
      const item = ElIconModules[iconName]
      app.component(iconName, item)
    }
  }
}
