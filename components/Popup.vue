<template>
  <Transition
    enter-active-class="duration-200 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-20"
    >
      <div
        class="bg-solid flex flex-col rounded-3xl border-2 border-solid border-black bg-white p-6 shadow-xl"
        :class="size == 'normal' ? 'w-[425px]' : 'w-[750px]'"
      >
        <div class="mb-6 flex w-full flex-row justify-between">
          <h1 class="text-xl font-bold"><slot name="header"></slot></h1>
          <button class="text-xl" @click="closePopup" type="button">
            &#x2715;
          </button>
        </div>
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "normal",
  },
});

defineExpose({ openPopup, closePopup });

let isVisible = ref(false);
function closePopup() {
  isVisible.value = false;
}
function openPopup() {
  isVisible.value = true;
}
</script>
