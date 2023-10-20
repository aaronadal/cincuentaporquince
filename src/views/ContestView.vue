<script setup lang="ts">
import Header from '@/components/Header.vue'
import ContestPane from '@/components/Contest/ContestPane.vue'
import QuestionSummary from '@/components/Contest/QuestionSummary.vue'
import { storeToRefs } from 'pinia'
import { useContestStore } from '@/stores/contest'
import JokersPane from '@/components/Contest/JokersPane.vue'

const store = useContestStore()
const { selectResponse, completeResponse, useJoker, restoreJoker } = store
const { questions, current, responses, jokers } = storeToRefs(store)
</script>

<template>
  <div class="page">
    <Header>
      <JokersPane 
        :jokers="jokers"
        @use="(joker) => useJoker(current, joker)"
        @restore="(joker) => restoreJoker(joker)"
      />
    </Header>

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
