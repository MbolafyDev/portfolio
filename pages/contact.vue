<!-- pages/contact.vue -->
<script setup lang="ts">
type Contact = {
  id: number
  email: string
  phone: string
  github: string
  linkedin: string
}

const { data: c } = await useFetch<Contact>("/api/contact")

useHead({ title: "Contact" })
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 py-8">
    <!-- Header -->
    <header class="mb-8 animate-fadeUp">
      <div
        class="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 py-1 text-sm text-blue-950"
      >
        <span class="h-2 w-2 rounded-full bg-orange-500"></span>
        Contact
      </div>

      <h1 class="mt-3 text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight">
        Contact
      </h1>

      <p class="mt-2 text-blue-950/70">
        Tu peux me contacter via ces canaux.
      </p>
    </header>

    <!-- Cards -->
    <section class="grid gap-4">
      <!-- Email -->
      <a
        v-if="c?.email"
        :href="`mailto:${c.email}`"
        class="group relative overflow-hidden rounded-2xl border border-blue-950/10 bg-white p-5 shadow-sm
               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md animate-item"
      >
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-blue-950" />

        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0">
            <p class="text-sm text-blue-950/60">Email</p>
            <p class="mt-1 font-extrabold text-blue-950 truncate">{{ c.email }}</p>
          </div>

          <span
            class="shrink-0 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-amber-50
                   px-3 py-1 text-xs font-bold text-orange-700"
          >
            Envoyer
            <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </a>

      <!-- Téléphone -->
      <a
        v-if="c?.phone"
        :href="`tel:${c.phone}`"
        class="group relative overflow-hidden rounded-2xl border border-blue-950/10 bg-white p-5 shadow-sm
               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md animate-item"
        style="animation-delay: 60ms;"
      >
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-blue-950" />

        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0">
            <p class="text-sm text-blue-950/60">Téléphone</p>
            <p class="mt-1 font-extrabold text-blue-950 truncate">{{ c.phone }}</p>
          </div>

          <span
            class="shrink-0 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-amber-50
                   px-3 py-1 text-xs font-bold text-orange-700"
          >
            Appeler
            <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </a>

      <!-- GitHub -->
      <a
        v-if="c?.github"
        :href="c.github"
        target="_blank"
        rel="noopener"
        class="group relative overflow-hidden rounded-2xl border border-blue-950/10 bg-white p-5 shadow-sm
               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md animate-item"
        style="animation-delay: 120ms;"
      >
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-blue-950" />

        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0">
            <p class="text-sm text-blue-950/60">GitHub</p>
            <p class="mt-1 font-extrabold text-blue-950 underline decoration-orange-300 decoration-2 underline-offset-4">
              Voir le profil
            </p>
          </div>

          <span class="text-blue-950/60 font-bold transition-colors group-hover:text-orange-600">
            ↗
          </span>
        </div>
      </a>

      <!-- LinkedIn -->
      <a
        v-if="c?.linkedin"
        :href="c.linkedin"
        target="_blank"
        rel="noopener"
        class="group relative overflow-hidden rounded-2xl border border-blue-950/10 bg-white p-5 shadow-sm
               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md animate-item"
        style="animation-delay: 180ms;"
      >
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-blue-950" />

        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0">
            <p class="text-sm text-blue-950/60">LinkedIn</p>
            <p class="mt-1 font-extrabold text-blue-950 underline decoration-orange-300 decoration-2 underline-offset-4">
              Voir le profil
            </p>
          </div>

          <span class="text-blue-950/60 font-bold transition-colors group-hover:text-orange-600">
            ↗
          </span>
        </div>
      </a>

      <div v-if="!c?.email && !c?.phone && !c?.github && !c?.linkedin" class="rounded-2xl border p-6 bg-white text-blue-950/70">
        Aucun contact pour le moment.
      </div>
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