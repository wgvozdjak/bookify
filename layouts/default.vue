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
  /* 
    TODO: background-size is a little hacky, e.g. when page size increases. cover might be better
    but i don't really like the look of it.
    TODO: img tag etc. might be better to speed the image up. see https://wpspeedmatters.com/speed-up-background-images/
  */
  background-size: 100% 100%;
}
</style>
