<script setup lang="ts">
import { ref } from 'vue'

type UploadPayload =
  | { kind: 'csv'; content: string }
  | { kind: 'xlsx'; data: ArrayBuffer; fileName: string }

const emit = defineEmits<{
  upload: [payload: UploadPayload]
}>()

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  isDragging.value = true
}

function handleDragLeave() {
  isDragging.value = false
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false

  const file = e.dataTransfer?.files[0]
  if (file) {
    readFile(file)
  }
}

function handleFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    readFile(file)
  }
}

function readFile(file: File) {
  const lowerName = file.name.toLowerCase()
  const isCsv = lowerName.endsWith('.csv') || file.type === 'text/csv'
  const isXlsx =
    lowerName.endsWith('.xlsx') ||
    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

  if (!isCsv && !isXlsx) {
    alert('Please upload a CSV or XLSX file')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target?.result
    if (isCsv && typeof content === 'string') {
      emit('upload', { kind: 'csv', content })
    }
    if (isXlsx && content instanceof ArrayBuffer) {
      emit('upload', { kind: 'xlsx', data: content, fileName: file.name })
    }
  }

  if (isXlsx) {
    reader.readAsArrayBuffer(file)
    return
  }

  reader.readAsText(file)
}

function triggerFileInput() {
  fileInput.value?.click()
}
</script>

<template>
  <div
    class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-medium bg-base p-8 transition-all hocus:border-neutral-500 hocus:bg-neutral-100 dark:hocus:bg-neutral-800"
    :class="{ 'border-neutral-500 bg-neutral-100 dark:bg-neutral-800': isDragging }"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    @click="triggerFileInput"
  >
    <input
      ref="fileInput"
      type="file"
      accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      class="hidden"
      @change="handleFileSelect"
    />
    <div class="pointer-events-none flex flex-col items-center gap-3">
      <svg
        class="size-10 text-lighter"
        :class="{ 'text-strong': isDragging }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" x2="12" y1="3" y2="15" />
      </svg>
      <p class="m-0 flex flex-col items-center gap-1">
        <span class="font-medium text-strong text-center">Drop CSV or XLSX file</span>
        <span class="text-sm text-lighter">or click to browse</span>
      </p>
    </div>
  </div>
</template>
