<template>
  <div>
    <div class="flex flex-col">
      <h1 class="mb-2 text-3xl font-bold underline">[book title goes here]</h1>
      <div class="flex flex-row">
        <div class="basis-1/3">description</div>
        <div class="basis-1/3">overall information</div>
        <div class="basis-1/3">personal information</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let user = useSupabaseUser();
const supabase = useSupabaseClient();

let urlParams;
let readID;

onMounted(() => {
  urlParams = new URLSearchParams(window.location.search);
  readID = urlParams.get("id");
  console.log(readID);
});

let user_loaded = false;
if (user.value) {
  getBook();
  user_loaded = true;
}
supabase.auth.onAuthStateChange((event, session) => {
  if (!user_loaded) {
    if (event == "SIGNED_IN") {
      const timer = setInterval(async () => {
        user = useSupabaseUser();
        if (user.value) {
          clearInterval(timer);
          getBook();
          user_loaded = true;
        }
      }, 100);
    }
  }
});

function getBook() {
  getGeneralData();
}

async function getGeneralData() {
  console.log("here " + readID);
  // put stuff in timer so readID is defined
  const timer = setInterval(async () => {});
  const { data, error } = await supabase
    .from("books_read")
    .select()
    .eq("read_id", readID);

  console.log(data);
}
</script>
