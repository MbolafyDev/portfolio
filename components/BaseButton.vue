<!-- components/BaseButton.vue -->
<script setup>
const props = defineProps({
  variant: { type: String, default: "outline" }, // primary | outline | danger | success
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const isDisabled = computed(() => props.disabled || props.loading)

const base =
  "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition"

const variants = {
  primary: "bg-black text-white hover:bg-gray-800",
  outline: "border hover:bg-gray-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
  success: "bg-green-600 text-white hover:bg-green-700",
}

const disabledClass = "opacity-60 cursor-not-allowed"
</script>

<template>
  <button
    :disabled="isDisabled"
    :class="[
      base,
      variants[variant] || variants.outline,
      isDisabled && disabledClass
    ]"
  >
    <span
      v-if="loading"
      class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>