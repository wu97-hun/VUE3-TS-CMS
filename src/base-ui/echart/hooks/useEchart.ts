import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

// json格式不识别需在 shims-vue.d.ts 中声明
import ChinaMapData from '../data/china.json'

// 注册中国地图数据
echarts.registerMap('china', ChinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: EChartsOption) => {
    echartInstance.setOption(options)
  }

  const updateSize = () => {
    echartInstance.resize()
  }

  // 窗口缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
