<template>
  <div class="mx-auto flex min-h-screen flex-col justify-start">
    <NavigationBar @settings-clicked="openSettings" />
    <div class="mx-auto w-full max-w-screen-2xl px-6"><slot /></div>
    <!--<Footer class="mt-auto" />-->
    <SettingsPopup ref="settingsPopup" />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import NavigationBar from "../components/NavigationBar.vue";
import SettingsPopup from "../components/SettingsPopup.vue";

export default {
  components: {
    NavigationBar,
    Footer,
    SettingsPopup,
  },
  methods: {
    openSettings() {
      this.$refs.settingsPopup.openPopup();
    },
  },
};
</script>
