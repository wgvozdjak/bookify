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
  ["Year", "Sales"],
  ["2014", 1000],
  ["2015", 1170],
  ["2016", 660],
  ["2017", 1030],
]);

const chartOptions = ref({
  chart: {
    title: "Company Performance",
    subtitle: "Sales: 2014-2017",
  },
  colors: ["a78bfa"],
  backgroundColor: "transparent",
  tooltip: {
    isHtml: true,
  },
});

document.querySelector("div.google-visualization-tooltip").addEventListener;
</script>

<style>
div.google-visualization-tooltip {
  @apply rounded-lg;
  @apply shadow-lg;
  @apply opacity-0;
  @apply transition;
}
</style>
