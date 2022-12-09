<template>
  <Line
    :styles="fullHeight"
    :chart-data="yearData"
    :chart-options="yearOptions"
  />
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const yearData = ref({
  labels: ["January", "February"],
  datasets: [{ data: [40, 39] }],
});

const yearOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  borderColor: "#a78bfa",
  hover: { mode: null },
  scale: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
});

const fullHeight = ref({ height: "100%" });

const supabase = useSupabaseClient();
const user = useSupabaseUser();

let user_loaded = false;
if (user.value) {
  userLoaded();
  user_loaded = true;
}
supabase.auth.onAuthStateChange((event, session) => {
  if (!user_loaded) {
    if (event == "SIGNED_IN") {
      userLoaded();
      user_loaded = true;
    }
  }
});

async function userLoaded() {
  const year = new Date().getFullYear();
  const start_date = new Date(year, 0, 1);
  const { data, error } = await supabase
    .from("books_read")
    .select()
    .eq("id", user.value.id)
    .gte("date", start_date.toISOString());

  let month_counts = [];
  for (let i = 0; i < 12; i++) {
    month_counts.push(0);
  }

  for (const book of data) {
    const date = new Date(book.date);
    const month = date.getMonth();
    month_counts[month]++;
  }

  let cumulative_month_counts = [];
  for (let i = 0; i < 12; i++) {
    if (i == 0) {
      cumulative_month_counts[i] = month_counts[i];
    } else {
      cumulative_month_counts[i] =
        month_counts[i] + cumulative_month_counts[i - 1];
    }
  }

  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  yearData.value = {
    labels: months,
    datasets: [{ data: cumulative_month_counts }],
  };
}
</script>
