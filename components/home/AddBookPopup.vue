<template>
  <Popup ref="popup">
    <template #header>add a book</template>
    <template #default>this is a test</template>
  </Popup>
</template>

<script setup>
import { ref } from "vue";
const popup = ref(null);
defineExpose({ openPopup });
function openPopup() {
  popup.value.openPopup();
}
</script>
