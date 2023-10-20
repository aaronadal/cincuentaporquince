<script setup lang="ts">
import type { Response } from '@/model/Response'

interface Props {
  index: number
  response: Response
  current: boolean
}
defineProps<Props>()
</script>

<template>
  <div
    class="c-question-summary-item"
    :class="{
      current,
      success: response.completed && response.success,
      error: response.completed && !response.success
    }"
  >
    Pregunta {{ index }}
  </div>
</template>
