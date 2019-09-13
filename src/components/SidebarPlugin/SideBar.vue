<template>
  <div class="sidebar" :data-color="activeColor" :style="sidebarStyle">
    <div class="logo">
      <a href="#" :class="[showIcons ? 'ml-1' : 'ml-6','simple-text logo-md']">
        <div class="logo-new">
          <img :src="imgLogo" alt />
        </div>
      </a>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
      <slot>
        <sidebar-link></sidebar-link>
      </slot>
    </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  components: {
    SidebarLink
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    backgroundImage: {
      type: String,
      default: require("@/assets/img/sidebar-2.jpg")
    },
    imgLogo: {
      type: String,
      default: require("@/assets/img/logo_login.png")
    },
    activeColor: {
      type: String,
      default: "green",
      validator: value => {
        let acceptedValues = ["", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    showIcons: {
      type: Boolean
    }
  },
  data() {
    return {
      expandSingle: true
    };
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundColor: `#474A4F`
      };
    }
  }
};
</script>
<style>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }

  .ml-6 {
    margin-left: 3rem !important;
  }

  .ml-1 {
    margin-left: -1.3rem !important;
  }

  .logo-md {
    float: left;
    width: 130px;
    text-align: center;
    margin-right: 11px;
    position: relative;
    top: 6px;
  }
  .logo-new {
    height: 100px;
    width: auto;
    display: inline-block;
    background: transparent;
    text-align: center;
  }
}
</style>
