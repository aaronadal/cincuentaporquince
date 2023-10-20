<script setup lang="ts">
import { JokerType, type Joker } from '@/model/Joker'
import { PhPercent, PhUsersThree, PhPhoneCall } from "@phosphor-icons/vue";
import { toRefs, computed } from 'vue';

interface Props {
  joker: Joker
}
const props = defineProps<Props>()
const { joker } = toRefs(props);

const icon = computed(() => {
    if(joker.value.type === JokerType.HALF) {
        return PhPercent;
    }

    if(joker.value.type === JokerType.AUDIENCE) {
        return PhUsersThree;
    }
    
    if(joker.value.type === JokerType.CALL) {
        return PhPhoneCall;
    }

    throw new Error('Unexpected Joker type');
})
</script>

<template>
  <div 
    class="c-joker"
    :class="{
        used: joker.used
    }"
  >
    <component :is="icon" />
  </div>
</template>
