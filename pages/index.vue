<script setup lang="ts">
const emptyProfile = {
  photo: "",
  name: "",
  title: "",
  location: "",
  intro: "",
  cvUrl: "",
}

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
      <div class="absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl opacity-30"
        style="background: radial-gradient(circle, #f59e0b 0%, transparent 60%);" />
      <div class="absolute top-40 -left-24 h-96 w-96 rounded-full blur-3xl opacity-25"
        style="background: radial-gradient(circle, #0b1b3a 0%, transparent 60%);" />
      <div class="absolute inset-0 bg-white" />
    </div>

    <!-- HERO -->
    <section class="relative mx-auto w-full max-w-6xl rounded-3xl border bg-white/70 backdrop-blur-xl shadow-sm
                    p-5 sm:p-6 md:p-10 overflow-hidden animate-fadeUp">

      <div class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-blue-950" />

      <div class="flex flex-col md:flex-row gap-6 md:gap-8 items-start">

        <!-- Photo -->
        <div class="relative shrink-0 mx-auto md:mx-0">
          <div class="absolute -inset-1 rounded-3xl blur opacity-40"
            style="background: linear-gradient(135deg, #f59e0b, #fb923c, #0b1b3a);" />

          <img
            :src="safeProfile.photo || '/img/profile.png'"
            class="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl object-cover
                   border border-blue-950/10 shadow-md animate-float"
          />
        </div>

        <!-- Intro -->
        <div class="flex-1 min-w-0">

          <div class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs sm:text-sm
                      bg-white/80 text-blue-950 shadow-sm animate-fadeIn">
            <span class="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            Disponible pour opportunités
          </div>

          <!-- ✅ NOM RESPONSIVE (moins grand maintenant) -->
          <h3 class="mt-4 font-extrabold leading-[1.05] text-blue-950 animate-fadeUpDelay">
            <span class="zs-title-fit bg-gradient-to-r from-amber-500 via-orange-500 to-blue-950
                         bg-clip-text text-transparent">
              {{ safeProfile.name }}
            </span>
          </h3>

          <p class="mt-3 text-sm sm:text-base md:text-lg text-blue-950/70 animate-fadeUpDelay2">
            <span class="break-words">{{ safeProfile.title }}</span>
            <span class="mx-1">•</span>
            <span class="break-words">{{ safeProfile.location }}</span>
          </p>

          <p class="mt-5 text-sm sm:text-base text-blue-950/75 leading-relaxed max-w-2xl animate-fadeUpDelay3">
            {{ safeProfile.intro }}
          </p>

          <!-- Boutons inline -->
          <div class="mt-7 flex items-center gap-3 flex-nowrap animate-fadeUpDelay4">

            <a :href="safeProfile.cvUrl" download class="group shrink min-w-0">
              <BaseButton variant="primary" class="btn-primary btn-fluid">
                <span class="hidden sm:inline">Télécharger mon CV</span>
                <span class="sm:hidden">CV</span>
                →
              </BaseButton>
            </a>

            <NuxtLink to="/projets" class="group shrink min-w-0">
              <BaseButton class="btn-secondary btn-fluid">
                <span class="hidden sm:inline">Voir mes projets</span>
                <span class="sm:hidden">Projets</span>
                →
              </BaseButton>
            </NuxtLink>

          </div>

          <p v-if="profileError" class="mt-4 text-sm text-red-600">
            Impossible de charger le profil.
          </p>

        </div>
      </div>
    </section>

    <!-- PROJETS -->
    <section class="mt-10 animate-fadeUpDelay5 mx-auto w-full max-w-6xl">
      <div class="flex items-end justify-between gap-4 mb-4">
        <div>
          <h2 class="text-xl md:text-2xl font-bold text-blue-950">Projets récents</h2>
          <p class="text-blue-950/70 mt-1">Un aperçu de mes derniers travaux.</p>
        </div>

        <NuxtLink to="/projets"
          class="text-sm font-semibold text-blue-950 hover:text-orange-600 transition-colors">
          Tout voir →
        </NuxtLink>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <ProjectCard v-for="p in recentProjets" :key="p.slug" :project="p" class="animate-cardIn"/>
      </div>
    </section>

    <PrevNext class="mt-10 animate-fadeUpDelay6 mx-auto w-full max-w-6xl" />
  </main>
</template>

<style scoped>
.animate-float { animation: floaty 4.5s ease-in-out infinite; }

.zs-title-fit{
  display:block;
  font-size: clamp(1.1rem,4.2vw,2rem); /* ✅ PLUS PETIT */
  line-height:1.05;
  overflow-wrap:anywhere;
  word-break:break-word;
  hyphens:auto;
}

.btn-fluid{
  padding:12px 16px;
  font-size:.9rem;
  white-space:nowrap;
}

@media (max-width:420px){
  .btn-fluid{
    padding:10px 12px;
    font-size:.8rem;
  }
}

.btn-primary{
  border-radius:16px;
  background:linear-gradient(135deg,#f59e0b,#fb923c);
  color:white;
}

.btn-secondary{
  border-radius:16px;
  background:white;
  border:1px solid rgba(11,27,58,.12);
  color:#0b1b3a;
}
</style>