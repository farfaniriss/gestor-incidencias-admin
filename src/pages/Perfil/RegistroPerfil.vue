<template>
<div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
  <form>
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Registro de perfil</h4>
        <p class="category">Complete los datos del perfil</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Nombre</label>
              <md-input v-model="nombre" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Descripcion</label>
              <md-input v-model="descripcion" type="text"></md-input>
            </md-field>
          </div>
          <!-- <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Estado</label>
              <md-input v-model="estado" type="text"></md-input>
            </md-field>
          </div> -->

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-list>
              <md-subheader>Menus</md-subheader>
                <md-list-item v-for="(menu, index) in menus" :key="index"  @click="agregarPermiso(menu)">
                  {{menu}}
                </md-list-item>
              </md-list>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-list>
              <md-subheader>Accesos</md-subheader>
                <md-list-item v-for="(permiso, index) in permisos" :key="index" @click="quitarPermiso(permiso)">
                  {{permiso}}
                </md-list-item>
              </md-list>
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
      nombre: "",
      descripcion: "",
      estado: "",
      menus: ["Configuracion > Empresa", "Configuracion > Usuario", "Configuracion > Perfil"],
      permisos: []
    };
  },
  methods: {
    agregarPermiso(menu) {
          this.permisos.push(menu);
          let index = this.menus.findIndex(x => x == menu);
          this.menus.splice(index, 1);
    },
    quitarPermiso(menu) {
          this.menus.push(menu);
          let index = this.permisos.findIndex(x => x == menu);
          this.permisos.splice(index, 1);
    }
  },
  mounted() {
    
  }
};
</script>
<style></style>
