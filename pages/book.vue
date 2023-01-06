<template>
  <div>
    <div class="flex flex-col">
      <h1 class="mb-6 text-3xl font-bold underline">
        book information: {{ book_data.title }}
      </h1>
      <div class="flex flex-row">
        <div class="basis-1/3">
          <h2 class="font-bold underline">description</h2>
          <p></p>
        </div>

        <div class="basis-1/3">
          <h2 class="font-bold underline">overall information</h2>
          <p>author: {{ book_data.author }}</p>
          <p>genre: {{ book_data.genre }}</p>
        </div>

        <div class="basis-1/3">
          <h2 class="font-bold underline">personal information</h2>

          <p>date added: {{ book_data.date }}</p>
          <div>
            <p class="mr-2 inline">rating:</p>
            <div class="inline">
              <div class="inline" v-for="index in 5">
                <svg
                  aria-hidden="true"
                  class="inline-block h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  v-if="index <= book_data.rating"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  class="inline-block h-5 w-5 text-gray-300 dark:text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  v-else
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let user = useSupabaseUser();
const supabase = useSupabaseClient();

let urlParams;
let read_id;

const book_data = ref({});

onMounted(() => {
  urlParams = new URLSearchParams(window.location.search);
  read_id = urlParams.get("id");
});

let user_loaded = false;
if (user.value) {
  getBookData();
  user_loaded = true;
}
supabase.auth.onAuthStateChange((event, session) => {
  if (!user_loaded) {
    if (event == "SIGNED_IN") {
      const timer = setInterval(async () => {
        user = useSupabaseUser();
        if (user.value) {
          clearInterval(timer);
          getBookData();
          user_loaded = true;
        }
      }, 100);
    }
  }
});

async function getBookData() {
  const timer = setInterval(async () => {
    if (read_id != null) {
      getSpecificData(read_id).then((specificData) => {
        const book_id = specificData[0].book_id;

        book_data.value["rating"] = specificData[0].rating;
        book_data.value["date"] = specificData[0].date;

        getGeneralData(book_id).then((generalData) => {
          book_data.value["title"] = generalData[0].title;
          book_data.value["author"] = generalData[0].author;
          book_data.value["genre"] = generalData[0].genre;
        });
      });

      clearInterval(timer);
    }
  }, 100);
}

async function getSpecificData(read_id) {
  const { data, error } = await supabase
    .from("books_read")
    .select()
    .eq("read_id", read_id);

  return data;
}

async function getGeneralData(book_id) {
  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("book_id", book_id);

  return data;
}
</script>
