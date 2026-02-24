<script setup lang="ts">
const emptyProfile = {
  photo: "",
  name: "",
  title: "",
  location: "",
  intro: "",
  cvUrl: "",
}

// IMPORTANT: on ne compte pas uniquement sur default quand l’API renvoie une erreur.
// On met un computed "safeProfile" qui garantit toujours un objet.
const { data: profile, pending: profilePending, error: profileError } =
  await useFetch("/api/portfolio/profile")

const safeProfile = computed(() => profile.value ?? emptyProfile)

const { data: projets, pending: projetsPending, error: projetsError } =
  await useFetch("/api/portfolio/projets", {
    default: () => [],
  })

const recentProjets = computed(() => (projets.value || []).slice(0, 4))

const { isAdmin } = useAdminBypass()
</script>

<template>
  <main class="relative">
    <!-- Background décor -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        class="absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl opacity-30"
        style="background: radial-gradient(circle, #f59e0b 0%, transparent 60%);"
      />
      <div
        class="absolute top-40 -left-24 h-96 w-96 rounded-full blur-3xl opacity-25"
        style="background: radial-gradient(circle, #0b1b3a 0%, transparent 60%);"
      />
      <div class="absolute inset-0 bg-white" />
    </div>

    <!-- HERO -->
    <section
      class="relative rounded-3xl border bg-white/70 backdrop-blur-xl shadow-sm p-6 md:p-10 overflow-hidden
             animate-fadeUp"
    >
      <!-- mini bandeau classique -->
      <div class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-blue-950" />

      <div class="flex flex-col md:flex-row gap-8 items-start">
        <!-- Photo -->
        <div class="relative">
          <div
            class="absolute -inset-1 rounded-3xl blur opacity-40"
            style="background: linear-gradient(135deg, #f59e0b, #fb923c, #0b1b3a);"
          />

          <img
            :src="safeProfile.photo || '/img/profile.png'"
            alt="Photo de profil"
            class="relative w-28 h-28 md:w-32 md:h-32 rounded-3xl object-cover border border-blue-950/10
                   shadow-md animate-float"
          />
        </div>

        <!-- Intro -->
        <div class="flex-1">
          <!-- badge -->
          <div
            class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm
                   bg-white/80 text-blue-950 shadow-sm animate-fadeIn"
          >
            <span class="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            Disponible pour opportunités
          </div>

          <h1
            class="mt-4 text-3xl md:text-5xl font-extrabold leading-tight text-blue-950
                   animate-fadeUpDelay"
          >
            <span class="relative">
              <span class="bg-gradient-to-r from-amber-500 via-orange-500 to-blue-950 bg-clip-text text-transparent">
                {{ safeProfile.name }}
              </span>
            </span>
          </h1>

          <p class="mt-3 text-base md:text-lg text-blue-950/70 animate-fadeUpDelay2">
            {{ safeProfile.title }} • {{ safeProfile.location }}
          </p>

          <p class="mt-5 text-blue-950/75 leading-relaxed max-w-2xl animate-fadeUpDelay3">
            {{ safeProfile.intro }}
          </p>

          <div class="mt-7 flex gap-3 flex-wrap animate-fadeUpDelay4">
            <a :href="safeProfile.cvUrl" download class="group">
              <BaseButton variant="primary" class="btn-primary">
                Télécharger mon CV
                <span class="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </BaseButton>
            </a>

            <NuxtLink to="/projets" class="group">
              <BaseButton class="btn-secondary">
                Voir mes projets
                <span class="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </BaseButton>
            </NuxtLink>
          </div>

          <!-- Optionnel : afficher un message si profile API est en erreur -->
          <p v-if="profileError" class="mt-4 text-sm text-red-600">
            Impossible de charger le profil (API). Affichage des valeurs par défaut.
          </p>
        </div>
      </div>
    </section>

    <!-- PROJETS RECENTS -->
    <section class="mt-10 animate-fadeUpDelay5">
      <div class="flex items-end justify-between gap-4 mb-4">
        <div>
          <h2 class="text-xl md:text-2xl font-bold text-blue-950">Projets récents</h2>
          <p class="text-blue-950/70 mt-1">Un aperçu de mes derniers travaux.</p>
        </div>

        <NuxtLink
          to="/projets"
          class="text-sm font-semibold text-blue-950 hover:text-orange-600 transition-colors"
        >
          Tout voir →
        </NuxtLink>
      </div>

      <!-- Optionnel : message si projets API est en erreur -->
      <p v-if="projetsError" class="mb-3 text-sm text-red-600">
        Impossible de charger les projets.
      </p>

      <div class="grid gap-4 md:grid-cols-2">
        <ProjectCard
          v-for="p in recentProjets"
          :key="p.slug"
          :project="p"
          class="animate-cardIn"
        />
      </div>
    </section>

    <PrevNext class="mt-10 animate-fadeUpDelay6" />
  </main>
</template>

<style scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes floaty {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(10px) scale(0.99); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.animate-fadeUp { animation: fadeUp .65s ease-out both; }
.animate-fadeIn { animation: fadeUp .55s ease-out both; }

.animate-fadeUpDelay { animation: fadeUp .70s ease-out .08s both; }
.animate-fadeUpDelay2 { animation: fadeUp .70s ease-out .14s both; }
.animate-fadeUpDelay3 { animation: fadeUp .70s ease-out .20s both; }
.animate-fadeUpDelay4 { animation: fadeUp .70s ease-out .26s both; }
.animate-fadeUpDelay5 { animation: fadeUp .70s ease-out .32s both; }
.animate-fadeUpDelay6 { animation: fadeUp .70s ease-out .38s both; }

.animate-float { animation: floaty 4.5s ease-in-out infinite; }
.animate-cardIn { animation: cardIn .55s ease-out both; }

/* petits styles utiles sur tes BaseButton via class */
.btn-primary :deep(button),
.btn-primary {
  border-radius: 16px;
  background: linear-gradient(135deg, #f59e0b, #fb923c);
  color: white;
  box-shadow: 0 10px 18px rgba(245, 158, 11, 0.18);
  transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
}
.btn-primary:hover {
  transform: translateY(-1px);
  filter: saturate(1.05);
  box-shadow: 0 14px 24px rgba(251,146,60,.22);
}

.btn-secondary :deep(button),
.btn-secondary {
  border-radius: 16px;
  background: white;
  border: 1px solid rgba(11, 27, 58, 0.12);
  color: #0b1b3a;
  box-shadow: 0 10px 18px rgba(11, 27, 58, 0.06);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.btn-secondary:hover {
  transform: translateY(-1px);
  border-color: rgba(251,146,60,.35);
  box-shadow: 0 14px 24px rgba(11,27,58,.10);
}
</style>