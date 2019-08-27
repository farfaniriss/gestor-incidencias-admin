<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <v-dialog v-model="dialogArea" max-width="500px" persistent>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitleArea }}</span>
            </v-card-title>
            <v-card-text>
              <v-form v-model="validArea" ref="formArea" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItemArea.cNomArea"
                        :rules="campoRequerido"
                        label="Nombre"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                style="background-color: #3198ca !important; color: white !important"
                @click="closeArea"
              >Cancelar</v-btn>
              <v-btn color="success" :disabled="!validArea" @click="saveArea">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogCargo" max-width="500px" persistent>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitleCargo }}</span>
            </v-card-title>
            <v-card-text>
              <v-form v-model="validCargo" ref="formCargo" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItemCargo.cNomCargo"
                        :rules="campoRequerido"
                        label="Nombre"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                style="background-color: #3198ca !important; color: white !important"
                @click="closeCargo"
              >Cancelar</v-btn>
              <v-btn color="success" :disabled="!validArea" @click="saveCargo">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDeleteArea" max-width="290">
          <v-card>
            <v-card-title class="headline">Eliminar</v-card-title>
            <v-card-text>¿Está seguro de eliminar el registro?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" @click="dialogDeleteArea = false">No</v-btn>
              <v-btn color="success" @click="confirmDeleteArea">Sí</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDeleteCargo" max-width="290">
          <v-card>
            <v-card-title class="headline">Eliminar</v-card-title>
            <v-card-text>¿Está seguro de eliminar el registro?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" @click="dialogDeleteCargo = false">No</v-btn>
              <v-btn color="success" @click="confirmDeleteCargo">Sí</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-toolbar flat color="white">
          <v-toolbar-title>Areas</v-toolbar-title>
          <v-divider class="mx-2" style="max-height: 0px !important;" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="info"
            class="mb-2"
            :disabled="empresa.nIdEmpresa == -1"
            @click.stop="dialogArea = true"
          >Nueva area</v-btn>
        </v-toolbar>
        <div style="position: static !important;">
          <v-card>
            <v-card-title>
              <v-combobox
                v-model="empresa"
                item-text="cRazonSocial"
                item-value="nIdEmpresa"
                :items="empresas"
                label="Empresa"
                :disabled="disabledEmpresa"
                return-object
              ></v-combobox>
            </v-card-title>
            <v-data-table
              :headers="headersArea"
              no-data-text="''"
              :items="areas"
              item-key="nIdArea"
              :single-expand="singleExpand"
              :rows-per-page-items="rowsPerPageItems"
              rows-per-page-text="Filas por página"
              show-expand
            >
              <template v-slot:items="props">
                <tr :active="props.expanded" @click="props.expanded = !props.expanded">
                  <td>
                    <div class="datatable-cell-wrapper">{{ props.item.cNomArea }}</div>
                  </td>
                  <td class="text-xs-right">
                    <v-icon small class="mr-2" @click="editItemArea(props.item)">edit</v-icon>
                    <v-icon small @click.stop="deleteItemArea(props.item)">delete</v-icon>
                  </td>
                </tr>
              </template>
              <template slot="expand" slot-scope="props">
                <v-card
                  flat
                  elevation="2"
                  color="#D1D1D1"
                  style="background-color: #e8e8e8!important;"
                >
                  <v-toolbar flat color="white">
                    <v-toolbar-title>Cargos</v-toolbar-title>
                    <v-divider class="mx-2" style="max-height: 0px !important;" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="info"
                      class="mb-2"
                      @click.stop="nuevaCargo(props.item.nIdArea)"
                    >Nuevo Cargo</v-btn>
                  </v-toolbar>
                  <div :key="cargoKey">
                    <v-data-table
                      :headers="headersCargo"
                      :items="props.item.cargos"
                      :rows-per-page-items="rowsPerPageItems"
                      no-data-text="''"
                      item-key="nIdCargo"
                      rows-per-page-text="Filas por página"
                    >
                      <template v-slot:items="props">
                        <td class="text-xs-left">{{ props.item.cNomCargo }}</td>
                        <td class="text-xs-right">
                          <v-icon small class="mr-2" @click="editItemCargo(props.item)">edit</v-icon>
                          <v-icon small @click.stop="deleteItemCargo(props.item)">delete</v-icon>
                        </td>
                      </template>
                    </v-data-table>
                  </div>
                </v-card>
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
    expanded: null,
    singleExpand: true,
    validArea: true,
    validCargo: true,
    erroredArea: false,
    erroredCargo: false,
    errorMessageArea: null,
    errorMessageCargo: null,
    dialogArea: false,
    dialogCargo: false,
    dialogDeleteArea: false,
    dialogDeleteCargo: false,
    nIdAreaSelected: -1,
    search: "",
    rowsPerPageItems: [10, 20, 30, 40],
    headersArea: [
      { text: "Area", value: "cNomArea" },
      { text: "Acciones", value: "cNomArea", sortable: false, align: "right" }
    ],
    headersCargo: [
      { text: "Cargo", value: "cNomCargo" },
      { text: "Acciones", value: "cNomCargo", sortable: false, align: "right" }
    ],
    user: null,
    disabledEmpresa: false,
    areas: [],
    empresas: [],
    editedIndexArea: -1,
    editedIndexCargo: -1,
    itemToDeleteArea: null,
    itemToDeleteCargo: null,
    cargoKey: 1,
    editedItemArea: {
      nIdArea: -1,
      cNomArea: "",
      nIdEmpresa: -1,
      nIdUsuCre: 1
    },
    defaultItemArea: {
      nIdArea: -1,
      cNomArea: "",
      nIdEmpresa: -1,
      nIdUsuCre: 1
    },
    editedItemCargo: {
      nIdCargo: -1,
      cNomCargo: "",
      nIdArea: -1,
      nIdUsuCre: 1
    },
    defaultItemCargo: {
      nIdCargo: -1,
      cNomCargo: "",
      nIdArea: -1,
      nIdUsuCre: 1
    },
    campoRequerido: [v => !!v || "El campo es requerido"],
    empresa: {
      nIdEmpresa: -1,
      cRazonSocial: ""
    }
  }),
  computed: {
    formTitleArea() {
      return this.editedIndexArea === -1 ? "Nueva area" : "Editar area";
    },
    formTitleCargo() {
      return this.editedIndexCargo === -1 ? "Nueva cargo" : "Editar cargo";
    }
  },

  // watch: {
  //   dialog(val) {
  //     val || this.close();
  //   }
  // },
  methods: {
    editItemArea(item) {
      this.editedIndexArea = this.areas.indexOf(item);
      this.editedItemArea = Object.assign({}, item);
      this.dialogArea = true;
    },

    editItemCargo(item) {
      let nodeIndex = this.areas.findIndex(x => x.nIdArea == item.nIdArea);
      this.editedIndexCargo = this.areas[nodeIndex].cargos.indexOf(item);
      this.editedItemCargo = Object.assign({}, item);
      this.dialogCargo = true;
    },

    deleteItemArea(item) {
      this.dialogDeleteArea = true;
      this.itemToDeleteArea = item;
    },

    deleteItemCargo(item) {
      this.dialogDeleteCargo = true;
      this.itemToDeleteCargo = item;
    },

    confirmDeleteArea() {
      let nIdArea = this.itemToDeleteArea.nIdArea;
      console.log(nIdArea);
      let nIdUsuSesion = 1;
      this.$http
        .delete(`/api/area/${nIdArea}/${nIdUsuSesion}`)
        .then(res => {
          let indexToDelete = this.areas.findIndex(x => x.nIdArea == nIdArea);
          this.areas.splice(indexToDelete, 1);
        })
        .catch(error => console.log(error.response.data));
      this.dialogDeleteArea = false;
    },

    confirmDeleteCargo() {
      let nIdCargo = this.itemToDeleteCargo.nIdCargo;
      let nIdUsuSesion = 1;
      let nodeIndex = this.areas.findIndex(
        x => x.nIdArea == this.itemToDeleteCargo.nIdArea
      );
      this.$http
        .delete(`/api/cargo/${nIdCargo}/${nIdUsuSesion}`)
        .then(res => {
          let indexToDelete = this.areas[nodeIndex].cargos.findIndex(
            x => x.nIdCargo == nIdCargo
          );
          this.areas[nodeIndex].cargos.splice(indexToDelete, 1);
        })
        .catch(error => console.log(error.response.data));
      this.dialogDeleteCargo = false;
    },

    closeArea() {
      this.dialogArea = false;
      this.editedItemArea = Object.assign({}, this.defaultItemArea);
      this.editedIndexArea = -1;
      this.erroredArea = false;
      this.errorMessageArea = null;
      this.$refs.formArea.reset();
    },

    closeCargo() {
      this.dialogCargo = false;
      this.editedItemCargo = Object.assign({}, this.defaultItemCargo);
      this.editedIndexCargo = -1;
      this.erroredCargo = false;
      this.errorMessageCargo = null;
      this.$refs.formCargo.reset();
    },

    saveArea() {
      if (this.$refs.formArea.validate()) {
        console.log(this.editedItemArea);
        this.editedItemArea.nIdEmpresa = this.empresa.nIdEmpresa;
        if (this.editedIndexArea > -1) {
          Object.assign(this.areas[this.editedIndexArea], this.editedItemArea);
          this.$http
            .put(
              `/api/area/${this.editedItemArea.nIdArea}`,
              this.editedItemArea
            )
            .then(res => {
              console.log(res);
              this.closeArea();
            })
            .catch(error => {
              this.erroredArea = true;
              this.errorMessageArea = error.response.data;
            });
        } else {
          this.$http
            .post("/api/area", this.editedItemArea)
            .then(res => {
              console.log(res);
              this.editedItemArea.nIdArea = res.data.nIdArea;
              this.areas.push(this.editedItemArea);
              this.closeArea();
            })
            .catch(error => {
              this.erroredArea = true;
              this.errorMessageArea = error.response.data;
            });
        }
      }
    },

    saveCargo() {
      if (this.$refs.formCargo.validate()) {
        if (this.editedIndexCargo > -1) {
          let nodeIndex = this.areas.findIndex(
            x => x.nIdArea == this.editedItemCargo.nIdArea
          );
          Object.assign(
            this.areas[nodeIndex].cargos[this.editedIndexCargo],
            this.editedItemCargo
          );
          this.$http
            .put(
              `/api/cargo/${this.editedItemCargo.nIdCargo}`,
              this.editedItemCargo
            )
            .then(res => {
              console.log(res);
              this.closeCargo();
            })
            .catch(error => {
              console.log(error.response.data);
              this.erroredCargo = true;
              this.errorMessageCargo = error.response.data;
            });
        } else {
          this.editedItemCargo.nIdArea = this.nIdAreaSelected;
          let nodeIndex = this.areas.findIndex(
            x => x.nIdArea == this.nIdAreaSelected
          );
          this.$http
            .post("/api/cargo", this.editedItemCargo)
            .then(res => {
              this.editedItemCargo.nIdCargo = res.data.nIdCargo;
              if (
                this.areas[nodeIndex].cargos == null ||
                this.areas[nodeIndex].cargos == undefined
              ) {
                this.areas[nodeIndex].cargos = [];
              }
              this.areas[nodeIndex].cargos.push(this.editedItemCargo);
              this.cargoKey++;
              this.closeCargo();
            })
            .catch(error => {
              console.log(error.response.data);
              this.erroredCargo = true;
              this.errorMessageCargo = error.response.data;
            });
        }
      }
    },

    nuevaCargo(nIdArea) {
      this.nIdAreaSelected = nIdArea;
      console.log(nIdArea);
      this.dialogCargo = true;
    }
  },
  mounted() {
    this.$http
      .get("/api/empresa/empresas")
      .then(res => {
        this.empresas = res.data;
        var retrievedObject = localStorage.getItem("user");
        this.user = JSON.parse(retrievedObject);
        if (this.user.nIdNivel > 1) {
          let index = this.empresas.findIndex(
            x => x.nIdEmpresa == this.user.nIdEmpresa
          );
          this.empresa = {
            nIdEmpresa: this.user.nIdEmpresa,
            cRazonSocial: this.empresas[index].cRazonSocial
          };
          this.disabledEmpresa = true;
        }
      })
      .catch(error => console.log(error));
  },
  watch: {
    empresa: function(emp) {
      console.log(emp.nIdEmpresa);
      this.$http
        .get(`/api/area/cargo?nIdEmpresa=${emp.nIdEmpresa}`)
        .then(res => {
          this.areas = res.data;
          console.log(this.areas);
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style>
.theme--light.v-table tbody tr[active] {
  background: #b0e3aa !important;
}

.white {
  background-color: #e8e8e8 !important;
}
</style>