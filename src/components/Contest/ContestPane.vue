<script setup lang="ts">
import Answer from '@/components/Contest/Answer.vue'
import AnswersContainer from '@/components/Contest/AnswersContainer.vue'
import Question from '@/components/Contest/Question.vue'
import QuestionContainer from '@/components/Contest/QuestionContainer.vue'
import { HalfJoker, JokerType } from '@/model/Joker'
import type { Question as QuestionModel } from '@/model/Question'
import type { Response } from '@/model/Response'
import { provide, toRefs, computed } from 'vue'

const emit = defineEmits<{
  (evt: 'select', answer: number): void
  (evt: 'resolve', success: boolean): void
}>()

interface Props {
  question: QuestionModel
  response: Response
}
const props = defineProps<Props>()
const { question, response } = toRefs(props)

provide(
  'selectedAnswer',
  computed(() => response.value.selectedAnswer)
)
provide(
  'completed',
  computed(() => response.value.completed)
)
provide(
  'success',
  computed(() => response.value.success)
)
provide(
  'hiddenAnswers',
  computed(() => {
    const halfJoker = response.value.jokers.find((joker) => joker.type === JokerType.HALF) as HalfJoker;
    if(!halfJoker) {
      return [];
    }

    return halfJoker.filterAnswers(question.value.answers);
  })
)

function onAnswerSelected(answer: number) {
  if (!response.value.completed) {
    emit('select', answer)
  }
}

function onAnswerConfirmed() {
  if (response.value.selectedAnswer === undefined) {
    throw new Error('No answer selected!')
  }

  emit('resolve', question.value.answers[response.value.selectedAnswer].correct)
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
