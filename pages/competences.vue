<!-- pages/competences.vue -->
<script setup lang="ts">
type Skill = {
  id: number
  name: string
  level: string
  order: number
}

const { data: skills } = await useFetch<Skill[]>("/api/skills")

const levelToPercent = (level: string) => {
  const v = String(level || "").toLowerCase()
  if (v.includes("expert")) return 95
  if (v.includes("avanc")) return 85
  if (v.includes("inter")) return 70
  if (v.includes("moy")) return 70
  if (v.includes("debut") || v.includes("début")) return 45
  return 60
}

useHead({ title: "Compétences" })
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 py-8">
    <!-- Header -->
    <header class="mb-8 animate-fadeUp">
      <div
        class="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 py-1 text-sm text-blue-950"
      >
        <span class="h-2 w-2 rounded-full bg-orange-500"></span>
        Compétences
      </div>

      <h1 class="mt-3 text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight">
        Compétences
      </h1>

      <p class="mt-2 text-blue-950/70">
        Mes compétences techniques et professionnelles.
      </p>
    </header>

    <!-- Skills -->
    <section class="space-y-3">
      <article
        v-for="(s, idx) in (skills || [])"
        :key="s.id"
        class="group rounded-2xl border border-blue-950/10 bg-white p-5 shadow-sm
               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md
               animate-item"
        :style="{ animationDelay: `${idx * 50}ms` }"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <h2 class="text-base md:text-lg font-extrabold text-blue-950 truncate">
              {{ s.name }}
            </h2>
            <p class="mt-1 text-sm text-blue-950/65">
              Niveau :
              <span class="font-semibold text-blue-950/80">{{ s.level }}</span>
            </p>
          </div>

          <span
            class="shrink-0 whitespace-nowrap rounded-full border border-orange-200 bg-amber-50
                   px-3 py-1 text-xs font-bold text-orange-700"
          >
            {{ s.level }}
          </span>
        </div>

        <!-- Progress bar -->
        <div class="mt-4">
          <div class="h-2 rounded-full bg-blue-950/10 overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-500"
              :style="{
                width: levelToPercent(s.level) + '%',
                background: 'linear-gradient(90deg, #f59e0b, #fb923c, #0b1b3a)'
              }"
            />
          </div>

          <div class="mt-2 flex justify-between text-xs text-blue-950/55">
            <span>Débutant</span>
            <span>Intermédiaire</span>
            <span>Avancé</span>
          </div>
        </div>
      </article>

      <div v-if="(skills || []).length === 0" class="rounded-2xl border p-6 bg-white text-blue-950/70">
        Aucune compétence pour le moment.
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