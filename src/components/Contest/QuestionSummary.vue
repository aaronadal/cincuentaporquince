<script setup lang="ts">
import type { Question } from '@/model/Question'
import QuestionSummaryItem from '@/components/Contest/QuestionSummaryItem.vue'

const emit = defineEmits<{
    (evt: 'goto', idx: number): void;
}>();

interface Props {
  questions: Question[]
  currentQuestion: number
}
defineProps<Props>()
</script>

<template>
  <div class="c-question-summary">
    <QuestionSummaryItem
      v-for="(question, idx) in questions"
      :key="idx"
      :index="idx + 1"
      :current="currentQuestion === idx"
      :resolved="false"
      :question="question"
      @click="emit('goto', idx)"
    />
  </div>
</template>
