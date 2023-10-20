<script setup lang="ts">
import type { Joker as JokerModel } from '@/model/Joker';
import Joker from './Joker.vue'

const emit = defineEmits<{
    (evt: 'use', joker: JokerModel): void
    (evt: 'restore', joker: JokerModel): void
}>();

interface Props {
  jokers: JokerModel[]
}
defineProps<Props>()

function onUseJocker(joker: JokerModel) {
    if(joker.used) {
        return;
    }

    emit('use', joker)
}

function onRestoreJocker(joker: JokerModel) {
    if(!joker.used) {
        return;
    }

    emit('restore', joker)
}
</script>

<template>
  <div class="c-jokers-pane">
    <Joker 
        v-for="joker in jokers"
        :key="joker.type"
        :joker="joker"
        @click="onUseJocker(joker)"
        @restore="onRestoreJocker(joker)"
    />
  </div>
</template>
