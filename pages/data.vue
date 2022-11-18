<template>
  <div>
    <div class="flex flex-col">
      <div class="font-bold">data</div>
      <div class="flex flex-row">
        <div class="basis-1/2">
          <h2>basic statistics</h2>
        </div>
        <div class="basis-1/2">
          <h2>graphs and tables</h2>

          <GChart
            type="ColumnChart"
            :data="chartData"
            :options="chartOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GChart } from "vue-google-charts";

const chartData = ref([
  ["genre", "number of books"],
  ["fantasy", 12],
  ["science fiction", 4],
  ["nonfiction", 15],
]);

const chartOptions = ref({
  chart: {
    title: "Company Performance",
    subtitle: "Sales: 2014-2017",
  },
  height: 400,
  colors: ["a78bfa"],
  backgroundColor: "transparent",
  tooltip: {
    isHtml: true,
    trigger: "none",
  },
  enableInteractivity: false,
  legend: {
    position: "none",
  },
  vAxis: {
    viewWindow: {
      max: 20,
      min: 0,
    },
  },
});
</script>

<style>
div.google-visualization-tooltip {
  @apply rounded-lg;
  @apply shadow-lg;
  /*@apply opacity-0;*/
  @apply transition;
}
</style>
