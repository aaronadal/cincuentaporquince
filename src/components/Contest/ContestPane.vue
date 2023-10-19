<script setup lang="ts">
import Answer from '@/components/Contest/Answer.vue';
import AnswersContainer from '@/components/Contest/AnswersContainer.vue';
import Question from '@/components/Contest/Question.vue';
import QuestionContainer from '@/components/Contest/QuestionContainer.vue';
</script>

<template>
    <div class="c-contest-pane">
        <QuestionContainer>
            <Question />
        </QuestionContainer>
        
        <AnswersContainer>
            <Answer />
            <Answer />
            <Answer />
            <Answer />
        </AnswersContainer>
    </div>
</template>
