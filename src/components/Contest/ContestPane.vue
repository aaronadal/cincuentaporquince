<script setup lang="ts">
import Answer from '@/components/Contest/Answer.vue';
import AnswersContainer from '@/components/Contest/AnswersContainer.vue';
import Question from '@/components/Contest/Question.vue';
import QuestionContainer from '@/components/Contest/QuestionContainer.vue';
import type { Question as QuestionModel } from '@/model/Question';
import { provide, ref } from 'vue';

interface Props {
    question: QuestionModel;
}
defineProps<Props>();

const selectedAnswer = ref('');
provide('selectedAnswer', selectedAnswer);

function onAnswerSelected(id: string) {
    selectedAnswer.value = id;
}
</script>

<template>
    <div class="c-contest-pane">
        <QuestionContainer>
            <Question :text="question.text" />
        </QuestionContainer>
        
        <AnswersContainer>
            <Answer v-for="(answer, idx) in question.answers" :key="idx" :id="idx" :text="answer.text" @selected="onAnswerSelected" />
        </AnswersContainer>
    </div>
</template>
