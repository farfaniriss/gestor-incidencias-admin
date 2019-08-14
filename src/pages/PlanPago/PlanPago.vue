<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <v-dialog v-model="dialogDelete" max-width="290">
          <v-card>
            <v-card-title class="headline">Eliminar</v-card-title>
            <v-card-text>¿Está seguro de eliminar el registro?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="dialogDelete = false">No</v-btn>
              <v-btn color="green darken-1" flat="flat" @click="confirmDelete">Sí</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <md-card v-if="isLoading">
          <v-dialog v-model="isLoading" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                Por favor, espere...
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </md-card>
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.cNomPlanPago"
                        :rules="campoRequerido"
                        label="Nombre del plan"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.cDescPlanPago"
                        :rules="campoRequerido"
                        label="Descripción del plan"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.nNroMaxUsu"
                        :rules="nNroMaxUsuRules"
                        type="number"
                        class="inputNumber"
                        label="Número máximo de usuarios"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.nPrecio"
                        :rules="precioRules"
                        type="number"
                        class="inputNumber"
                        label="Precio"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
              <div v-if="errored" class="v-messages theme--light error--text">
                <div class="v-messages__wrapper">
                  <div class="v-messages__message">{{ errorMessage }}</div>
                </div>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                style="background-color: #3198ca !important; color: white !important"
                @click="close"
              >Cancel</v-btn>
              <v-btn color="success" :disabled="!valid" @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-toolbar flat color="white">
          <v-toolbar-title>Planes de pago</v-toolbar-title>
          <v-divider class="mx-2" style="max-height: 0px !important;" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="info" class="mb-2" @click.stop="dialog = true">Nuevo plan de pago</v-btn>
        </v-toolbar>
        <div style="position: static !important;">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Buscar por nombre"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              v-if="planesPagos"
              :headers="headers"
              :items="planesPagos"
              :search="search"
              :filter="searchData"
              :custom-filter="filterData"
              :rows-per-page-items="rowsPerPageItems"
              no-data-text="''"
              rows-per-page-text="Filas por página"
            >
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.cNomPlanPago }}</td>
                <td class="text-xs-left">{{ props.item.cDescPlanPago }}</td>
                <td class="text-xs-left">{{ props.item.nNroMaxUsu }}</td>
                <td class="text-xs-left">{{ props.item.nPrecio }}</td>
                <td class="justify-start layout">
                  <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                  <v-icon small @click.stop="deleteItem(props.item)">delete</v-icon>
                </td>
              </template>
              <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning">No se encontraron resultados</v-alert>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase();
};

export default {
  name: "TableSearch",
  data: () => ({
    valid: true,
    errored: false,
    errorMessage: null,
    isLoading: false,
    dialog: false,
    dialogDelete: false,
    search: "",
    rowsPerPageItems: [10, 20, 30, 40],
    headers: [
      { text: "Nombre del plan", value: "cNomPlanPago" },
      { text: "Descripción del plan", value: "cDescPlanPago" },
      { text: "Número máximo de usuarios", value: "nNroMaxUsu" },
      { text: "Precio", value: "nPrecio" },
      { text: "Acciones", value: "nIdPlanPago", sortable: false }
    ],
    planesPagos: [],
    editedIndex: -1,
    itemToDelete: null,
    editedItem: {
      nIdPlanPago: 0,
      cNomPlanPago: "",
      cDescPlanPago: "",
      nNroMaxUsu: 0,
      nPrecio: 0,
      nIdUsuCre: -1
    },
    defaultItem: {
      nIdPlanPago: 0,
      cNomPlanPago: "",
      cDescPlanPago: "",
      nNroMaxUsu: 0,
      nPrecio: 0,
      nIdUsuCre: -1
    },
    precioRules: [
      v => !!v || "El campo es requerido",
      v =>
        /\d+(\.\d{1,2})?/.test(v) ||
        "Campo sólo puede contener números o decimales"
    ],
    nNroMaxUsuRules: [
      v => !!v || "El campo es requerido",
      v => /^\d*$/.test(v) || "Campo sólo puede contener números"
    ],
    campoRequerido: [v => !!v || "El campo es requerido"]
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo plan pago" : "Editar plan pago";
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.planesPagos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },

    confirmDelete() {
      let nIdPlanPago = this.itemToDelete.nIdPlanPago;
      let nIdUsuSesion = 1;
      this.$http
        .delete(`/api/planpago/${nIdPlanPago}/${nIdUsuSesion}`)
        .then(res => {
          let indexToDelete = this.planesPagos.findIndex(
            x => x.nIdPlanPago == nIdPlanPago
          );
          this.planesPagos.splice(indexToDelete, 1);
        })
        .catch(error => console.log(error));
      this.dialogDelete = false;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.errored = false;
        this.errorMessage = null;
        this.$refs.form.reset();
      }, 300);
    },

    save() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        this.isLoading = true;
        this.editedItem.nIdUsuCre = 1;
        if (this.editedIndex > -1) {
          Object.assign(this.planesPagos[this.editedIndex], this.editedItem);
          this.$http
            .put(
              `/api/planpago/${this.editedItem.nIdPlanPago}`,
              this.editedItem
            )
            .then(res => {
              console.log(res);
              this.isLoading = false;
              this.close();
            })
            .catch(error => {
              console.log(error.response.data);
              this.isLoading = false;
              this.dialog = true;
              this.errored = true;
              this.errorMessage = error.response.data;
            });
        } else {
          this.$http
            .post("/api/planpago", this.editedItem)
            .then(res => {
              console.log(res.data);
              this.editedItem.nIdPlanPago = res.data.nIdPlanPago;
              this.planesPagos.push(this.editedItem);
              this.isLoading = false;
              this.close();
            })
            .catch(error => {
              console.log(error.response.data);
              this.isLoading = false;
              this.dialog = true;
              this.errored = true;
              this.errorMessage = error.response.data;
            });
        }
      }
    },

    searchData() {
      return this.planesPagos.some(
        row =>
          row.cNomPlanPago
            .toString()
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1
      );
    },
    filterData() {
      return this.planesPagos.filter(
        row =>
          row.cNomPlanPago
            .toString()
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1
      );
    }
  },
  mounted() {
    this.$http
      .get("/api/planPago")
      .then(res => {
        this.planesPagos = res.data;
      })
      .catch(error => console.log(error));
  }
};
</script>

<style>
</style>