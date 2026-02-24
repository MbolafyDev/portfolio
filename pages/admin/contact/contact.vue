<!-- pages/admin/contact.vue -->
<script setup lang="ts">
const { isAdmin, refresh: refreshAdmin } = useAdminBypass()

onMounted(async () => {
  await refreshAdmin?.()
  if (!isAdmin.value) window.location.href = "/admin"
})

type Contact = { id: number; email: string; phone: string; github: string; linkedin: string }

const { data: item, refresh } = await useFetch<Contact>("/api/admin/contact")

const form = reactive({
  email: "",
  phone: "",
  github: "",
  linkedin: "",
})

watchEffect(() => {
  if (item.value) {
    form.email = item.value.email || ""
    form.phone = item.value.phone || ""
    form.github = item.value.github || ""
    form.linkedin = item.value.linkedin || ""
  }
})

const msg = ref<string | null>(null)
const saving = ref(false)

async function save() {
  msg.value = null
  saving.value = true
  try {
    await $fetch("/api/admin/contact", {
      method: "PUT",
      body: { ...form },
    })
    await refresh()
    msg.value = "✅ Contact mis à jour"
  } catch (e: any) {
    msg.value = "❌ Erreur: " + (e?.data?.message || e?.message || "unknown")
    if (e?.statusCode === 401) window.location.href = "/admin"
  } finally {
    saving.value = false
  }
}

useHead({ title: "Contact | Admin" })
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-blue-950">Admin · Contact</h1>
        <p class="mt-2 text-blue-950/70">Modifie tes informations de contact.</p>
      </div>

      <NuxtLink to="/admin" class="text-sm font-bold text-blue-950/70 hover:text-orange-600">
        ← Retour admin
      </NuxtLink>
    </div>

    <div v-if="msg" class="mt-4 rounded-xl border border-blue-950/10 bg-white p-3 text-sm">
      {{ msg }}
    </div>

    <form class="mt-6 grid gap-4" @submit.prevent="save">
      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Email</label>
        <input v-model="form.email" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">Téléphone</label>
        <input v-model="form.phone" class="rounded-xl border border-blue-950/10 p-3" />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">GitHub URL</label>
        <input v-model="form.github" class="rounded-xl border border-blue-950/10 p-3" placeholder="https://github.com/..." />
      </div>

      <div class="grid gap-1">
        <label class="text-sm font-bold text-blue-950/80">LinkedIn URL (optionnel)</label>
        <input v-model="form.linkedin" class="rounded-xl border border-blue-950/10 p-3" placeholder="https://linkedin.com/in/..." />
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