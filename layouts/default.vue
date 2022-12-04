<template>
  <div id="wrapper" class="h-full w-full">
    <div class="mx-auto flex min-h-screen flex-col justify-start">
      <NavigationBar @settings-clicked="openSettings" />
      <div class="mx-auto w-full max-w-screen-lg px-6"><slot /></div>
      <!--<Footer class="mt-auto" />-->
      <SettingsPopup ref="settingsPopup" />
    </div>
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

<style>
#wrapper {
  background-image: url("assets/background.png");
  background-size: 100% 100%;
}
</style>
