<script setup lang="ts">
import Answer from '@/components/Contest/Answer.vue'
import AnswersContainer from '@/components/Contest/AnswersContainer.vue'
import Question from '@/components/Contest/Question.vue'
import QuestionContainer from '@/components/Contest/QuestionContainer.vue'
import type { Question as QuestionModel } from '@/model/Question'
import { provide, ref, toRefs, watch } from 'vue'

interface Props {
  question: QuestionModel
}
const props = defineProps<Props>()
const { question } = toRefs(props);

const selectedAnswer = ref('')
provide('selectedAnswer', selectedAnswer)

const isResolved = ref(false)
provide('isResolved', isResolved)

watch(question, () => {
    selectedAnswer.value = '';
    isResolved.value = false;
})

function onAnswerSelected(id: string) {
  if (!isResolved.value) {
    selectedAnswer.value = id
  }
}

function onAnswerConfirmed() {
  isResolved.value = true
}
</script>

<template>
  <div class="c-contest-pane">
    <QuestionContainer>
      <Question :text="question.text" />
    </QuestionContainer>

    <AnswersContainer>
      <Answer
        v-for="(answer, idx) in question.answers"
        :key="idx"
        :id="idx"
        :text="answer.text"
        :correct="answer.correct"
        @selected="onAnswerSelected"
        @confirmed="onAnswerConfirmed"
      />
    </AnswersContainer>
  </div>
</template>
