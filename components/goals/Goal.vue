<template>
  <h2 class="font-bold">goal #{{ index }}</h2>
  <div class="pl-10">
    <div class="flex flex-row">
      <div class="basis-1/2">
        <p>start date: {{ start_date }}</p>
        <p>end date: {{ end_date }}</p>
        <p>goal: {{ book_count }}</p>
        <p>status: {{ !status ? "in progress" : "finished" }}</p>
      </div>
      <div class="basis-1/2">
        <Line :chart-data="goalData" :chart-options="goalOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "vue-chartjs";
//import "chartjs-adapter-moment";

ChartJS.register(LinearScale, TimeScale, PointElement, LineElement, Legend);

const props = defineProps({
  index: Number,
  start_date: String,
  end_date: String,
  book_count: Number,
  status: Boolean,
});

const { index, start_date, end_date, book_count, status } = toRefs(props);

/*const goalData = ref({
  labels: [],
  datasets: [{ data: [] }],
});*/

const goalData = ref({
  labels: [new Date("2015-03-15T13:03:00Z"), new Date("2015-03-25T13:02:00Z")],
  datasets: [
    {
      data: [120, 30],
    },
  ],
});

/*const goalOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  hover: { mode: null },
  scale: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
    xAxes: [
      {
        type: "time",
        distribution: "linear",
      },
    ],
  },
});*/

const goalOptions = ref({
  scales: {
    x: {
      type: "time",
    },
  },
});

let user = useSupabaseUser();
const supabase = useSupabaseClient();

let user_loaded = false;
if (user.value) {
  //getBooksInRange(start_date.value, end_date.value);
  user_loaded = true;
}
supabase.auth.onAuthStateChange((event, session) => {
  if (!user_loaded) {
    if (event == "SIGNED_IN") {
      const timer = setInterval(async () => {
        user = useSupabaseUser();
        if (user.value) {
          clearInterval(timer);
          //getBooksInRange(start_date.value, end_date.value);
          user_loaded = true;
        }
      }, 100);
    }
  }
});

// TODO: currently i make this request for every separate goal
// would require less requests to somehow get all necessary books in one go and filter later?
async function getBooksInRange(start_date, end_date) {
  const { data, error } = await supabase
    .from("books_read")
    .select()
    .eq("id", user.value.id)
    .gte("date", new Date(start_date).toISOString())
    .lte("date", new Date(end_date).toISOString())
    .order("date", { ascending: true });

  let labels = [];
  let datapoints = [];

  let last_date = "";
  let current_count = 0;
  for (let book of data) {
    current_count++;
    if (book.date == last_date) {
      datapoints[datapoints.length - 1] = current_count;
    } else {
      labels.push(new Date(book.date));
      datapoints.push(current_count);
    }
    last_date = book.date;
  }

  console.log(data);
  console.log(labels);
  console.log(datapoints);

  goalData.value = {
    labels: labels,
    datasets: [
      {
        data: datapoints,
        borderColor: "#a78bfa",
        /*backgroundColor: "#a78bfa",*/
        fill: false,
        label: "progress",
      },
      /*{
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
      },*/
    ],
  };
}
</script>
