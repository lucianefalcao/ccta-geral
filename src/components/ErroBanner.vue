<script setup lang="ts">
defineProps<{
  mensagem: string;
}>();
</script>

<template>
  <q-banner class="bg-grey-1" rounded>
    <template v-slot:avatar>
      <q-icon name="o_error_outline" color="primary" />
    </template>
    {{ mensagem }}
  </q-banner>
</template>
