<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Incidencias activas</h4>
            <p class="category">Aún pendientes de atención</p>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
              <vs-list>
                <vs-list-item
                  v-for="(incidencia, index) in incidenciasActivas"
                  :key="index"
                  icon="check"
                  :title="incidencia.titulo"
                  :subtitle="incidencia.descripcion"
                >
                  <vs-button color="success" to="incidencia/1">Ver</vs-button>
                </vs-list-item>
              </vs-list>
            </div>
          </md-card-content>
        </md-card>
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">Incidencias cerradas</h4>
            <p class="category">Problemas resueltos</p>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
              <vs-list>
                <vs-list-item
                  icon="verified_user"
                  title="Problema al registrar un nuevo producto"
                  subtitle="El sistema no me permite registrar un producto"
                >
                  <vs-button color="success" to="incidencia/3">Ver</vs-button>
                </vs-list-item>
              </vs-list>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartId: "no-id",
      incidenciasActivas: [],
      incidenciasCerradas: []
    };
  },
  created() {
    // Listen to changes coming from SignalR events
    this.$incidenciaHub.$on("incidencia-added", this.onIncidenciaAdded);
  },
  mounted() {
    this.incidenciasActivas.push({
      titulo: "Problema en calculo de horas extras",
      descripcion:
        "Las horas extras registradas en el sistema no coinciden con el total de mes"
    });
    this.incidenciasActivas.push({
      titulo: "Problema al actualizar producto",
      descripcion:
        "El sistema no permite actualizar el producto despues de cerrado el inventario"
    });
  },
  methods: {
    initChart() {
      console.log("initChart");
    },
    onIncidenciaAdded(data) {
      console.log(data.incidencia);
      this.incidenciasActivas.push(data.incidencia);
    }
  },
  beforeDestroy() {
    // Make sure to cleanup SignalR event handlers when removing the component
    this.$incidenciaHub.$off("incidencia-added", this.onIncidenciaAdded);
  }
};
</script>
<style lang="scss" scoped>
</style>
