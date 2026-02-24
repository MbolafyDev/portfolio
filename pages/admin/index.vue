<!-- pages/admin/index.vue -->
<script setup lang="ts">
const { isAdmin, logout, refresh } = useAdminBypass()

onMounted(() => {
  refresh?.()
})

function reload() {
  // Option B : vrai reload (document navigation) => popup Basic Auth possible
  window.location.reload()
}
</script>

<template>
  <!-- Si pas admin => écran verrouillé -->
  <main v-if="!isAdmin" class="max-w-xl mx-auto px-4 py-16">
    <div class="rounded-2xl border p-6 bg-white">
      <h1 class="text-2xl font-extrabold text-blue-950">Admin</h1>
      <p class="mt-2 text-blue-950/70">
        Accès protégé. Si la popup ne s’affiche pas :
      </p>

      <ol class="mt-4 list-decimal pl-5 text-blue-950/80 space-y-1">
        <li>Supprime le cookie <b>admin_bypass</b></li>
        <li>Recharge la page</li>
        <li>Entre le mot de passe bypass</li>
      </ol>

      <div class="mt-6 flex gap-3">
        <button
          class="rounded-xl bg-blue-950 text-white px-4 py-2 font-bold"
          @click="reload"
        >
          Recharger
        </button>

        <NuxtLink to="/" class="rounded-xl border px-4 py-2 font-bold text-blue-950">
          Retour site
        </NuxtLink>
      </div>
    </div>
  </main>

  <!-- Admin OK -->
  <main v-else class="max-w-4xl mx-auto px-4 py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-blue-950">Admin (bypass)</h1>
        <p class="mt-2 text-blue-950/70">
          Bypass actif : <b>OUI</b>
        </p>
      </div>

      <NuxtLink to="/" class="text-sm font-bold text-blue-950/70 hover:text-orange-600">
        Voir le site →
      </NuxtLink>
    </div>

    <!-- MENU ADMIN -->
    <section class="mt-8 grid gap-3 sm:grid-cols-2">
      <NuxtLink
        to="/admin/profile"
        class="group rounded-2xl border border-blue-950/10 bg-white p-5 shadow-sm
               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-blue-950/60">Profil</p>
            <h2 class="mt-1 text-lg font-extrabold text-blue-950">✏️ Éditer le profil</h2>
            <p class="mt-1 text-sm text-blue-950/70">
              Nom, titre, location, intro, photo, CV
            </p>
          </div>
          <span class="text-blue-950/60 font-bold group-hover:text-orange-600">→</span>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/admin/projets"
        class="group rounded-2xl border border-blue-950/10 bg-white p-5 shadow-sm
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
        <div class="flex items-center justify-between">
            <div>
            <p class="text-sm text-blue-950/60">Contenus</p>
            <h2 class="mt-1 text-lg font-extrabold text-blue-950">🧩 Projets</h2>
            <p class="mt-1 text-sm text-blue-950/70">Créer / modifier / supprimer</p>
            </div>
            <span class="text-blue-950/60 font-bold group-hover:text-orange-600">→</span>
        </div>
        </NuxtLink>

        <NuxtLink
        to="/admin/education"
        class="group rounded-2xl border border-blue-950/10 bg-white p-5 shadow-sm
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
            <div class="flex items-center justify-between">
                <div>
                <p class="text-sm text-blue-950/60">Parcours</p>
                <h2 class="mt-1 text-lg font-extrabold text-blue-950">🎓 Formations</h2>
                <p class="mt-1 text-sm text-blue-950/70">Créer / modifier / supprimer</p>
                </div>
                <span class="text-blue-950/60 font-bold group-hover:text-orange-600">→</span>
            </div>
        </NuxtLink>

        <NuxtLink
        to="/admin/experiences"
        class="group rounded-2xl border border-blue-950/10 bg-white p-5 shadow-sm
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
            <div class="flex items-center justify-between">
                <div>
                <p class="text-sm text-blue-950/60">Parcours pro</p>
                <h2 class="mt-1 text-lg font-extrabold text-blue-950">💼 Expériences</h2>
                <p class="mt-1 text-sm text-blue-950/70">Créer / modifier / supprimer</p>
                </div>
                <span class="text-blue-950/60 font-bold group-hover:text-orange-600">→</span>
            </div>
        </NuxtLink>

        <NuxtLink
        to="/admin/skills"
        class="group rounded-2xl border border-blue-950/10 bg-white p-5 shadow-sm
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
            <div class="flex items-center justify-between">
                <div>
                <p class="text-sm text-blue-950/60">Contenus</p>
                <h2 class="mt-1 text-lg font-extrabold text-blue-950">🧠 Compétences</h2>
                <p class="mt-1 text-sm text-blue-950/70">Créer / modifier / supprimer</p>
                </div>
                <span class="text-blue-950/60 font-bold group-hover:text-orange-600">→</span>
            </div>
        </NuxtLink>

        <NuxtLink to="/admin/about/about" class="group rounded-2xl border border-blue-950/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm text-blue-950/60">Contenus</p>
                <h2 class="mt-1 text-lg font-extrabold text-blue-950">👤 About</h2>
                <p class="mt-1 text-sm text-blue-950/70">Éditer la page “À propos”</p>
                </div>
                <span class="text-blue-950/60 font-bold group-hover:text-orange-600">→</span>
            </div>
        </NuxtLink>

        <NuxtLink to="/admin/contact/contact" class="group rounded-2xl border border-blue-950/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div class="flex items-center justify-between">
                <div>
                <p class="text-sm text-blue-950/60">Contenus</p>
                <h2 class="mt-1 text-lg font-extrabold text-blue-950">📞 Contact</h2>
                <p class="mt-1 text-sm text-blue-950/70">Éditer email / tel / liens</p>
                </div>
                <span class="text-blue-950/60 font-bold group-hover:text-orange-600">→</span>
            </div>
        </NuxtLink>

      <div class="rounded-2xl border border-blue-950/10 bg-white p-5 opacity-70" title="À venir">
        <p class="text-sm text-blue-950/60">Bientôt</p>
        <h2 class="mt-1 text-lg font-extrabold text-blue-950">📌 Autres contenus</h2>
        <p class="mt-1 text-sm text-blue-950/70">
          Projets, compétences, expériences…
        </p>
      </div>
    </section>

    <!-- ACTIONS -->
    <div class="mt-10 flex items-center gap-3">
      <button
        class="rounded-xl border border-blue-950/10 bg-white px-4 py-2 font-bold text-blue-950 hover:border-orange-200"
        @click="logout"
      >
        Désactiver bypass
      </button>
    </div>
  </main>
</template>