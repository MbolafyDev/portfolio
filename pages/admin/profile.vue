<!-- pages/admin/profile.vue -->
<script setup lang="ts">
const { isAdmin, refresh: refreshAdmin } = useAdminBypass()

// 1) Au montage, on tente de relire l'état (cookie / api)
// 2) Si pas admin => Option B : navigation document vers /admin
onMounted(async () => {
  await refreshAdmin?.()
  if (!isAdmin.value) {
    window.location.href = "/admin"
  }
})

// ⚠️ Ton endpoint lecture est /api/portfolio/profile (OK s'il est public)
const { data: profile, refresh } = await useFetch("/api/portfolio/profile")

const form = reactive({
  name: "",
  title: "",
  location: "",
  intro: "",
  photo: "",
  cvUrl: "",
})

watchEffect(() => {
  if (profile.value) {
    form.name = (profile.value as any).name || ""
    form.title = (profile.value as any).title || ""
    form.location = (profile.value as any).location || ""
    form.intro = (profile.value as any).intro || ""
    form.photo = (profile.value as any).photo || ""
    form.cvUrl = (profile.value as any).cvUrl || ""
  }
})

const saving = ref(false)
const msg = ref<string | null>(null)

const save = async () => {
  msg.value = null
  saving.value = true
  try {
    await $fetch("/api/admin/profile", {
      method: "POST",
      body: form,
    })
    await refresh()
    msg.value = "✅ Profil mis à jour"
  } catch (e: any) {
    msg.value = "❌ Erreur: " + (e?.data?.message || e?.message || "unknown")
    // Si jamais session perdue => renvoyer vers /admin en hard navigation
    if (e?.statusCode === 401) {
      window.location.href = "/admin"
    }
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-10">
    <div class="flex items-center justify-between gap-4">
      <h1 class="text-3xl font-extrabold text-blue-950">Admin · Profil</h1>
      <NuxtLink to="/admin" class="text-sm font-bold text-blue-950/70 hover:text-orange-600">
        ← Retour admin
      </NuxtLink>
    </div>

    <p class="mt-2 text-blue-950/70">Modifie les infos affichées sur ton portfolio.</p>

    <div v-if="msg" class="mt-4 rounded-xl border border-blue-950/10 bg-white p-3 text-sm">
      {{ msg }}
    </div>

    <form class="mt-6 grid gap-4" @submit.prevent="save">
      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Nom</label>
        <input v-model="form.name" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Titre</label>
        <input v-model="form.title" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Localisation</label>
        <input v-model="form.location" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Intro</label>
        <textarea v-model="form.intro" rows="4" class="rounded-xl border border-blue-950/10 p-3"></textarea>
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Photo (URL ou /img/...)</label>
        <input v-model="form.photo" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">CV (URL ou /cv.pdf)</label>
        <input v-model="form.cvUrl" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="flex items-center gap-3">
        <button
          type="submit"
          :disabled="saving"
          class="rounded-xl bg-blue-950 px-5 py-3 font-bold text-white disabled:opacity-60"
        >
          {{ saving ? "Enregistrement..." : "Enregistrer" }}
        </button>

        <NuxtLink to="/" class="text-sm font-bold text-blue-950/70 hover:text-orange-600">
          Voir le site →
        </NuxtLink>
      </div>
    </form>

    <div v-if="form.photo" class="mt-8">
      <p class="text-sm font-bold text-blue-950/80 mb-2">Aperçu photo</p>
      <img :src="form.photo" class="h-28 w-28 rounded-2xl object-cover border border-blue-950/10" />
    </div>
  </main>
</template>