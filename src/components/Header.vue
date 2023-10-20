<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import { PhGear, PhQuestion } from "@phosphor-icons/vue";
</script>

<template>
  <header>
    <RouterLink :to="{name: 'home'}">
      <Logo />
    </RouterLink>

      <div>
        <slot />
      </div>

      <div class="help-pane">
        <RouterLink :to="{name: 'config'}">
          <PhGear />
        </RouterLink>
        <RouterLink :to="{name: 'help'}">
          <PhQuestion />
        </RouterLink>
      </div>
    </header>
</template>

<style lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
}

.help-pane {
  font-size: 2rem;
  display: flex;
  gap: .5rem;
  padding: 1rem;
}
</style>
