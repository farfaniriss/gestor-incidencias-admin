<template>
  <md-toolbar>
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end fixed-breadcrumb">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle md-button-transparent"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <i class="fas fa-bars" style="color: #434c52 !important; width: 100%"></i>
        </md-button>

        <div class="md-collapse">
          <!-- <div class="md-autocomplete">
            <md-autocomplete class="search" v-model="selectedEmployee" :md-options="employees">
              <label>Search...</label>
            </md-autocomplete>
          </div>-->
          <md-list>
            <md-list-item href="#/" class="dropdown">
              <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="material-icons">notifications</i>
                  <span class="notification">2</span>
                  <p class="hidden-lg hidden-md">Notifications</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li>
                    <a href="#">Jhon Whitman respondio a tu comentario</a>
                  </li>
                  <li>
                    <a href="#">La incidencia XYZ ha sido cerrada</a>
                  </li>
                </ul>
              </drop-down>
            </md-list-item>

            <md-list-item href="#/administracion/usuario">
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Perfil</p>
            </md-list-item>
            <md-list-item @click="logout">
              <i class="material-icons">exit_to_app</i>
              <p class="hidden-lg hidden-md">Salir</p>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { TokenService } from "../../storage.service";
import router from "../../routes/routes";

export default {
  data() {
    return {
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    logout() {
      TokenService.removeToken();
      router.push("/login");
    }
  }
};
</script>

<style lang="css">
.md-toolbar {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12) !important;
}
.fixed-breadcrumb {
  position: inherit;
}

.md-toolbar {
  padding-left: 20px !important;
  color: #434c52 !important;
}

@media screen and (max-width: 991px) {
  .fixed-breadcrumb {
    position: fixed;
    margin-left: 270px;
  }
}
</style>
