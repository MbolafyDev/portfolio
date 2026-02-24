<!-- pages/admin/skills/[id].vue -->
<script setup lang="ts">
const { isAdmin, refresh: refreshAdmin } = useAdminBypass()

onMounted(async () => {
  await refreshAdmin?.()
  if (!isAdmin.value) window.location.href = "/admin"
})

const route = useRoute()
const id = Number(route.params.id || 0)
if (!id) throw createError({ statusCode: 404, statusMessage: "Compétence introuvable" })

type Skill = { id: number; name: string; level: string; order: number }
const { data: item, refresh } = await useFetch<Skill>(`/api/admin/skills/${id}`)

const form = reactive({
  name: "",
  level: "",
  order: 0,
})

watchEffect(() => {
  if (item.value) {
    form.name = item.value.name || ""
    form.level = item.value.level || ""
    form.order = Number.isFinite(Number(item.value.order)) ? Number(item.value.order) : 0
  }
})

const msg = ref<string | null>(null)
const saving = ref(false)

async function save() {
  msg.value = null
  saving.value = true
  try {
    await $fetch(`/api/admin/skills/${id}`, {
      method: "PUT",
      body: {
        name: form.name,
        level: form.level,
        order: form.order,
      },
    })

    await refresh()
    msg.value = "✅ Compétence mise à jour"
  } catch (e: any) {
    msg.value = "❌ Erreur: " + (e?.data?.message || e?.message || "unknown")
    if (e?.statusCode === 401) window.location.href = "/admin"
  } finally {
    saving.value = false
  }
}

useHead({ title: `Compétence #${id} | Admin` })
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-blue-950">Admin · Compétences · Modifier</h1>
        <p class="mt-2 text-blue-950/70">Modifie la compétence.</p>
      </div>

      <NuxtLink to="/admin/skills" class="text-sm font-bold text-blue-950/70 hover:text-orange-600">
        ← Retour liste
      </NuxtLink>
    </div>

    <div v-if="msg" class="mt-4 rounded-xl border border-blue-950/10 bg-white p-3 text-sm">
      {{ msg }}
    </div>

    <form class="mt-6 grid gap-4" @submit.prevent="save">
      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Nom</label>
        <input v-model="form.name" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Niveau</label>
        <input v-model="form.level" class="rounded-xl border border-blue-950/10 p-3" />
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
          {{ saving ? "Enregistrement..." : "Enregistrer" }}
        </button>
      </div>
    </form>
  </main>
</template>