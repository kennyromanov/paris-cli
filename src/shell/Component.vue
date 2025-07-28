<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { mountRemoteComponent } from '@kennyromanov/paris';

const el = ref<any>(null);

onMounted(async () => {
  const module = await import('dev/app');
  const component = module?.default ?? null;

  mountRemoteComponent(component, el.value);
});

</script>

<template>
  <div class="paris_app" ref="el" />
</template>

<style scoped>

.paris_app {
  width: 100%;
  height: 100%;
}

</style>