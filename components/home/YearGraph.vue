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
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);

const yearData = ref({
  labels: [],
  datasets: [{ data: [] }, { data: [] }],
});

const yearOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
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
let user = useSupabaseUser();

let user_loaded = false;
if (user.value) {
  userLoaded();
  user_loaded = true;
}
supabase.auth.onAuthStateChange((event, session) => {
  if (!user_loaded) {
    if (event == "SIGNED_IN") {
      const timer = setInterval(async () => {
        user = useSupabaseUser();
        if (user.value) {
          clearInterval(timer);
          userLoaded();
          user_loaded = true;
        }
      }, 100);
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

  // TODO: add a special yearly goal that this will refer to (stop hardcoding this)
  const goal = 7;

  const increment = goal / 12;
  yearData.value = {
    labels: months,
    datasets: [
      {
        data: cumulative_month_counts,
        borderColor: "#a78bfa",
        /*backgroundColor: "#a78bfa",*/
        fill: false,
        label: "progress",
      },
      {
        data: [
          increment,
          increment * 2,
          increment * 3,
          increment * 4,
          increment * 5,
          increment * 6,
          increment * 7,
          increment * 8,
          increment * 9,
          increment * 10,
          increment * 11,
          increment * 12,
        ],
        fill: false,
        label: "goal",
      },
    ],
  };
}
</script>
