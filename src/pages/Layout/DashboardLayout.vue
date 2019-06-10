<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar :class="{'only-icons' : showIcons}" :showIcons="showIcons">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link :showIcons="showIcons"></sidebar-link>
    </side-bar>
    <div :class="[showIcons ? 'toggle-min' : 'toggle-max']" @click="showIcons=!showIcons">
      <md-speed-dial id="togglebutton" :class="[showIcons ? 'ml-1' : 'ml-6']">
        <md-speed-dial-target class="padding-zero">
          <md-icon v-if="showIcons">keyboard_arrow_right</md-icon>
          <md-icon v-else>keyboard_arrow_left</md-icon>
        </md-speed-dial-target>
      </md-speed-dial>
    </div>

    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content></dashboard-content>

      <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
    </div>
  </div>
</template>
<style lang="scss">
.only-icons {
  width: 60px !important;
}

.padding-zero {
  padding: 0px !important;
}

.toggle-min {
  padding-left: 4rem !important;
  position: absolute;
  z-index: 10;
}

.toggle-max {
  padding-left: 9rem !important;
  position: absolute;
  z-index: 10;
}

.md-button:not(.md-just-icon):not(.md-btn-fab):not(.md-icon-button):not(.md-toolbar-toggle)
  .md-ripple {
  padding: 0px !important;
}
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  data() {
    return {
      showIcons: false
    };
  }
};
</script>
