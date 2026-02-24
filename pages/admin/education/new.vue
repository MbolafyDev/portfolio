<script setup lang="ts">
const { isAdmin, refresh: refreshAdmin } = useAdminBypass()

onMounted(async () => {
  await refreshAdmin?.()
  if (!isAdmin.value) window.location.href = "/admin"
})

const msg = ref<string | null>(null)
const saving = ref(false)

const form = reactive({
  school: "",
  degree: "",
  test: "",
  period: "",
  order: 0,
})

async function save() {
  msg.value = null
  saving.value = true
  try {
    const created: any = await $fetch("/api/admin/education", {
      method: "POST",
      body: {
        ...form,
        test: form.test.trim() ? form.test : null,
      },
    })
    // après création → page d'édition
    window.location.href = `/admin/education/${created.id}`
  } catch (e: any) {
    msg.value = "❌ Erreur: " + (e?.data?.message || e?.message || "unknown")
    if (e?.statusCode === 401) window.location.href = "/admin"
  } finally {
    saving.value = false
  }
}

useHead({ title: "Nouvelle formation | Admin" })
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-blue-950">Admin · Formations · Nouveau</h1>
        <p class="mt-2 text-blue-950/70">Ajoute une formation.</p>
      </div>

      <NuxtLink to="/admin/education" class="text-sm font-bold text-blue-950/70 hover:text-orange-600">
        ← Retour liste
      </NuxtLink>
    </div>

    <div v-if="msg" class="mt-4 rounded-xl border border-blue-950/10 bg-white p-3 text-sm">
      {{ msg }}
    </div>

    <form class="mt-6 grid gap-4" @submit.prevent="save">
      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">École / Université</label>
        <input v-model="form.school" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Diplôme / Parcours</label>
        <input v-model="form.degree" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Test / Mention (optionnel)</label>
        <input v-model="form.test" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Période</label>
        <input v-model="form.period" class="rounded-xl border border-blue-950/10 p-3" placeholder="ex: 2021 - 2024" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Ordre</label>
        <input v-model.number="form.order" type="number" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="flex items-center gap-3">
        <button
          type="submit"
          :disabled="saving"
          class="rounded-xl bg-blue-950 px-5 py-3 font-bold text-white disabled:opacity-60"
        >
          {{ saving ? "Enregistrement..." : "Créer" }}
        </button>
      </div>
    </form>
  </main>
</template>