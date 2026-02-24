<script setup lang="ts">
const { isAdmin, refresh: refreshAdmin } = useAdminBypass()

onMounted(async () => {
  await refreshAdmin?.()
  if (!isAdmin.value) window.location.href = "/admin"
})

const { data: projets, refresh } = await useFetch("/api/admin/projets")

const deletingId = ref<number | null>(null)
const msg = ref<string | null>(null)

async function remove(id: number) {
  msg.value = null
  deletingId.value = id
  try {
    await $fetch(`/api/admin/projets/${id}`, { method: "DELETE" })
    await refresh()
    msg.value = "✅ Projet supprimé"
  } catch (e: any) {
    msg.value = "❌ Erreur: " + (e?.data?.message || e?.message || "unknown")
    if (e?.statusCode === 401) window.location.href = "/admin"
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-blue-950">Admin · Projets</h1>
        <p class="mt-2 text-blue-950/70">Gère tes projets affichés sur le portfolio.</p>
      </div>

      <div class="flex items-center gap-3">
        <NuxtLink to="/admin" class="text-sm font-bold text-blue-950/70 hover:text-orange-600">
          ← Retour admin
        </NuxtLink>

        <NuxtLink
          to="/admin/projets/new"
          class="rounded-xl bg-blue-950 px-4 py-2 font-bold text-white"
        >
          + Nouveau
        </NuxtLink>
      </div>
    </div>

    <div v-if="msg" class="mt-4 rounded-xl border border-blue-950/10 bg-white p-3 text-sm">
      {{ msg }}
    </div>

    <div class="mt-8 grid gap-3">
      <div
        v-for="p in (projets || [])"
        :key="p.id"
        class="rounded-2xl border border-blue-950/10 bg-white p-5"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="text-sm text-blue-950/60">#{{ p.id }} · ordre {{ p.order }}</div>
            <div class="mt-1 text-lg font-extrabold text-blue-950">
              {{ p.title }}
            </div>
            <div class="mt-1 text-sm text-blue-950/70">
              slug: <b>{{ p.slug }}</b>
            </div>

            <div v-if="p.tech?.length" class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="t in p.tech"
                :key="t"
                class="text-xs font-bold rounded-full border border-blue-950/10 px-2 py-1 text-blue-950/70"
              >
                {{ t }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <NuxtLink
              :to="`/projets/${p.slug}`"
              class="rounded-xl border px-3 py-2 text-sm font-bold text-blue-950/70 hover:text-orange-600"
            >
              Voir
            </NuxtLink>

            <NuxtLink
              :to="`/admin/projets/${p.id}`"
              class="rounded-xl border px-3 py-2 text-sm font-bold text-blue-950 hover:border-orange-200"
            >
              Modifier
            </NuxtLink>

            <button
              class="rounded-xl border px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-50"
              :disabled="deletingId === p.id"
              @click="remove(p.id)"
            >
              {{ deletingId === p.id ? "Suppression..." : "Supprimer" }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="(projets || []).length === 0" class="rounded-2xl border p-6 bg-white text-blue-950/70">
        Aucun projet pour le moment.
      </div>
    </div>
  </main>
</template>