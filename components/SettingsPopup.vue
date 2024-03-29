<template>
  <Popup ref="popup">
    <template #header v-if="!user">sign in with magic link</template>
    <template #header v-else>settings</template>
    <template #default>
      <form v-if="!user" @submit.prevent="handleLogin" class="w-full">
        <div class="flex w-full flex-col gap-6">
          <FormInputElement v-model="email" content="email" />
          <div>
            <input
              type="submit"
              class="w-full cursor-pointer justify-center rounded-lg bg-violet-500 py-2 font-medium text-white transition hover:bg-violet-400"
              :value="loading ? 'loading' : 'send magic link'"
              :disabled="loading"
            />
          </div>
        </div>
      </form>

      <!-- TODO: Convert form into a Vue component -->
      <!-- TODO: Migrate fully to use @tailwindcss/forms -->
      <!-- Currently interacts weirdly with global form CSS in assets/global.css -->
      <form
        v-else
        class="mt-4 flex w-full flex-col gap-6"
        @submit.prevent="updateProfile"
      >
        <FormInputElement
          :value="user.email"
          content="email"
          :disabled="true"
        />
        <!--<FormInputElement v-model="username" content="username" />
        <FormInputElement v-model="website" content="website" />-->

        <div class="flex w-full flex-row gap-4">
          <!--<input
            type="submit"
            class="basis-1/2 cursor-pointer justify-center rounded-lg bg-violet-500 py-2 font-medium text-white transition hover:bg-violet-400"
            :value="loading ? 'loading ...' : 'update'"
            :disabled="loading"
          />-->

          <button
            class="basis-full cursor-pointer justify-center rounded-lg bg-violet-500 py-2 font-medium text-white transition hover:bg-violet-400"
            @click="signOut"
            :disabled="loading"
          >
            sign out
          </button>
        </div>
      </form>
    </template>
  </Popup>
</template>

<script setup>
import Popup from "./Popup.vue";
import FormInputElement from "./forms/FormInputElement.vue";

import { ref } from "vue";
const popup = ref(null);
defineExpose({ openPopup });
function openPopup() {
  popup.value.openPopup();
}

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const loading = ref(false);
const username = ref("");
const website = ref("");
const avatar_path = ref("");
const email = ref("");

// --- SIGNING IN (WHEN USER IS NOT SIGNED IN)
const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signIn({ email: email.value });
    if (error) throw error;
    alert("Check your email for the login link!");
  } catch (error) {
    alert(error.error_description || error.message);
  } finally {
    loading.value = false;
  }
};

// --- PROFILE UPDATING (WHEN USER IS SIGNED IN)
// Get current profile data
supabase.auth.onAuthStateChange((event, session) => {
  if (event == "SIGNED_IN") {
    const timer = setInterval(async () => {
      const user_for_updating = useSupabaseUser();
      if (user_for_updating.value) {
        clearInterval(timer);
        loading.value = true;
        let { data } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url`)
          .eq("id", user_for_updating.value.id)
          .single();
        if (data) {
          username.value = data.username;
          website.value = data.website;
          avatar_path.value = data.avatar_url;
        }
        loading.value = false;
      }
    }, 100);
  }
});

if (user.value) {
  loading.value = true;
  let { data } = await supabase
    .from("profiles")
    .select(`username, website, avatar_url`)
    .eq("id", user.value.id)
    .single();
  if (data) {
    username.value = data.username;
    website.value = data.website;
    avatar_path.value = data.avatar_url;
  }
  loading.value = false;
}

// Update profile data
// TODO: remove this unnecessary stuff
async function updateProfile() {
  try {
    loading.value = true;
    const user = useSupabaseUser();
    const updates = {
      id: user.value.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    };
    let { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    });
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

// --- SIGN OUT
async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>
