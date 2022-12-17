<template>
  <div>
    <NewGoalPopup ref="newGoalPopup" />

    <h1 class="mb-2 text-3xl font-bold underline">your goals</h1>

    <button
      @click="setNewGoal"
      class="mb-6 rounded-xl border-2 border-solid border-black px-2 py-[2px]"
    >
      set new goal
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="inline h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        />
      </svg>
    </button>

    <div>
      <div v-for="(goal, index) in goals">
        <Goal
          :index="index + 1"
          :start_date="goal.start_date"
          :end_date="goal.end_date"
          :book_count="goal.book_count"
          :status="goal.status"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import NewGoalPopup from "../components/goals/NewGoalPopup.vue";
import Goal from "../components/goals/Goal.vue";

let user = useSupabaseUser();
const supabase = useSupabaseClient();

const goals = ref([]);

let user_loaded = false;
if (user.value) {
  getGoals();
  user_loaded = true;
}
supabase.auth.onAuthStateChange((event, session) => {
  if (!user_loaded) {
    if (event == "SIGNED_IN") {
      const timer = setInterval(async () => {
        user = useSupabaseUser();
        if (user.value) {
          clearInterval(timer);
          getGoals();
          user_loaded = true;
        }
      }, 100);
    }
  }
});

const newGoalPopup = ref(null);
function setNewGoal() {
  newGoalPopup.value.openPopup();
}

async function getGoals() {
  const { data, error } = await supabase
    .from("goals")
    .select()
    .eq("id", user.value.id);

  // TODO: i could probably just directly use the data variable in the vue code
  for (let goal of data) {
    goals.value.push({
      book_count: goal.book_count,
      start_date: goal.start_date,
      end_date: goal.end_date,
      status: goal.status,
    });
  }
}
</script>
