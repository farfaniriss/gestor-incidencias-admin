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
                  icon="check"
                  title="Problema en calculo de horas extras"
                  subtitle="Las horas extras registradas en el sistema no coinciden con el total de mes"
                >
                  <vs-button color="success" to="incidencia/1">Ver</vs-button>
                </vs-list-item>
                <vs-list-item
                  icon="check"
                  title="Problema al actualizar producto"
                  subtitle="El sistema no permite actualizar el producto despues de cerrado el inventario"
                >
                  <vs-button color="success" to="incidencia/2">Ver</vs-button>
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
      chartId: "no-id"
    };
  },
  methods: {
    initChart() {
      console.log("initChart");
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
</style>
