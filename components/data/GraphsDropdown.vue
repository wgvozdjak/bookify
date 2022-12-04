<template>
  <div class="w-full rounded-lg bg-white/70 p-[3px] shadow-md">
    <button
      class="flex w-full items-center justify-between rounded-md p-2 text-left transition hover:bg-gray-200"
      @click="expanded = !expanded"
    >
      <slot name="label" />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-5 w-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>

    <TransitionCollapseHeight>
      <div v-show="expanded">
        <!-- note to self: i don't think this padding thing is working -->
        <div :class="{ 'p-2': loaded }">
          <slot />
        </div>
      </div>
    </TransitionCollapseHeight>
  </div>
</template>

<script setup>
import TransitionCollapseHeight from "../TransitionCollapseHeight.vue";

const expanded = ref(true);
const loaded = ref(false);

// ISSUE: GOOGLE CHART GETS SIZE TO DRAW FROM WRAPPER SIZE BUT
// the dropdown is closed, and therefore it can't get that size
// therefore, the current ``solution'' is to open the dropdown before
// the chart is drawn and close it right after the chart is drawn
// however, this presents two issues:
// * occasionally, there is a split-second delay between chart drawn and
//   dropdown closed, so the chart is visible for a short period of time
//   before the dropdown is closed
// * if the user clicks on the dropdown before the chart is loaded, this
//   closes the dropdown and no longer makes this ``fix'' work
// another potential solution is to draw the chart the first time the user
// opens the dropdown, but this requires delaying drawing the chart until
// the user clicks on the dropdown and i'm not sure how to do that in
// vue-google-charts.
// https://github.com/google/google-visualization-issues/issues/1982
// https://stackoverflow.com/questions/20855366/google-chart-is-not-taking-full-width-while-jquery-show-and-hide
// might need to migrate away from vue-google-charts entirely, seems like
// it's been abandoned since 2020. consider also switching to chart.js if doing so

function closeDropdown() {
  console.log("visibility");
  expanded.value = false;
  this.loaded = true;
}

defineExpose({ closeDropdown });
</script>
