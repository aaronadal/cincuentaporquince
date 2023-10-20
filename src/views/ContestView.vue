<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import ContestPane from '@/components/Contest/ContestPane.vue'
import QuestionSummary from '@/components/Contest/QuestionSummary.vue'
import { storeToRefs } from 'pinia'
import { useContestStore } from '@/stores/contest'

const store = useContestStore();
const { selectResponse, completeResponse } = store;
const { questions, current, responses } = storeToRefs(store);
</script>

<template>
  <div class="page">
    <header>
      <Logo />
    </header>

    <div>
      <div class="question-summary-wrapper">
        <QuestionSummary
          :responses="responses"
          :current-question="current"
          @goto="(idx) => (current = idx)"
        />
      </div>
    </div>

    <div class="contest-pane-wrapper">
      <ContestPane 
        :question="questions[current]"
        :response="responses[current]"
        @select="(answer) => selectResponse(current, answer)"
        @resolve="(success) => completeResponse(current, success)"
      />
    </div>
  </div>
</template>

<style scoped>
.question-summary-wrapper {
  padding-left: 1rem;
}

.contest-pane-wrapper {
  padding-bottom: 2rem;
}
</style>
