<!-- pages/admin/skills/index.vue -->
<script setup lang="ts">
const { isAdmin, refresh: refreshAdmin } = useAdminBypass()

onMounted(async () => {
  await refreshAdmin?.()
  if (!isAdmin.value) window.location.href = "/admin"
})

type Skill = { id: number; name: string; level: string; order: number }

const { data: items, refresh } = await useFetch<Skill[]>("/api/admin/skills")

const deletingId = ref<number | null>(null)
const msg = ref<string | null>(null)

async function remove(id: number) {
  msg.value = null
  deletingId.value = id
  try {
    await $fetch(`/api/admin/skills/${id}`, { method: "DELETE" })
    await refresh()
    msg.value = "✅ Compétence supprimée"
  } catch (e: any) {
    msg.value = "❌ Erreur: " + (e?.data?.message || e?.message || "unknown")
    if (e?.statusCode === 401) window.location.href = "/admin"
  } finally {
    deletingId.value = null
  }
}

useHead({ title: "Compétences | Admin" })
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-blue-950">Admin · Compétences</h1>
        <p class="mt-2 text-blue-950/70">Gère tes compétences.</p>
      </div>

      <div class="flex items-center gap-3">
        <NuxtLink to="/admin" class="text-sm font-bold text-blue-950/70 hover:text-orange-600">
          ← Retour admin
        </NuxtLink>

        <NuxtLink to="/admin/skills/new" class="rounded-xl bg-blue-950 px-4 py-2 font-bold text-white">
          + Nouveau
        </NuxtLink>
      </div>
    </div>

    <div v-if="msg" class="mt-4 rounded-xl border border-blue-950/10 bg-white p-3 text-sm">
      {{ msg }}
    </div>

    <div class="mt-8 grid gap-3">
      <div
        v-for="it in (items || [])"
        :key="it.id"
        class="rounded-2xl border border-blue-950/10 bg-white p-5"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <div class="text-sm text-blue-950/60">#{{ it.id }} · ordre {{ it.order }}</div>

            <div class="mt-1 text-lg font-extrabold text-blue-950 truncate">
              {{ it.name }}
            </div>

            <div class="mt-3">
              <span
                class="inline-flex rounded-full border border-orange-200 bg-amber-50 px-3 py-1 text-xs font-bold text-orange-700"
              >
                {{ it.level }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <NuxtLink
              :to="`/admin/skills/${it.id}`"
              class="rounded-xl border px-3 py-2 text-sm font-bold text-blue-950 hover:border-orange-200"
            >
              Modifier
            </NuxtLink>

            <button
              class="rounded-xl border px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-50"
              :disabled="deletingId === it.id"
              @click="remove(it.id)"
            >
              {{ deletingId === it.id ? "Suppression..." : "Supprimer" }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="(items || []).length === 0" class="rounded-2xl border p-6 bg-white text-blue-950/70">
        Aucune compétence pour le moment.
      </div>
    </div>
  </main>
</template>