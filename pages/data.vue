<template>
  <div>
    <div class="flex flex-col">
      <div class="font-bold">data</div>
      <div class="flex flex-row">
        <div class="basis-1/2">
          <h2>basic statistics</h2>
        </div>
        <div class="basis-1/2">
          <h2 class="mb-8">graphs and tables</h2>

          <GraphsDropdown ref="genreDropdown">
            <template #label>book genre distribution</template>
            <template #default class="border-2 border-solid border-black">
              <GChart
                type="ColumnChart"
                :data="chartData"
                :options="chartOptions"
                @ready="chartReady"
              />
              <!-- :events="chartEvents" -->
            </template>
          </GraphsDropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GraphsDropdown from "../components/data/GraphsDropdown.vue";
import { GChart } from "vue-google-charts";

const chartData = ref([
  ["genre", "number of books"],
  ["", 0],
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
      //max: 20,
      min: 0,
    },
    format: "#",
    gridlines: {
      multiple: 1,
    },
    minorGridlines: {
      multiple: 1,
    },
  },
});

const genreDropdown = ref(null);
function chartReady(chart, google) {
  genreDropdown.value.closeDropdown();
  chart.draw(chartData.value, chartOptions.value);
}

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const books_list = ref([]);
const genre_counts = new Map();

let max_genre_count = -1;

// potential TODO: is there some sort of ``helper function'' idea in view that i can move this to?
// because getBookList is also used in BooksTable and likely will be used elsewhere in the future
async function getBookList(user_id) {
  // TODO: add row-level security that only allows a user to select rows that are attached to their user id
  const { data, error } = await supabase.rpc("list_books_by_user", {
    user_id: user_id,
  });

  for (let book of data) {
    const date = book.book_date;

    console.log(book);

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

    // TODO: there's probably a better way to remove the dummy element of the content
    // i could just remove it at the very beginning but then there's technically a short
    // time period where there's nothing in the array
    // i could also just remove it at the very end but then time complexity is bad
    let index = 0;
    for (const [genre, count] of genre_counts) {
      chartData.value.push([genre, count]);
      if (count > max_genre_count) {
        max_genre_count = count;
      }

      if (index == 0) {
        chartData.value.splice(1, 1);
      }
      index++;
    }
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

<style>
div.google-visualization-tooltip {
  @apply rounded-lg;
  @apply shadow-lg;
  /*@apply opacity-0;*/
  @apply transition;
}
</style>
