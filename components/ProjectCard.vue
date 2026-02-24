<!-- components/ProjectCard.vue -->
<script setup>
defineProps({
  project: { type: Object, required: true }
})
</script>

<template>
  <article
    class="group relative overflow-hidden rounded-2xl border border-blue-950/10 bg-white
           p-5 shadow-sm transition-all duration-300
           hover:-translate-y-1 hover:shadow-md"
  >
    <!-- bandeau gradient (signature) -->
    <div class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-blue-950" />

    <!-- glow discret au hover -->
    <div
      class="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl opacity-0
             transition-opacity duration-300 group-hover:opacity-25"
      style="background: radial-gradient(circle, #fb923c 0%, transparent 60%);"
    />

    <!-- contenu -->
    <div class="relative">
      <h2 class="text-lg md:text-xl font-extrabold text-blue-950 tracking-tight">
        {{ project.title }}
      </h2>

      <p class="mt-2 text-sm md:text-[15px] text-blue-950/70 leading-relaxed">
        {{ project.description }}
      </p>

      <div class="mt-4 flex items-center justify-between">
        <NuxtLink
          :to="`/projets/${project.slug}`"
          class="inline-flex items-center gap-2 text-sm font-semibold text-blue-950
                 transition-colors duration-200 group-hover:text-orange-600"
        >
          Voir détails
          <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </NuxtLink>

        <!-- petit badge "Recent" (optionnel) -->
        <span
          class="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-amber-50 px-3 py-1
                 text-xs font-bold text-orange-700"
        >
          <span class="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          Recent
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* animation d’entrée douce (classique) */
article {
  animation: cardIn 0.55s ease-out both;
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(10px) scale(0.99); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
</style>