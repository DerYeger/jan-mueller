<script setup lang="ts">
import { computed } from 'vue'
import { CLASSES } from '@components/ui/classes'
import { cn } from '@components/ui/cn'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    disabled?: boolean
  }>(),
  {
    size: 'md',
    disabled: false,
  },
)

const modelValue = defineModel<boolean>({ required: true })

function handleChange(event: Event) {
  modelValue.value = (event.target as HTMLInputElement).checked
}
</script>

<template>
  <input
    type="checkbox"
    :class="cn(CLASSES.CHECKBOX)"
    :checked="modelValue"
    :disabled="disabled"
    @change="handleChange"
  />
</template>
