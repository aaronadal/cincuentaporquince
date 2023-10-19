<script setup lang="ts">
import type { Question } from '@/model/Question'

interface Props {
  index: number
  question: Question
  current: boolean
  resolved: boolean
}
defineProps<Props>()
</script>

<template>
  <div
    class="c-question-summary-item"
    :class="{
      current,
      resolved
    }"
  >
    Pregunta {{ index }}
  </div>
</template>
