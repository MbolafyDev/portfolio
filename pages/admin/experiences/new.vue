<script setup lang="ts">
const { isAdmin, refresh: refreshAdmin } = useAdminBypass()

onMounted(async () => {
  await refreshAdmin?.()
  if (!isAdmin.value) window.location.href = "/admin"
})

const msg = ref<string | null>(null)
const saving = ref(false)

const form = reactive({
  company: "",
  role: "",
  period: "",
  pointsText: "", // textarea (1 point par ligne)
  order: 0,
})

async function save() {
  msg.value = null
  saving.value = true
  try {
    const points = form.pointsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)

    const created: any = await $fetch("/api/admin/experiences", {
      method: "POST",
      body: {
        company: form.company,
        role: form.role,
        period: form.period,
        order: form.order,
        points,
      },
    })

    window.location.href = `/admin/experiences/${created.id}`
  } catch (e: any) {
    msg.value = "❌ Erreur: " + (e?.data?.message || e?.message || "unknown")
    if (e?.statusCode === 401) window.location.href = "/admin"
  } finally {
    saving.value = false
  }
}

useHead({ title: "Nouvelle expérience | Admin" })
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-blue-950">Admin · Expériences · Nouveau</h1>
        <p class="mt-2 text-blue-950/70">Ajoute une expérience.</p>
      </div>

      <NuxtLink to="/admin/experiences" class="text-sm font-bold text-blue-950/70 hover:text-orange-600">
        ← Retour liste
      </NuxtLink>
    </div>

    <div v-if="msg" class="mt-4 rounded-xl border border-blue-950/10 bg-white p-3 text-sm">
      {{ msg }}
    </div>

    <form class="mt-6 grid gap-4" @submit.prevent="save">
      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Entreprise</label>
        <input v-model="form.company" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Rôle</label>
        <input v-model="form.role" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Période</label>
        <input v-model="form.period" class="rounded-xl border border-blue-950/10 p-3" placeholder="ex: 2024 - 2025" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Missions (1 par ligne)</label>
        <textarea v-model="form.pointsText" rows="6" class="rounded-xl border border-blue-950/10 p-3"></textarea>
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