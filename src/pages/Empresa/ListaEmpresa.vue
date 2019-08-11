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
                        v-model="editedItem.cRuc"
                        :rules="rucRules"
                        type="number"
                        class="inputNumber"
                        label="Ruc"
                        :counter="11"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.cRazonSocial"
                        :counter="300"
                        :rules="razonSocialRules"
                        label="Razón social"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-combobox
                        v-model="planPago"
                        item-text="cNomPlanPago"
                        item-value="nIdPlanPago"
                        :items="planesPagos"
                        label="Plan de pago"
                        return-object
                      ></v-combobox>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field v-model="editedItem.cPaginaWeb" label="Página web"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <div class="title font-weight-light">Datos contacto</div>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.contacto.cDNI"
                        label="DNI"
                        type="number"
                        class="inputNumber"
                        :counter="8"
                        :rules="dniRules"
                        :disabled="editedIndex > -1"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md4>
                      <v-text-field
                        v-model="editedItem.contacto.cNombre"
                        label="Nombre"
                        :rules="campoRequerido"
                        :disabled="editedIndex > -1"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md4>
                      <v-text-field
                        v-model="editedItem.contacto.cApePaterno"
                        label="Ape. Paterno"
                        :rules="campoRequerido"
                        :disabled="editedIndex > -1"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md4>
                      <v-text-field
                        v-model="editedItem.contacto.cApeMaterno"
                        label="Ape. Materno"
                        :rules="campoRequerido"
                        :disabled="editedIndex > -1"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.contacto.cEmail"
                        label="Email"
                        :rules="emailRules"
                        :disabled="editedIndex > -1"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.contacto.cCelular"
                        label="Celular"
                        :rules="campoRequerido"
                        :disabled="editedIndex > -1"
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
          <v-toolbar-title>Empresas</v-toolbar-title>
          <v-divider class="mx-2" style="max-height: 0px !important;" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="info" class="mb-2" @click.stop="dialog = true">Nueva empresa</v-btn>
        </v-toolbar>
        <div style="position: static !important;">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Buscar por RUC / Razón social"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              v-if="empresas"
              :headers="headers"
              :items="empresas"
              :search="search"
              :filter="searchData"
              :custom-filter="filterData"
              :rows-per-page-items="rowsPerPageItems"
              no-data-text="''"
              rows-per-page-text="Filas por página"
            >
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.cRuc }}</td>
                <td class="text-xs-left">{{ props.item.cRazonSocial }}</td>
                <td class="text-xs-left">{{ props.item.cNomPlanPago }}</td>
                <td class="text-xs-left">{{ props.item.contacto.cDNI }}</td>
                <td class="text-xs-left">{{ props.item.contacto.nombreCompleto }}</td>
                <td class="text-xs-left">{{ props.item.contacto.cEmail }}</td>
                <td class="text-xs-left">{{ props.item.contacto.cCelular }}</td>
                <td class="text-xs-left">{{ props.item.cPaginaWeb }}</td>
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
    dialog: false,
    dialogDelete: false,
    search: "",
    rowsPerPageItems: [10, 20, 30, 40],
    headers: [
      { text: "Ruc", value: "cRuc" },
      { text: "Razon social", value: "cRazonSocial" },
      { text: "Plan Pago", value: "cNomPlanPago" },
      { text: "DNI Contacto", value: "contacto.cDNI" },
      { text: "Nombre Contacto", value: "contacto.nombreCompleto" },
      { text: "Email Contacto", value: "contacto.cEmail" },
      { text: "Celular Contacto", value: "contacto.cCelular" },
      { text: "Pagina web", value: "cPaginaWeb" },
      { text: "Acciones", value: "cRuc", sortable: false }
    ],
    empresas: [],
    planesPagos: [],
    editedIndex: -1,
    itemToDelete: null,
    planPago: {
      nIdPlanPago: -1,
      cNomPlanPago: ""
    },
    editedItem: {
      nIdEmpresa: 0,
      cRuc: "",
      cRazonSocial: "",
      cPaginaWeb: "",
      nIdPlanPago: -1,
      contacto: {
        nIdUsuario: 0,
        cDNI: "",
        cNombre: "",
        cApePaterno: "",
        cApeMaterno: "",
        cEmail: "",
        cCelular: "",
        usuSesion: {
          UserId: 1
        }
      }
    },
    defaultItem: {
      nIdEmpresa: 0,
      cRuc: "",
      cRazonSocial: "",
      cPaginaWeb: "",
      nIdPlanPago: -1,
      contacto: {
        nIdUsuario: 0,
        cDNI: "",
        cNombre: "",
        cApePaterno: "",
        cApeMaterno: "",
        cEmail: "",
        cCelular: "",
        usuSesion: {
          nIdUsuario: 1
        }
      }
    },
    rucRules: [
      v => !!v || "El campo es requerido",
      v => v.length == 11 || "RUC debe tener 11 caracteres",
      v => /^\d*$/.test(v) || "RUC sólo puede contener números"
    ],
    dniRules: [
      v => !!v || "El campo es requerido",
      v => v.length == 8 || "DNI debe tener 8 caracteres",
      v => /^\d*$/.test(v) || "DNI sólo puede contener números"
    ],
    razonSocialRules: [
      v => !!v || "El campo es requerido",
      v => v.length <= 300 || "Razón social no debe tener más de 300 caracteres"
    ],
    emailRules: [
      v => !!v || "El campo es requerido",
      v => /.+@.+/.test(v) || "Email no es válido"
    ],
    campoRequerido: [v => !!v || "El campo es requerido"]
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva empresa" : "Editar empresa";
    }
  },

  // watch: {
  //   dialog(val) {
  //     val || this.close();
  //   }
  // },
  methods: {
    editItem(item) {
      this.editedIndex = this.empresas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.planPago = {
        nIdPlanPago: item.nIdPlanPago,
        cNomPlanPago: item.cNomPlanPago
      };
      this.dialog = true;
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },

    confirmDelete() {
      let nIdEmpresa = this.itemToDelete.nIdEmpresa;
      console.log(nIdEmpresa);
      let nIdUsuSesion = 1;
      this.$http
        .delete(`/api/empresa/${nIdEmpresa}/${nIdUsuSesion}`)
        .then(res => {
          console.log(res);
          let indexToDelete = this.empresas.findIndex(
            x => x.nIdEmpresa == nIdEmpresa
          );
          console.log(indexToDelete);
          this.empresas.splice(indexToDelete, 1);
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
        this.editedItem.nIdPlanPago = this.planPago.nIdPlanPago;
        this.editedItem.cNomPlanPago = this.planPago.cNomPlanPago;
        this.editedItem.usuSesion = { nIdUsuario: 1 };
        if (this.editedIndex > -1) {
          Object.assign(this.empresas[this.editedIndex], this.editedItem);
          this.$http
            .put(`/api/empresa/${this.editedItem.nIdEmpresa}`, this.editedItem)
            .then(res => {
              console.log(res);
              this.close();
            })
            .catch(error => {
              console.log(error.response.data);
              this.errored = true;
              this.errorMessage = error.response.data;
            });
        } else {
          this.$http
            .post("/api/empresa", this.editedItem)
            .then(res => {
              this.editedItem.nIdEmpresa = res.data.nIdEmpresa;
              this.editedItem.contacto = res.data.contacto;
              this.empresas.push(this.editedItem);
              this.close();
            })
            .catch(error => {
              console.log(error.response.data);
              this.errored = true;
              this.errorMessage = error.response.data;
            });
        }
      }
    },

    searchData() {
      return this.empresas.some(
        row =>
          row.cRuc
            .toString()
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1 ||
          row.cRazonSocial
            .toString()
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1
      );
    },
    filterData() {
      return this.empresas.filter(
        row =>
          row.cRuc
            .toString()
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1 ||
          row.cRazonSocial
            .toString()
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1
      );
    }
  },
  mounted() {
    this.$http
      .get("/api/empresa")
      .then(res => {
        this.empresas = res.data;
      })
      .catch(error => console.log(error));

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
.md-button {
  background-color: #2196f3 !important;
  color: white !important;
  padding: 6px !important;
  text-align: center;
}

.md-field {
  margin: 0px !important;
  padding-top: 6px !important;
  min-height: 30px !important;
}

.v-toolbar {
  z-index: 1 !important;
}

.v-alert {
  color: #8a6f6f !important;
}
.theme--light.v-messages {
  color: red !important;
}

/*No results alert*/
.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background-color: #76bf5e !important;
}
.v-alert.v-alert {
  border-color: rgba(255, 255, 255, 0.12) !important;
}

.inputNumber input[type="number"] {
  -moz-appearance: textfield;
}
.inputNumber input::-webkit-outer-spin-button,
.inputNumber input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

/* .v-text-field > .v-input__control > .v-input__slot:after {
  border-color: #2196f3 !important;
} */
</style>