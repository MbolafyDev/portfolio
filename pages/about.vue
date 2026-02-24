<!-- pages/about.vue -->
<script setup lang="ts">
type About = { id: number; title: string; description: string; updatedAt?: string }

// ✅ baseURL robuste (SSR + client)
const baseURL = process.server ? useRequestURL().origin : window.location.origin

const { data: about, error } = await useFetch<About>("/api/about", {
  baseURL,
})

useHead(() => ({
  title: about.value?.title || "À propos",
}))
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 py-8">
    <!-- Header -->
    <header class="mb-8 animate-fadeUp">
      <div
        class="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 py-1 text-sm text-blue-950"
      >
        <span class="h-2 w-2 rounded-full bg-orange-500"></span>
        À propos
      </div>

      <h1 class="mt-3 text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight">
        {{ about?.title || "À propos" }}
      </h1>

      <p class="mt-2 text-blue-950/70">
        Quelques informations sur moi.
      </p>
    </header>

    <!-- Debug erreur (utile en dev) -->
    <div
      v-if="error"
      class="mb-4 rounded-xl border border-red-200 bg-white p-3 text-sm text-red-700"
    >
      ❌ Erreur API /api/about :
      {{ (error as any)?.statusCode || "" }} {{ (error as any)?.message || "" }}
    </div>

    <!-- Content card -->
    <section class="grid gap-4">
      <article
        class="relative overflow-hidden rounded-2xl border border-blue-950/10 bg-white p-6 shadow-sm
               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md animate-item"
      >
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-blue-950" />

        <div class="prose max-w-none text-blue-950/80 leading-relaxed">
          <p v-if="about?.description" class="whitespace-pre-line">
            {{ about.description }}
          </p>

          <p v-else class="text-blue-950/60">
            Aucun contenu “À propos” pour le moment.
          </p>
        </div>
      </article>
    </section>

    <PrevNext class="mt-10 animate-fadeUpDelay" />
  </main>
</template>

<style scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes itemIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fadeUp { animation: fadeUp .55s ease-out both; }
.animate-fadeUpDelay { animation: fadeUp .55s ease-out .12s both; }
.animate-item { animation: itemIn .5s ease-out both; }
</style>