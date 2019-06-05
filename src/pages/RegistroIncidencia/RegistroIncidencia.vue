<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">Registrar incidencia</h4>
              <p class="category">Complete el formulario con los datos de la incidencia</p>
            </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Titulo</label>
                    <md-input v-model="titulo" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Descripción</label>
                    <md-input v-model="descripcion" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label for="modulo">Módulo</label>
                    <md-select v-model="modulo" name="modulo" id="modulo">
                      <md-option
                        v-for="(item, index) in moduloList"
                        :value="item.id"
                        :key="index"
                      >{{item.name}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label for="prioridad">Prioridad</label>
                    <md-select v-model="prioridad" name="prioridad" id="prioridad">
                      <md-option
                        v-for="(item, index) in prioridadList"
                        :value="item.id"
                        :key="index"
                      >{{item.name}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 text-right">
                  <md-button class="md-raised md-success" @click="publicar">Publicar</md-button>
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
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import incidenciaService from "@/services/incidencia.service";

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      chartId: "no-id",
      titulo: "",
      descripcion: "",
      prioridad: 1,
      prioridadList: [
        { id: 1, name: "Baja" },
        { id: 2, name: "Media" },
        { id: 3, name: "Alta" }
      ],
      moduloList: [
        { id: 1, name: "Modulo 1" },
        { id: 2, name: "Modulo 2" },
        { id: 3, name: "Modulo 3" }
      ],
      modulo: "",
      implicadoList: [],
      username: "",
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" },
        dictDefaultMessage:
          "<i class='fa fa-cloud-upload'></i>Para adjuntar un archivo, arrastre y suelte o busque un archivo con el explorador"
      }
    };
  },
  methods: {
    initChart() {
      console.log("hey");
    },
    async publicar() {
      const incidencia = {
        titulo: this.titulo,
        descripcion: this.descripcion
      };
      await incidenciaService.addIncidencia(incidencia);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
</style>
