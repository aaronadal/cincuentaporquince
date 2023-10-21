<script setup lang="ts">
import JokerIcon from './JokerIcon.vue'
import { Joker } from '@/model/Joker'
import { PhArrowCounterClockwise } from "@phosphor-icons/vue";
import { toRefs } from 'vue';

const emit = defineEmits<{
    (evt: 'restore'): void
}>();

interface Props {
  joker: Joker
}
const props = defineProps<Props>()
const { joker } = toRefs(props);
</script>

<template>
  <div 
    class="c-joker"
    :class="{
        used: joker.used
    }"
  >
    <div class="inner">
        <JokerIcon :type="joker.type" />
    </div>  
    <div class="restore" v-if="joker.used" @click.stop="emit('restore')">
        <PhArrowCounterClockwise />
    </div>
  </div>
</template>
