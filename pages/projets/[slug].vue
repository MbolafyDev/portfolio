<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug || "")

const { data: projet, error } = await useFetch(`/api/portfolio/projets/${slug}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Projet introuvable" })
}

useHead({
  title: projet.value ? `${projet.value.title} | Portfolio` : "Projet | Portfolio",
})
</script>

<template>
  <main style="max-width: 900px; margin: 40px auto; padding: 0 16px;">
    <div v-if="projet">
      <h1 style="font-size: 32px;">{{ projet.title }}</h1>
      <p style="margin: 16px 0;">{{ projet.description }}</p>

      <AdminEditIcon class="my-4" href="/admin" title="Modifier ce contenu (admin)" />

      <h3>Technologies :</h3>
      <ul>
        <li v-for="tech in projet.tech" :key="tech">{{ tech }}</li>
      </ul>
    </div>
  </main>
</template>