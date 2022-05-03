import { App } from 'vue'

// import registerElement from './register-element'
import registerElementIcon from './register-element-icon'
import registerProperties from './register-properties'
import registerCh from './register-ch'

export function globalRegister(app: App): void {
  // registerElement(app)
  // 注册所有图标
  registerElementIcon(app)
  // 修改全局属性，添加全局方法
  registerProperties(app)
  // 国际化
  registerCh(app)
}
