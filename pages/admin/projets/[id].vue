<script setup lang="ts">
const { isAdmin, refresh: refreshAdmin } = useAdminBypass()

onMounted(async () => {
  await refreshAdmin?.()
  if (!isAdmin.value) window.location.href = "/admin"
})

const route = useRoute()
const idParam = String(route.params.id || "")
const isNew = idParam === "new"
const id = isNew ? null : Number(idParam)

const msg = ref<string | null>(null)
const saving = ref(false)

const form = reactive({
  title: "",
  slug: "",
  description: "",
  github: "",
  demo: "",
  tech: "",   // string: "Vue, Nuxt, Prisma"
  order: 0,
})

// Charger si édition
if (!isNew) {
  const { data, error } = await useFetch(`/api/admin/projets/${id}`)
  if (error.value) {
    throw createError({ statusCode: 404, statusMessage: "Projet introuvable" })
  }
  if (data.value) {
    const p: any = data.value
    form.title = p.title || ""
    form.slug = p.slug || ""
    form.description = p.description || ""
    form.github = p.github || ""
    form.demo = p.demo || ""
    form.tech = Array.isArray(p.tech) ? p.tech.join(", ") : ""
    form.order = Number.isFinite(Number(p.order)) ? Number(p.order) : 0
  }
}

async function save() {
  msg.value = null
  saving.value = true
  try {
    if (isNew) {
      const created: any = await $fetch("/api/admin/projets", {
        method: "POST",
        body: form,
      })
      msg.value = "✅ Projet créé"
      // aller sur la page édition
      window.location.href = `/admin/projets/${created.id}`
      return
    }

    await $fetch(`/api/admin/projets/${id}`, {
      method: "PUT",
      body: form,
    })
    msg.value = "✅ Projet mis à jour"
  } catch (e: any) {
    msg.value = "❌ Erreur: " + (e?.data?.message || e?.message || "unknown")
    if (e?.statusCode === 401) window.location.href = "/admin"
  } finally {
    saving.value = false
  }
}

useHead({
  title: isNew ? "Nouveau projet | Admin" : `Projet #${id} | Admin`,
})
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-blue-950">
          Admin · Projets · {{ isNew ? "Nouveau" : "Modifier" }}
        </h1>
        <p class="mt-2 text-blue-950/70">
          {{ isNew ? "Crée un nouveau projet." : "Modifie ton projet." }}
        </p>
      </div>

      <NuxtLink to="/admin/projets" class="text-sm font-bold text-blue-950/70 hover:text-orange-600">
        ← Retour liste
      </NuxtLink>
    </div>

    <div v-if="msg" class="mt-4 rounded-xl border border-blue-950/10 bg-white p-3 text-sm">
      {{ msg }}
    </div>

    <form class="mt-6 grid gap-4" @submit.prevent="save">
      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Titre</label>
        <input v-model="form.title" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Slug (unique)</label>
        <input v-model="form.slug" class="rounded-xl border border-blue-950/10 p-3" placeholder="ex: zaraspace" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Description</label>
        <textarea v-model="form.description" rows="5" class="rounded-xl border border-blue-950/10 p-3"></textarea>
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Technos (séparées par virgule)</label>
        <input v-model="form.tech" class="rounded-xl border border-blue-950/10 p-3" placeholder="Vue, Nuxt, Prisma" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">GitHub (optionnel)</label>
        <input v-model="form.github" class="rounded-xl border border-blue-950/10 p-3" placeholder="https://github.com/..." />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Démo (optionnel)</label>
        <input v-model="form.demo" class="rounded-xl border border-blue-950/10 p-3" placeholder="https://..." />
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
          {{ saving ? "Enregistrement..." : (isNew ? "Créer" : "Enregistrer") }}
        </button>

        <NuxtLink to="/" class="text-sm font-bold text-blue-950/70 hover:text-orange-600">
          Voir le site →
        </NuxtLink>
      </div>
    </form>
  </main>
</template>