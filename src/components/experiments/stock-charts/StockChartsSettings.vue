<script setup lang="ts">
import type { SeriesConfig, AxisOverrides, ChartData, ChartSettings } from './stockChartsData'
import { computed } from 'vue'
import StockChartsCheckbox from './StockChartsCheckbox.vue'
import { CLASSES } from '@components/ui/classes'
import { cn } from '@components/ui/cn'

const props = defineProps<{
  seriesConfigs: SeriesConfig[]
  axisOverrides: AxisOverrides
  chartData: ChartData | null
  chartSettings: ChartSettings
}>()

const emit = defineEmits<{
  'update:seriesConfigs': [configs: SeriesConfig[]]
  'update:axisOverrides': [overrides: AxisOverrides]
  'update:chartSettings': [settings: ChartSettings]
  reset: []
  export: []
}>()

const hasData = computed(() => props.chartData !== null)

function updateSeriesConfig(index: number, updates: Partial<SeriesConfig>) {
  const newConfigs = [...props.seriesConfigs]
  newConfigs[index] = { ...newConfigs[index], ...updates }
  emit('update:seriesConfigs', newConfigs)
}

function updateAxisOverride<K extends keyof AxisOverrides>(
  key: K,
  value: AxisOverrides[K] | undefined,
) {
  emit('update:axisOverrides', {
    ...props.axisOverrides,
    [key]: value,
  })
}

function updateChartSetting<K extends keyof ChartSettings>(key: K, value: ChartSettings[K]) {
  emit('update:chartSettings', {
    ...props.chartSettings,
    [key]: value,
  })
}

function handleYMinChange(e: Event) {
  const value = (e.target as HTMLInputElement).value
  updateAxisOverride('yMin', value ? Number(value) : undefined)
}

function handleYMaxChange(e: Event) {
  const value = (e.target as HTMLInputElement).value
  updateAxisOverride('yMax', value ? Number(value) : undefined)
}

function resetSettings() {
  emit('reset')
}

function exportSvg() {
  emit('export')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h3 class="m-0 text-base font-semibold text-strong">Settings</h3>
      <div v-if="hasData" class="flex items-center gap-2">
        <button
          class="focus-visible:focus-ring cursor-pointer rounded border border-medium bg-neutral-900 px-3 py-1 text-xs text-white transition-all hocus:brightness-110 dark:bg-neutral-100 dark:text-neutral-900"
          @click="exportSvg"
        >
          Export
        </button>
        <button
          class="focus-visible:focus-ring cursor-pointer rounded border border-medium bg-transparent px-3 py-1 text-xs text-lighter transition-all hocus:text-strong"
          @click="resetSettings"
        >
          Reset
        </button>
      </div>
    </div>

    <div v-if="!hasData" class="p-4 text-center text-sm text-lighter">
      Upload a CSV or XLSX file to configure chart settings
    </div>

    <template v-else>
      <!-- Display Mode -->
      <section class="flex flex-col gap-2">
        <h4 class="m-0 text-xs font-medium uppercase tracking-wide text-lighter">Display Mode</h4>
        <label class="flex cursor-pointer items-center gap-2">
          <StockChartsCheckbox
            :model-value="chartSettings.showRelativeChanges"
            @update:model-value="(value) => updateChartSetting('showRelativeChanges', value)"
          />
          <span class="text-sm text-medium">Relative Changes (%)</span>
        </label>
        <label class="flex cursor-pointer items-center gap-2">
          <StockChartsCheckbox
            :model-value="chartSettings.skipEmptyRows"
            @update:model-value="(value) => updateChartSetting('skipEmptyRows', value)"
          />
          <span class="text-sm text-medium">Skip Empty</span>
        </label>
        <label class="flex cursor-pointer items-center gap-2">
          <StockChartsCheckbox
            :model-value="chartSettings.showLegend"
            @update:model-value="(value) => updateChartSetting('showLegend', value)"
          />
          <span class="text-sm text-medium">Legend</span>
        </label>
        <label class="flex cursor-pointer items-center gap-2">
          <StockChartsCheckbox
            :model-value="chartSettings.showXAxis"
            @update:model-value="(value) => updateChartSetting('showXAxis', value)"
          />
          <span class="text-sm text-medium">X-Axis</span>
        </label>
        <label class="flex cursor-pointer items-center gap-2">
          <StockChartsCheckbox
            :model-value="chartSettings.showYAxis"
            @update:model-value="(value) => updateChartSetting('showYAxis', value)"
          />
          <span class="text-sm text-medium">Y-Axis</span>
        </label>
        <label class="flex cursor-pointer items-center gap-2">
          <StockChartsCheckbox
            :model-value="chartSettings.showGridLines"
            @update:model-value="(value) => updateChartSetting('showGridLines', value)"
          />
          <span class="text-sm text-medium">Grid Lines</span>
        </label>
      </section>

      <!-- Y-Axis Range -->
      <section class="flex flex-col gap-2">
        <h4 class="m-0 text-xs font-medium uppercase tracking-wide text-lighter">Y-Axis Range</h4>
        <div class="flex flex-col gap-2">
          <div class="flex flex-1 flex-col gap-1">
            <label class="text-xs text-lighter">Min</label>
            <input
              type="number"
              :class="cn(CLASSES.INPUT)"
              :value="axisOverrides.yMin ?? ''"
              :placeholder="chartData?.yMin.toFixed(2)"
              @change="handleYMinChange"
            />
          </div>
          <div class="flex flex-1 flex-col gap-1">
            <label class="text-xs text-lighter">Max</label>
            <input
              type="number"
              :class="cn(CLASSES.INPUT)"
              :value="axisOverrides.yMax ?? ''"
              :placeholder="chartData?.yMax.toFixed(2)"
              @change="handleYMaxChange"
            />
          </div>
        </div>
      </section>

      <!-- Series -->
      <section class="flex flex-col gap-2">
        <h4 class="m-0 text-xs font-medium uppercase tracking-wide text-lighter">Series</h4>
        <div class="flex flex-col gap-3">
          <div
            v-for="(config, index) in seriesConfigs"
            :key="config.name"
            class="flex flex-col gap-2 rounded-lg border border-medium bg-neutral-100/80 p-2 dark:bg-neutral-900/60"
          >
            <!-- Series visibility toggle -->
            <div class="flex items-center">
              <label class="flex cursor-pointer items-center gap-2">
                <StockChartsCheckbox
                  :model-value="config.visible"
                  @update:model-value="(value) => updateSeriesConfig(index, { visible: value })"
                />
                <span class="text-sm font-medium text-strong">{{ config.name }}</span>
              </label>
            </div>

            <!-- Series options (when visible) -->
            <div v-if="config.visible" class="flex flex-wrap gap-3 pl-6">
              <!-- Color picker -->
              <div class="flex items-center gap-2">
                <label class="text-xs text-lighter">Color</label>
                <input
                  type="color"
                  :class="cn(CLASSES.INPUT, 'h-6 w-8 cursor-pointer p-0')"
                  :value="config.color"
                  @change="
                    (e) =>
                      updateSeriesConfig(index, { color: (e.target as HTMLInputElement).value })
                  "
                />
              </div>

              <!-- Line style -->
              <div class="flex items-center gap-2">
                <label class="text-xs text-lighter">Line</label>
                <select
                  :class="cn(CLASSES.INPUT)"
                  :value="config.smooth ? 'smooth' : 'hard'"
                  @change="
                    (e) =>
                      updateSeriesConfig(index, {
                        smooth: (e.target as HTMLSelectElement).value === 'smooth',
                      })
                  "
                >
                  <option value="hard">Hard</option>
                  <option value="smooth">Smooth</option>
                </select>
              </div>

              <!-- Show points -->
              <label class="flex cursor-pointer items-center gap-2">
                <StockChartsCheckbox
                  :model-value="config.showPoints"
                  @update:model-value="(value) => updateSeriesConfig(index, { showPoints: value })"
                />
                <span class="text-xs text-lighter">Points</span>
              </label>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
