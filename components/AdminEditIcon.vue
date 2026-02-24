<!-- components/AdminEditIcon.vue -->
<script setup lang="ts">
const { isAdmin } = useAdminBypass()
defineProps<{ href?: string; title?: string }>()
</script>

<template>
  <div v-if="isAdmin" class="inline-flex items-center gap-2">
    <NuxtLink
      v-if="href"
      :to="href"
      class="inline-flex items-center justify-center rounded-lg border border-blue-950/10 bg-white px-2 py-1 text-xs font-bold text-blue-950/70 hover:text-orange-600 hover:border-orange-200"
      :title="title || 'Modifier'"
    >
      ✏️ Edit
    </NuxtLink>

    <span
      v-else
      class="inline-flex items-center justify-center rounded-lg border border-blue-950/10 bg-white px-2 py-1 text-xs font-bold text-blue-950/70"
      :title="title || 'Admin'"
    >
      ✏️ Edit
    </span>
  </div>
</template>