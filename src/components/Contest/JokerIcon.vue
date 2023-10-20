<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { JokerType } from '@/model/Joker'
import { PhPercent, PhUsersThree, PhPhoneCall } from "@phosphor-icons/vue";

interface Props {
  type: JokerType
}
const props = defineProps<Props>()
const { type } = toRefs(props);

const icon = computed(() => {
    if(type.value === JokerType.HALF) {
        return PhPercent;
    }

    if(type.value === JokerType.AUDIENCE) {
        return PhUsersThree;
    }
    
    if(type.value === JokerType.CALL) {
        return PhPhoneCall;
    }

    throw new Error('Unexpected Joker type');
});
</script>

<template>
    <component :is="icon" />
</template>
