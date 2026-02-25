<!-- layouts/default.vue -->
<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute } from "vue-router"

const isMenuOpen = ref(false)
const route = useRoute()

// Ferme le menu quand on change de page
watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  }
)
</script>

<template>
  <div class="min-h-screen bg-white text-blue-950">
    <!-- Background décor (discret, classique) -->
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        class="absolute -top-28 -right-24 h-80 w-80 rounded-full blur-3xl opacity-25"
        style="background: radial-gradient(circle, #f59e0b 0%, transparent 60%);"
      />
      <div
        class="absolute top-44 -left-28 h-96 w-96 rounded-full blur-3xl opacity-20"
        style="background: radial-gradient(circle, #0b1b3a 0%, transparent 60%);"
      />
      <div class="absolute inset-0 bg-white" />
    </div>

    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-blue-950/10 bg-white/80 backdrop-blur-xl">
      <div class="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
        <!-- Brand -->
        <NuxtLink
          to="/"
          class="group inline-flex items-center gap-2 font-extrabold tracking-tight text-blue-950"
        >
          <span
            class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-blue-950/10 bg-white shadow-sm"
          >
            <span class="h-2.5 w-2.5 rounded-full bg-orange-500"></span>
          </span>

          <span class="text-lg">
            Mbola
            <span class="bg-gradient-to-r from-amber-500 via-orange-500 to-blue-950 bg-clip-text text-transparent">
              Fy
            </span>
          </span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-2 text-sm font-semibold">
          <NuxtLink to="/projets" class="nav-link">Projets</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>

          <NuxtLink
            to="/contact"
            class="ml-1 inline-flex items-center gap-2 rounded-xl px-3 py-2
                   border border-orange-200 bg-amber-50 text-orange-700
                   transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
          >
            Contact
            <span class="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </NuxtLink>
        </nav>

        <!-- Mobile button -->
        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center rounded-xl border border-blue-950/10 bg-white px-3 py-2 shadow-sm
                 text-blue-950/80 hover:text-blue-950 hover:bg-blue-950/[0.03] transition"
          :aria-expanded="isMenuOpen ? 'true' : 'false'"
          aria-label="Ouvrir le menu"
          @click="isMenuOpen = !isMenuOpen"
        >
          <!-- burger / close -->
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-show="isMenuOpen" class="md:hidden border-t border-blue-950/10 bg-white/90 backdrop-blur-xl">
        <div class="mx-auto max-w-4xl px-4 py-3">
          <nav class="flex flex-col gap-2 text-sm font-semibold">
            <NuxtLink to="/projets" class="nav-link-mobile">Projets</NuxtLink>
            <NuxtLink to="/about" class="nav-link-mobile">About</NuxtLink>

            <NuxtLink
              to="/contact"
              class="mt-1 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2
                     border border-orange-200 bg-amber-50 text-orange-700
                     transition-all duration-300 hover:shadow-sm"
            >
              Contact
              <span class="inline-block transition-transform duration-300">→</span>
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="mx-auto max-w-4xl px-4 py-8 md:py-10 animate-fadeUp">
      <slot />
    </main>

    <!-- Footer (classique) -->
    <footer class="border-t border-blue-950/10">
      <div class="mx-auto max-w-4xl px-4 py-6 text-sm text-blue-950/60 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <p>© {{ new Date().getFullYear() }} Mbola Fy. Tous droits réservés.</p>

        <div class="flex gap-4 flex-wrap">
          <NuxtLink to="/competences" class="hover:text-orange-600 transition-colors">Compétences</NuxtLink>
          <NuxtLink to="/parcours" class="hover:text-orange-600 transition-colors">Parcours</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-orange-600 transition-colors">Contact</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fadeUp { animation: fadeUp .55s ease-out both; }

/* Liens nav : style classique + underline animé */
.nav-link {
  position: relative;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  color: rgba(11, 27, 58, 0.75);
  transition: color .2s ease, background-color .2s ease, transform .2s ease;
}
.nav-link:hover {
  color: #0b1b3a;
  background: rgba(11, 27, 58, 0.04);
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: 0.3rem;
  height: 2px;
  border-radius: 999px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .25s ease;
  background: linear-gradient(90deg, #f59e0b, #fb923c, #0b1b3a);
}
.nav-link:hover::after {
  transform: scaleX(1);
}

/* lien actif Nuxt */
.nav-link.router-link-active,
.nav-link.nuxt-link-active {
  color: #0b1b3a;
  background: rgba(245, 158, 11, 0.10);
}
.nav-link.router-link-active::after,
.nav-link.nuxt-link-active::after {
  transform: scaleX(1);
}

/* Mobile menu links */
.nav-link-mobile{
  position: relative;
  padding: 0.75rem 0.75rem;
  border-radius: 0.9rem;
  color: rgba(11, 27, 58, 0.82);
  background: rgba(11, 27, 58, 0.02);
  transition: background-color .2s ease, color .2s ease;
}
.nav-link-mobile:hover{
  background: rgba(11, 27, 58, 0.05);
  color: #0b1b3a;
}
.nav-link-mobile.router-link-active,
.nav-link-mobile.nuxt-link-active{
  background: rgba(245, 158, 11, 0.12);
  color: #0b1b3a;
}
</style>