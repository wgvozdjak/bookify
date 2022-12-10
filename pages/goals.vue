<template>
  <NewGoalPopup ref="newGoalPopup" />

  <button @click="setNewGoal">set new goal</button>

  <div></div>
</template>

<script setup>
import NewGoalPopup from "../components/goals/NewGoalPopup.vue";

const newGoalPopup = ref(null);
function setNewGoal() {
  newGoalPopup.value.openPopup();
}

async function getGoals() {}
</script>
