<template>
  <div>
    <md-list-item @click="hideSidebar" :class="{'hidden-text-menu': showIcons}">
      <router-link to="/dashboard" class="menu-router-link">
        <md-icon>dashboard</md-icon>Dashboard
      </router-link>
    </md-list-item>
    <md-list-item md-expand :class="{'hidden-text-menu': showIcons}">
      <md-icon>apps</md-icon>
      <p class="white-text">Soporte</p>
      <md-list slot="md-expand">
        <md-list-item @click="hideSidebar">
          <router-link to="/registro" :class="{'pl-2': !showIcons}">
            <md-icon>bug_report</md-icon>Ticket
          </router-link>
        </md-list-item>
        <md-list-item @click="hideSidebar">
          <router-link to="/historial" :class="{'pl-2': !showIcons}">
            <md-icon>assignment</md-icon>Historial
          </router-link>
        </md-list-item>
        <md-list-item @click="hideSidebar">
          <router-link to="/historial" :class="{'pl-2': !showIcons}">
            <md-icon>work</md-icon>Base de conocimiento
          </router-link>
        </md-list-item>
      </md-list>
    </md-list-item>
    <md-list-item md-expand :class="{'hidden-text-menu': showIcons}">
      <md-icon>settings</md-icon>
      <p class="white-text">Configuración</p>
      <md-list slot="md-expand">
        <md-list-item @click="hideSidebar">
          <router-link to="/registro" :class="{'pl-2': !showIcons}">
            <md-icon>storage</md-icon>Tablas
          </router-link>
        </md-list-item>
      </md-list>
    </md-list-item>
    <md-list-item md-expand :class="{'hidden-text-menu': showIcons}">
      <md-icon>supervisor_account</md-icon>
      <p class="white-text">Administración</p>
      <md-list slot="md-expand">
        <md-list-item @click="hideSidebar">
          <router-link to="/registro" :class="{'pl-2': !showIcons}">
            <md-icon>person_add</md-icon>Usuarios
          </router-link>
        </md-list-item>
        <md-list-item @click="hideSidebar">
          <router-link to="/registro" :class="{'pl-2': !showIcons}">
            <md-icon>group_add</md-icon>Empresa
          </router-link>
        </md-list-item>
      </md-list>
    </md-list-item>
    <md-list-item @click="hideSidebar" :class="{'hidden-text-menu': showIcons}">
      <router-link to="/user" class="menu-router-link">
        <md-icon>person</md-icon>Perfil
      </router-link>
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
    showIcons: {
      type: Boolean,
      default: false
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
  padding-left: 1.5rem !important;
}

.md-list-item-container {
  font-size: 14px !important;
}

.menu-router-link {
  margin: 0;
  line-height: 30px;
  font-size: 14px;
  position: relative;
  display: block;
  height: auto;
  font-weight: 300;
  white-space: nowrap;
}

.white-text {
  color: white !important;
}

.hidden-text-menu {
  width: 20% !important;
}
</style>
