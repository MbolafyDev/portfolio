<!-- components/PrevNext.vue -->
 <script setup>
import { sections } from "@/data/sections"
import { useRoute } from "vue-router"

const route = useRoute()

const idx = computed(() =>
  sections.findIndex((s) => s.path === route.path)
)

const prev = computed(() => (idx.value > 0 ? sections[idx.value - 1] : null))
const next = computed(() =>
  idx.value >= 0 && idx.value < sections.length - 1 ? sections[idx.value + 1] : null
)
</script>

<template>
  <div class="mt-10 flex items-center justify-between gap-3">
    <NuxtLink v-if="prev" :to="prev.path" class="text-sm underline">
      ← {{ prev.label }}
    </NuxtLink>
    <div v-else />

    <NuxtLink v-if="next" :to="next.path" class="text-sm underline">
      {{ next.label }} →
    </NuxtLink>
  </div>
</template>