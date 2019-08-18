<template>
  <div>
    <md-list class="nav" md-expand-single="true">
      <md-list-item @click="hideSidebar" :class="{'hidden-text-menu': showIcons}">
        <router-link to="/inicio" class="menu-router-link">
          <md-icon>dashboard</md-icon>Inicio
        </router-link>
      </md-list-item>
      <md-list-item
        md-expand
        :md-expanded.sync="expandConfig"
        :class="{'hidden-text-menu': showIcons}"
        @click="expandAdmin = false"
      >
        <md-icon>settings</md-icon>
        <p class="white-text">Configuración</p>
        <md-list slot="md-expand">
          <!-- <md-list-item @click="hideSidebar">
            <router-link to="/configuracion/tablas" :class="{'pl-2': !showIcons}">
              <md-icon>storage</md-icon>Tablas
            </router-link>
          </md-list-item>-->
        </md-list>
      </md-list-item>
      <md-list-item
        md-expand
        :class="{'hidden-text-menu': showIcons}"
        :md-expanded.sync="expandAdmin"
        @click="expandConfig = false"
      >
        <md-icon>supervisor_account</md-icon>
        <p class="white-text">Administración</p>
        <md-list slot="md-expand">
          <md-list-item v-for="(permiso) in permisos" :key="permisosReload" @click="hideSidebar">
            <router-link :to="permiso.cRuta" :class="{'pl-2': !showIcons}">
              <md-icon>{{permiso.cIcon}}</md-icon>
              {{permiso.cMenuNombre}}
            </router-link>
          </md-list-item>
          <!-- <md-list-item @click="hideSidebar">
            <router-link to="/administracion/usuarios" :class="{'pl-2': !showIcons}">
              <md-icon>person_add</md-icon>Usuario
            </router-link>
          </md-list-item>
          <md-list-item @click="hideSidebar">
            <router-link to="/administracion/unidadoperativa" :class="{'pl-2': !showIcons}">
              <md-icon>meeting_room</md-icon>U. Ope / Sucursal
            </router-link>
          </md-list-item>
          <md-list-item @click="hideSidebar">
            <router-link to="/administracion/area" :class="{'pl-2': !showIcons}">
              <md-icon>school</md-icon>Area / Cargo
            </router-link>
          </md-list-item>
          <md-list-item @click="hideSidebar">
            <router-link to="/administracion/planpago" :class="{'pl-2': !showIcons}">
              <md-icon>payment</md-icon>Plan de pago
            </router-link>
          </md-list-item>-->
        </md-list>
      </md-list-item>
    </md-list>
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
  data() {
    return {
      expandSingle: true,
      expandConfig: false,
      expandAdmin: false,
      permisos: [],
      permisosReload: 0
    };
  },
  mounted() {
    var retrievedObject = localStorage.getItem("user");
    var user = JSON.parse(retrievedObject);
    this.permisos = user.permisos;
    console.log(this.permisos);
    this.permisosReload++;
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

.md-icon.md-theme-default.md-icon-image svg {
  fill: white !important;
  /* fill: var(--md-theme-default-icon-on-background, rgba(0, 0, 0, 0.54)); */
}

.md-list-expand-icon {
  margin-left: auto !important;
}
</style>
