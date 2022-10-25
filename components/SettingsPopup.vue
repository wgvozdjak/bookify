<template>
  <Popup ref="popup">
    <template #header>bookify settings</template>
    <template #default>
      <form v-if="!user" @submit.prevent="handleLogin" class="w-full">
        <div class="flex w-full flex-col gap-3">
          <div class="flex w-full flex-col gap-1">
            <h2>Sign in with magic link</h2>
            <input
              class="w-full rounded-md border-2 border-solid border-gray-300 p-1"
              type="email"
              placeholder="Your email"
              v-model="email"
            />
            <div>
              <input
                type="submit"
                class="w-full cursor-pointer rounded-md border-2 border-solid border-gray-300 bg-gray-200 p-1 text-left hover:bg-gray-300 active:border-gray-400 active:bg-gray-400"
                :value="loading ? 'Loading' : 'Send magic link'"
                :disabled="loading"
              />
            </div>
          </div>
        </div>
      </form>

      <!-- TODO: Convert form into a Vue component -->
      <!-- TODO: Migrate to use @tailwindcss/forms -->
      <form
        v-else
        class="flex w-full flex-col gap-10"
        @submit.prevent="updateProfile"
      >
        <div class="relative">
          <input
            class="peer w-full border-b-2 bg-white py-2 placeholder-transparent focus:border-sky-500 focus:outline-none"
            id="email"
            placeholder="Email"
            type="text"
            :value="user.email"
            disabled
          />
          <label
            for="email"
            class="absolute left-0 -top-3.5 cursor-text text-sm text-sky-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-sky-500"
            >Email</label
          >
        </div>
        <div class="relative">
          <input
            class="peer w-full border-b-2 bg-white py-2 placeholder-transparent focus:border-sky-500 focus:outline-none"
            id="username"
            type="text"
            placeholder="Username"
            v-model="username"
          />
          <label
            for="username"
            class="absolute left-0 -top-3.5 cursor-text text-sm text-sky-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-sky-500"
            >Username</label
          >
        </div>
        <div class="relative">
          <input
            class="peer w-full border-b-2 bg-white py-2 placeholder-transparent focus:border-sky-500 focus:outline-none"
            id="website"
            type="website"
            placeholder="Website"
            v-model="website"
          />
          <label
            for="website"
            class="absolute left-0 -top-3.5 cursor-text text-sm text-sky-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-sky-500"
            >Website</label
          >
        </div>

        <div class="flex w-full flex-row gap-4">
          <input
            type="submit"
            class="basis-1/2 cursor-pointer justify-center rounded-lg bg-sky-500 py-2 font-semibold transition hover:bg-sky-400"
            :value="loading ? 'Loading ...' : 'Update'"
            :disabled="loading"
          />

          <button
            class="basis-1/2 cursor-pointer justify-center rounded-lg bg-sky-500 py-2 font-semibold transition hover:bg-sky-400"
            @click="signOut"
            :disabled="loading"
          >
            Sign Out
          </button>
        </div>
      </form>
    </template>
  </Popup>
</template>

<script setup>
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
