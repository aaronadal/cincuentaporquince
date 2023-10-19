<script setup lang="ts">
interface Props {
    text: string;
}
defineProps<Props>();
</script>

<template>
    <div class="c-question">
        {{ text }}
    </div>
</template>
