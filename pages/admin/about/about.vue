<!-- pages/admin/about.vue -->
<script setup lang="ts">
type About = { id: number; title: string; description: string; updatedAt?: string }

const { isAdmin, refresh: refreshAdmin } = useAdminBypass()

const form = reactive({
  title: "",
  description: "",
})

const msg = ref<string | null>(null)
const saving = ref(false)

// ✅ IMPORTANT : index.* => endpoint = /api/admin/about/
const ADMIN_ABOUT_URL = "/api/admin/about/"

const { data: item, refresh, error } = await useFetch<About>(ADMIN_ABOUT_URL, {
  server: false, // ✅ pas de SSR => évite 401 avant cookie
  lazy: true,    // ✅ on déclenche manuellement après bypass
})

onMounted(async () => {
  await refreshAdmin?.()

  if (!isAdmin.value) {
    window.location.href = "/admin"
    return
  }

  await refresh()
})

watchEffect(() => {
  if (item.value) {
    form.title = item.value.title || ""
    form.description = item.value.description || ""
  }
})

async function save() {
  msg.value = null
  saving.value = true
  try {
    await $fetch(ADMIN_ABOUT_URL, {
      method: "PUT",
      body: { ...form },
    })
    await refresh()
    msg.value = "✅ About mis à jour"
  } catch (e: any) {
    const status = e?.statusCode || e?.status || 0
    msg.value = "❌ Erreur: " + (e?.data?.message || e?.message || "unknown")
    if (status === 401) window.location.href = "/admin"
  } finally {
    saving.value = false
  }
}

useHead({ title: "About | Admin" })
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-blue-950">Admin · About</h1>
        <p class="mt-2 text-blue-950/70">Modifie la page “À propos”.</p>
      </div>

      <NuxtLink to="/admin" class="text-sm font-bold text-blue-950/70 hover:text-orange-600">
        ← Retour admin
      </NuxtLink>
    </div>

    <div v-if="msg" class="mt-4 rounded-xl border border-blue-950/10 bg-white p-3 text-sm">
      {{ msg }}
    </div>

    <div v-if="error" class="mt-4 rounded-xl border border-red-200 bg-white p-3 text-sm text-red-700">
      ❌ Impossible de charger {{ ADMIN_ABOUT_URL }} ({{ (error as any)?.statusCode || "" }})
    </div>

    <form class="mt-6 grid gap-4" @submit.prevent="save">
      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Titre</label>
        <input v-model="form.title" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Description</label>
        <textarea
          v-model="form.description"
          rows="8"
          class="rounded-xl border border-blue-950/10 p-3"
        ></textarea>
        <p class="text-xs text-blue-950/50">Astuce : sauts de ligne OK (affiché en public).</p>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="submit"
          :disabled="saving"
          class="rounded-xl bg-blue-950 px-5 py-3 font-bold text-white disabled:opacity-60"
        >
          {{ saving ? "Enregistrement..." : "Enregistrer" }}
        </button>
      </div>
    </form>
  </main>
</template>