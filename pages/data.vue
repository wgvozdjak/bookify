<template>
  <div>
    <div class="flex flex-col">
      <div class="mb-6 text-3xl font-bold">data</div>
      <div class="flex flex-row">
        <div class="basis-1/2">
          <h2 class="mb-4 font-bold">basic statistics</h2>
          <div>
            <div>total books read: {{ count_books }}</div>
            <div>
              average days spent per book:
              {{ Math.round((average_time + Number.EPSILON) * 100) / 100 }}

              <!-- TODO: add notice that this only computes average of books where both start date and end date were provided -->
            </div>
          </div>
        </div>
        <div class="basis-1/2">
          <h2 class="mb-4 font-bold">graphs and tables</h2>
          <GraphsDropdown class="mb-4">
            <template #label>book genre distribution</template>
            <template #graph>
              <Bar
                :chart-options="chartOptions"
                :chart-data="genreChartData"
                :styles="fullHeight"
              />
            </template>
            <template #table>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>genre</th>
                    <th>count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="genre in genre_counts">
                    <td>{{ genre[0] }}</td>
                    <td>{{ genre[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </template>
          </GraphsDropdown>

          <GraphsDropdown class="mb-4">
            <template #label>book rating distribution</template>
            <template #graph>
              <Bar
                :chart-options="chartOptions"
                :chart-data="ratingChartData"
                :styles="fullHeight"
              />
            </template>
            <template #table>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>rating</th>
                    <th>count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(rating_count, index) in rating_counts_all">
                    <td>{{ index + 1 }}</td>
                    <td>{{ rating_count }}</td>
                  </tr>
                </tbody>
              </table>
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

const genreChartData = ref({
  labels: [],
  datasets: [{ data: [] }],
});
const ratingChartData = ref({
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

const count_books = ref(0);
const average_time = ref(0);

const fullHeight = ref({ height: "100%" });

const supabase = useSupabaseClient();
let user = useSupabaseUser();

const books_list = ref([]);
const genre_counts = new Map();
const rating_counts = new Map();

const rating_counts_all = ref([0, 0, 0, 0, 0]);

// potential TODO: is there some sort of ``helper function'' idea in view that i can move this to?
// because getBookList is also used in BooksTable and likely will be used elsewhere in the future
async function getBookList(user_id) {
  // TODO: add row-level security that only allows a user to select rows that are attached to their user id
  const { data, error } = await supabase.rpc("list_books_by_user", {
    user_id: user_id,
  });

  let count_not_null = 0;

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
      tags: "",
    });
    count_books.value++;

    if (book.start_date != null && book.finish_date != null) {
      const dateDiff = Math.abs(
        new Date(book.finish_date) - new Date(book.start_date)
      );
      // TODO: do i want this +1 (to include both the start and end date)?
      const days = Math.ceil(dateDiff / (1000 * 60 * 60 * 24)) + 1;

      average_time.value += days;
      count_not_null++;
    }
  }

  average_time.value /= count_not_null;
}

function getGenreData() {
  for (const book of books_list.value) {
    // TODO: do this with sql queries rather than JS bashing
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
  genreChartData.value = {
    labels: genres.slice(),
    datasets: [{ data: counts.slice() }],
  };
}

// TODO: move this to getGenreData to create a general getData
// to speed up things
function getRatingData() {
  for (const book of books_list.value) {
    const rating = book.rating;
    if (rating_counts.has(rating)) {
      rating_counts.set(rating, rating_counts.get(rating) + 1);
    } else {
      rating_counts.set(rating, 1);
    }
  }

  for (const [rating, count] of rating_counts) {
    rating_counts_all.value[rating - 1] = count;
  }
  ratingChartData.value = {
    labels: [1, 2, 3, 4, 5],
    datasets: [{ data: rating_counts_all.value.slice() }],
  };
}

function userLoaded() {
  getBookList(user.value.id).then(() => {
    getGenreData();
    getRatingData();
  });
}

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
</script>

<style>
.data-table {
  @apply w-full border-separate border-spacing-0 rounded-xl border-[1px] border-slate-300;
}

.data-table th:first-child {
  @apply border-r-[1px] border-slate-300;
}

.data-table td:first-child {
  @apply border-r-[1px] border-slate-300;
}

.data-table th,
.data-table td {
  @apply px-3 py-2 text-left;
}
</style>
