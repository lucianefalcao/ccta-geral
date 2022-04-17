<script setup lang="ts">

const props = defineProps<{
  url: string,
  titulo: string
}>()

</script>

<template>
  <a
    :href="url"
    target="__blank"
    class="group ring-2 ring-red-500 rounded-lg hover:bg-red-600 hover:text-white hover:ring-white"
  >
    <div class="grid justify-items-center py-4 px-2">
      <p class="text-sm text-red-500 group-hover:text-white">
        <slot></slot>
      </p>
      <p class="font-medium">{{ titulo }}</p>
    </div>
  </a>
</template>