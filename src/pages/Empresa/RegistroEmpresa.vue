<template>
<div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
  <form>
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Registro de empresa</h4>
        <p class="category">Complete los datos de la empresa</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>RUC</label>
              <md-input v-model="ruc" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Razon social</label>
              <md-input v-model="razonsocial" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Pagina web</label>
              <md-input v-model="webpage" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Logo</label>
              <md-input v-model="logo" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Direccion</label>
              <md-input v-model="direccion" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Telefono</label>
              <md-input v-model="telefono" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Plan</label>
              <md-input v-model="plan" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Activo</label>
              <md-input v-model="activo" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success">Registrar</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
      </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      ruc: "",
      razonsocial: "",
      webpage: "",
      logo: "",
      direccion: "",
      telefono: "",
      plan: "",
      activo: ""
    };
  }
};
</script>
<style></style>
