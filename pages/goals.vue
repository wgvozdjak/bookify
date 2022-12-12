<template>
  <NewGoalPopup ref="newGoalPopup" />

  <button @click="setNewGoal">set new goal</button>

  <div>
    <div v-for="(goal, index) in goals">
      <h2>Goal #{{ index }}</h2>
      <p>Start date: {{ goal.start_date }}</p>
      <p>End date: {{ goal.end_date }}</p>
      <p>Goal: {{ goal.book_count }}</p>
      <p>Status: {{ !goal.status ? "in progress" : "finished" }}</p>
    </div>
  </div>
</template>

<script setup>
import NewGoalPopup from "../components/goals/NewGoalPopup.vue";

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

  console.log(data);
  for (let goal of data) {
    goals.value.push({
      book_count: goal.book_count,
      start_date: goal.start_date,
      finish_date: goal.finish_date,
      status: goal.status,
    });
  }
  console.log(goals.value);
}
</script>
