<template>
  <div>
    <md-list-item>
      <slot>
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </slot>
    </md-list-item>
    <md-list-item md-expand>
      <md-icon>content_paste</md-icon>
      <p>Incidencias</p>
      <md-list slot="md-expand">
        <router-link to="/registro" class="md-inset pl-2 item-text">
          <md-list-item>Registro</md-list-item>
        </router-link>
        <router-link to="/historial" class="md-inset pl-2 item-text">
          <md-list-item>Historial</md-list-item>
        </router-link>
      </md-list>
    </md-list-item>
    <md-list-item>
      <md-icon>person</md-icon>
      <p>
        <router-link to="/user">Perfil</router-link>
      </p>
    </md-list-item>
  </div>
</template>
<script>
export default {
  inject: {
    autoClose: {
      default: true
    }
  },
  props: {
    link: {
      type: [String, Object],
      default: () => {
        return {
          name: "",
          path: "",
          icon: "",
          sublink: {
            name: "",
            path: "",
            icon: ""
          }
        };
      }
    },
    tag: {
      type: String,
      default: "router-link"
    }
  },
  methods: {
    hideSidebar() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
<style>
.pl-2 {
  padding-left: 1.5rem;
}

.md-list-item-container {
  font-size: 14px !important;
}
</style>
