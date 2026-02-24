<!-- pages/projets/index.vue -->
<script setup lang="ts">
const { data: projets } = await useFetch("/api/portfolio/projets")
</script>

<template>
  <main style="max-width: 900px; margin: 40px auto; padding: 0 16px;">
    <h1 style="font-size: 32px; margin-bottom: 16px;">Mes projets</h1>

    <div style="display: grid; gap: 12px;">
      <ProjectCard
        v-for="p in projets"
        :key="p.slug"
        :project="p"
      />
    </div>
  </main>
  <PrevNext />
</template>