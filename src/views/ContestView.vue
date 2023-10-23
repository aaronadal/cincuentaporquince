<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ContestPane from '@/components/Contest/ContestPane.vue'
import QuestionSummary from '@/components/Contest/QuestionSummary.vue'
import { storeToRefs } from 'pinia'
import { useContestStore } from '@/stores/contest'
import JokersPane from '@/components/Contest/JokersPane.vue'
import demo from '@/../public/cincuentaporquince.json'
import type { Contest } from '@/model/Contest'

const store = useContestStore()
const { selectResponse, completeResponse, useJoker, restoreJoker, setContest } = store
const { hasContest, questions, current, responses, jokers } = storeToRefs(store)

function loadDemoContest() {
  setContest(demo as Contest)
}
</script>

<template>
  <div class="page">
    <Header>
      <JokersPane 
        v-if="hasContest"
        :jokers="jokers"
        @use="(joker) => useJoker(current, joker)"
        @restore="(joker) => restoreJoker(joker)"
      />
    </Header>

    <div>
      <div class="question-summary-wrapper" v-if="hasContest">
        <QuestionSummary
          :responses="responses"
          :current-question="current"
          @goto="(idx) => (current = idx)"
        />
      </div>

      <div v-else class="no-contest">
        <div class="container text-flow" style="text-align: center;">
          <p>¡Bienvenido a cincuentaporquince!</p>
          <div class="actions">
            <a class="button" @click="loadDemoContest">Cargar partida demo</a>
            <RouterLink class="button" :to="{ name: 'config' }">Configurar una partida</RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="contest-pane-wrapper" v-if="hasContest">
      <ContestPane
        :question="questions[current]"
        :response="responses[current]"
        @select="(answer) => selectResponse(current, answer)"
        @resolve="(success) => completeResponse(current, success)"
      />
    </div>

    <Footer />
  </div>
</template>

<style scoped>
.question-summary-wrapper {
  padding-left: 1rem;

  height: calc(100dvh - 33rem);
  min-height: 10rem;
}

.contest-pane-wrapper {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.no-contest {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .actions {
    margin-top: 2em;
    display: flex;
    flex-direction: column;
  }
}
</style>
