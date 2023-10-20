<script setup lang="ts">
import QuestionSummaryItem from '@/components/Contest/QuestionSummaryItem.vue'
import type { Response } from '@/model/Response';

const emit = defineEmits<{
  (evt: 'goto', idx: number): void
}>()

interface Props {
  responses: Response[]
  currentQuestion: number
}
defineProps<Props>()
</script>

<template>
  <div class="c-question-summary">
    <QuestionSummaryItem
      v-for="(response, idx) in responses"
      :key="idx"
      :index="idx + 1"
      :current="currentQuestion === idx"
      :response="response"
      @click="emit('goto', idx)"
    />
  </div>
</template>
