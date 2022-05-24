<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  texto: string;
}>();

const linkWhatsApp = ref<string>(
  `https://api.whatsapp.com/send?text=${props.texto}`
);

const linkTwitter = ref<string>(
  `https://twitter.com/intent/tweet?text=${props.texto}`
);
</script>

<template>
  <q-btn-dropdown flat icon="o_share" color="primary" dropdown-icon="o_arrow">
    <div class="row no-wrap q-pa-md">
      <q-btn
        :href="linkWhatsApp"
        target="_blank"
        class="column"
        flat
        icon="whatsapp"
        color="green"
      ></q-btn>
      <q-btn
        :href="linkTwitter"
        target="_blank"
        class="column"
        flat
        icon="mdi-twitter"
        color="blue"
      ></q-btn>
    </div>
  </q-btn-dropdown>
</template>
