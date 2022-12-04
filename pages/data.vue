<template>
  <div>
    <div class="flex flex-col">
      <div class="font-bold">data</div>
      <div class="flex flex-row">
        <div class="basis-1/2">
          <h2>basic statistics</h2>
        </div>
        <div class="basis-1/2">
          <h2 class="mb-4">graphs and tables</h2>
          <GraphsDropdown ref="genreDropdown">
            <template #label>book genre distribution</template>
            <template #default>
              <Bar
                :chart-options="chartOptions"
                :chart-data="chartData"
                :styles="fullHeight"
              />
            </template>
          </GraphsDropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GraphsDropdown from "../components/data/GraphsDropdown.vue";

import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const chartData = ref({
  labels: [],
  datasets: [{ data: [] }],
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  backgroundColor: "#a78bfa",
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

const books_list = ref([]);
const genre_counts = new Map();

// potential TODO: is there some sort of ``helper function'' idea in view that i can move this to?
// because getBookList is also used in BooksTable and likely will be used elsewhere in the future
async function getBookList(user_id) {
  // TODO: add row-level security that only allows a user to select rows that are attached to their user id
  const { data, error } = await supabase.rpc("list_books_by_user", {
    user_id: user_id,
  });

  for (let book of data) {
    const date = book.book_date;

    // TODO: feels like a hacky way to do this? should the date object be a string object in the first place, or a date datatype?
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(5, 7));
    const day = parseInt(date.substring(8, 10));
    const date_parsed = month + "/" + day + "/" + year;

    books_list.value.push({
      date: date_parsed,
      title: book.title,
      author: book.author,
      genre: book.genre,
      rating: book.rating,
      tags: "this is a test",
    });
  }
}

function getGenreData() {
  getBookList(user.value.id).then(() => {
    for (const book of books_list.value) {
      const genre = book.genre;
      // TODO: improve this algorithm? maybe just store counts in database directly
      // also could have preset genres but that restricts user to those genres
      if (genre_counts.has(genre)) {
        genre_counts.set(genre, genre_counts.get(genre) + 1);
      } else {
        genre_counts.set(genre, 1);
      }
    }

    let genres = [];
    let counts = [];
    for (const [genre, count] of genre_counts) {
      genres.push(genre);
      counts.push(count);
    }
    chartData.value = {
      labels: genres.slice(),
      datasets: [{ data: counts.slice() }],
    };
  });
}

function userLoaded() {
  getGenreData();
}

let user_loaded = false;
if (user.value) {
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

if (user_loaded) {
  userLoaded();
}
</script>
