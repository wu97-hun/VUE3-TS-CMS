<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <wj-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </wj-card>
      </el-col>
      <el-col :span="10">
        <wj-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </wj-card>
      </el-col>
      <el-col :span="7">
        <wj-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </wj-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <wj-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </wj-card>
      </el-col>
      <el-col :span="12">
        <wj-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </wj-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts" name="dashboard">
import { computed } from 'vue'
import { useStore } from '@/store'

import WjCard from '@/base-ui/card'

import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

const store = useStore()

store.dispatch('dashboard/getDashboardDataAction')

// 获取数据
const categoryGoodsCount = computed(() => {
  return store.state.dashboard.categoryGoodsCount.map((item: any) => {
    return { name: item.name, value: item.goodsCount }
  })
})
const categoryGoodsSale = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
  for (const item of categoryGoodsSale) {
    xLabels.push(item.name)
    values.push(item.goodsCount)
  }
  return { xLabels, values }
})
const categoryGoodsFavor = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
  for (const item of categoryGoodsFavor) {
    xLabels.push(item.name)
    values.push(item.goodsFavor)
  }
  return { xLabels, values }
})
const addressGoodsSale = computed(() => {
  return store.state.dashboard.addressGoodsSale.map((item: any) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
