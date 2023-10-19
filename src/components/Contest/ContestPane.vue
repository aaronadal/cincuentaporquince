<script setup lang="ts">
import Answer from '@/components/Contest/Answer.vue';
import AnswersContainer from '@/components/Contest/AnswersContainer.vue';
import Question from '@/components/Contest/Question.vue';
import QuestionContainer from '@/components/Contest/QuestionContainer.vue';
import { provide, ref } from 'vue';

const selectedAnswer = ref('');
provide('selectedAnswer', selectedAnswer);

function onAnswerSelected(id: string) {
    selectedAnswer.value = id;
}
</script>

<template>
    <div class="c-contest-pane">
        <QuestionContainer>
            <Question />
        </QuestionContainer>
        
        <AnswersContainer>
            <Answer id="A" @selected="onAnswerSelected" />
            <Answer id="B" @selected="onAnswerSelected" />
            <Answer id="C" @selected="onAnswerSelected" />
            <Answer id="D" @selected="onAnswerSelected" />
        </AnswersContainer>
    </div>
</template>
