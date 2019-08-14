<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar :class="{'only-icons' : showIcons}" :showIcons="showIcons">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link :showIcons="showIcons"></sidebar-link>
    </side-bar>
    <div
      id="togglebutton"
      :class="[showIcons ? 'toggle-min' : 'toggle-max']"
      @click="showIcons=!showIcons"
    >
      <md-speed-dial :class="[showIcons ? 'ml-1' : 'ml-6']">
        <md-speed-dial-target class="padding-zero">
          <i class="fas fa-bars"></i>
        </md-speed-dial-target>
      </md-speed-dial>
    </div>

    <div :class="[showIcons ? 'main-panel main-panel-larger' : 'main-panel']">
      <top-navbar></top-navbar>
      <div style="margin-top: 100px; margin-left: 10px; margin-right: 10px;">
        <dashboard-content></dashboard-content>
      </div>
      <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
    </div>
  </div>
</template>
<style lang="scss">
.main-panel-larger {
  width: calc(100% - 60px) !important;
}

.only-icons {
  width: 60px !important;
}

.padding-zero {
  padding: 0px !important;
}

.toggle-min {
  padding-top: 0.5rem !important;
  padding-left: 4.7rem !important;
  position: fixed;
  z-index: 10;
}

.toggle-max {
  padding-top: 0.5rem !important;
  padding-left: 12rem !important;
  position: fixed;
  z-index: 10;
}

.md-button:not(.md-just-icon):not(.md-btn-fab):not(.md-icon-button):not(.md-toolbar-toggle)
  .md-ripple {
  padding: 0px !important;
}

@media screen and (max-width: 991px) {
  #togglebutton {
    display: none;
  }
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
