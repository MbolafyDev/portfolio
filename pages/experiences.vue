<script setup lang="ts">
// ✅ Version dynamique (DB) : remplace "@/data/portfolio"
const { data: experiences } = await useFetch("/api/portfolio/experiences")
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 py-8">
    <!-- Header -->
    <header class="mb-8 animate-fadeUp">
      <div
        class="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 py-1 text-sm text-blue-950"
      >
        <span class="h-2 w-2 rounded-full bg-orange-500"></span>
        Expériences
      </div>

      <h1 class="mt-3 text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight">
        Expériences
      </h1>

      <p class="mt-2 text-blue-950/70">
        Mes expériences professionnelles et missions principales.
      </p>
    </header>

    <!-- Timeline -->
    <section class="relative">
      <!-- ligne verticale -->
      <div class="absolute left-4 top-0 bottom-0 w-px bg-blue-950/10"></div>

      <div class="space-y-4">
        <article
          v-for="(item, idx) in (experiences || [])"
          :key="item.id"
          class="relative pl-12 animate-item"
          :style="{ animationDelay: `${idx * 70}ms` }"
        >
          <!-- point -->
          <div class="absolute left-[9px] top-6">
            <div class="h-3.5 w-3.5 rounded-full bg-orange-500 shadow-sm"></div>
            <div class="mt-2 h-6 w-[2px] bg-gradient-to-b from-orange-500/50 to-transparent mx-auto"></div>
          </div>

          <!-- card -->
          <div
            class="group rounded-2xl border border-blue-950/10 bg-white p-5 shadow-sm
                   transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <!-- top accent line -->
            <div class="h-1 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-blue-950 mb-4"></div>

            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div class="min-w-0">
                <h2 class="text-lg md:text-xl font-extrabold text-blue-950 leading-snug">
                  {{ item.company }}
                </h2>

                <p class="mt-1 text-blue-950/80 font-semibold">
                  {{ item.role }}
                </p>

                <!-- points -->
                <ul v-if="item.points?.length" class="mt-3 space-y-2 text-blue-950/70">
                  <li v-for="(p, i) in item.points" :key="i" class="flex gap-2">
                    <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"></span>
                    <span class="leading-relaxed">{{ p }}</span>
                  </li>
                </ul>
              </div>

              <!-- period badge -->
              <span
                class="w-fit shrink-0 whitespace-nowrap rounded-full border border-orange-200 bg-amber-50
                       px-3 py-1 text-xs font-bold text-orange-700"
              >
                {{ item.period }}
              </span>
            </div>

            <div class="mt-4 flex items-center justify-between text-sm">
              <span class="text-blue-950/60">Expérience</span>
              <span class="text-blue-950/70 group-hover:text-orange-600 transition-colors">
                Voir plus →
              </span>
            </div>
          </div>
        </article>

        <!-- Empty state -->
        <div
          v-if="(experiences || []).length === 0"
          class="rounded-2xl border border-blue-950/10 bg-white p-6 text-blue-950/70"
        >
          Aucune expérience pour le moment.
        </div>
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