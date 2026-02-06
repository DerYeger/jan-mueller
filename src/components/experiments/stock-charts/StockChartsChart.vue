<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
import type { EChartsOption, SeriesOption } from 'echarts'
import type { EChartsType } from 'echarts/core'
import type { ChartData, SeriesConfig, ChartSettings } from './stockChartsData'
import { formatDateLabel } from './stockChartsData'

// Register ECharts components
use([SVGRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent])

const props = defineProps<{
  chartData: ChartData
  seriesConfigs: SeriesConfig[]
  chartSettings: ChartSettings
}>()

type VChartRef = InstanceType<typeof VChart> & {
  getEchartsInstance?: () => EChartsType
  chart?: EChartsType
}

const chartRef = ref<VChartRef | null>(null)
const initOptions = { renderer: 'svg' as const }
const updateOptions = { notMerge: true, replaceMerge: ['series'] }
const isDark = ref(false)
let themeObserver: MutationObserver | null = null

const palette = computed(() =>
  isDark.value
    ? {
        tooltipBg: '#111111',
        tooltipBorder: '#262626',
        tooltipText: '#fafafa',
        axisLine: '#3f3f3f',
        axisLabel: '#a3a3a3',
        grid: '#262626',
        legend: '#d4d4d4',
      }
    : {
        tooltipBg: '#ffffff',
        tooltipBorder: '#e5e5e5',
        tooltipText: '#171717',
        axisLine: '#d4d4d4',
        axisLabel: '#525252',
        grid: '#e5e5e5',
        legend: '#525252',
      },
)

function updateTheme() {
  isDark.value = document.documentElement.classList.contains('dark')
}

onMounted(() => {
  updateTheme()
  themeObserver = new MutationObserver(updateTheme)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

onBeforeUnmount(() => {
  themeObserver?.disconnect()
  themeObserver = null
})

const chartOption = computed<EChartsOption>(() => {
  const xAxisData = props.chartData.dates.map((d) => formatDateLabel(d))
  const colors = palette.value

  const series: SeriesOption[] = props.seriesConfigs
    .filter((config) => config.visible)
    .map((config) => {
      const seriesData = props.chartData.series.find((s) => s.name === config.name)
      if (!seriesData) return null

      return {
        name: config.name,
        type: 'line',
        data: seriesData.values,
        smooth: config.smooth ? 0.2 : false,
        showSymbol: config.showPoints,
        symbol: 'circle',
        symbolSize: 6,
        connectNulls: true,
        lineStyle: {
          color: config.color,
          width: 2,
        },
        itemStyle: {
          color: config.color,
        },
      } as SeriesOption
    })
    .filter((s): s is SeriesOption => s !== null)

  return {
    backgroundColor: 'transparent',
    grid: {
      left: 60,
      right: 0,
      top: 40,
      bottom: 40,
      containLabel: false,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: colors.tooltipBg,
      borderColor: colors.tooltipBorder,
      textStyle: {
        color: colors.tooltipText,
      },
    },
    legend: {
      show: props.chartSettings.showLegend,
      top: 8,
      right: 20,
      textStyle: {
        color: colors.legend,
        fontSize: 12,
      },
    },
    xAxis: {
      show: props.chartSettings.showXAxis,
      type: 'category',
      data: xAxisData,
      boundaryGap: false,
      min: 0,
      max: Math.max(0, xAxisData.length - 1),
      axisLine: {
        lineStyle: {
          color: colors.axisLine,
        },
      },
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        color: colors.axisLabel,
        fontSize: 11,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      show: props.chartSettings.showYAxis,
      type: 'value',
      min: props.chartData.yMin,
      max: props.chartData.yMax,
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: colors.axisLabel,
        fontSize: 11,
      },
      splitLine: {
        show: props.chartSettings.showGridLines,
        lineStyle: {
          color: colors.grid,
          type: 'dashed',
        },
      },
    },
    series,
  }
})

function exportSvg(): string | null {
  const instance = chartRef.value?.getEchartsInstance?.() ?? chartRef.value?.chart
  if (!instance) return null
  return instance.getDataURL({ type: 'svg', pixelRatio: 1, backgroundColor: 'transparent' })
}

defineExpose({ exportSvg })
</script>

<template>
  <VChart
    ref="chartRef"
    class="size-full"
    :option="chartOption"
    :init-options="initOptions"
    :update-options="updateOptions"
    autoresize
  />
</template>
