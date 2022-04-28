import { App } from 'vue'

// import registerElement from './register-element'
import registerElementIcon from './register-element-icon'

export function globalRegister(app: App): void {
  // registerElement(app)
  registerElementIcon(app)
}
