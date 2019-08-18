<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <v-dialog v-model="dialogUniOpe" max-width="500px" persistent>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitleUniOpe }}</span>
            </v-card-title>
            <v-card-text>
              <v-form v-model="validUniOpe" ref="formUniOpe" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItemUniOpe.cNomUniOpe"
                        :rules="campoRequerido"
                        label="Nombre"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field v-model="editedItemUniOpe.cDescripcion" label="Descripcion"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                style="background-color: #3198ca !important; color: white !important"
                @click="closeUniOpe"
              >Cancelar</v-btn>
              <v-btn color="success" :disabled="!validUniOpe" @click="saveUniOpe">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogSucursal" max-width="500px" persistent>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitleSucursal }}</span>
            </v-card-title>
            <v-card-text>
              <v-form v-model="validSucursal" ref="formSucursal" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItemSucursal.cNomSurcursal"
                        :rules="campoRequerido"
                        label="Nombre"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field v-model="editedItemSucursal.cDescripcion" label="Descripcion"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                style="background-color: #3198ca !important; color: white !important"
                @click="closeSucursal"
              >Cancelar</v-btn>
              <v-btn color="success" :disabled="!validUniOpe" @click="saveSucursal">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDeleteUniOpe" max-width="290">
          <v-card>
            <v-card-title class="headline">Eliminar</v-card-title>
            <v-card-text>¿Está seguro de eliminar el registro?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="dialogDeleteUniOpe = false">No</v-btn>
              <v-btn color="green darken-1" flat="flat" @click="confirmDeleteUniOpe">Sí</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDeleteSucursal" max-width="290">
          <v-card>
            <v-card-title class="headline">Eliminar</v-card-title>
            <v-card-text>¿Está seguro de eliminar el registro?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="dialogDeleteSucursal = false">No</v-btn>
              <v-btn color="green darken-1" flat="flat" @click="confirmDeleteSucursal">Sí</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-toolbar flat color="white">
          <v-toolbar-title>Unidades Operativas</v-toolbar-title>
          <v-divider class="mx-2" style="max-height: 0px !important;" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="info"
            class="mb-2"
            :disabled="empresa.nIdEmpresa == -1"
            @click.stop="dialogUniOpe = true"
          >Nueva Unidad Operativa</v-btn>
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
              :headers="headersUniOpe"
              no-data-text="''"
              :items="unidadesOperativas"
              item-key="nIdUniOpe"
              :single-expand="singleExpand"
              :rows-per-page-items="rowsPerPageItems"
              rows-per-page-text="Filas por página"
              show-expand
              expand
            >
              <template v-slot:items="props">
                <tr @click="props.expanded = !props.expanded">
                  <td>
                    <div class="datatable-cell-wrapper">{{ props.item.cNomUniOpe }}</div>
                  </td>
                  <td>
                    <div class="datatable-cell-wrapper">{{ props.item.cDescripcion }}</div>
                  </td>
                  <td class="justify-start layout">
                    <v-icon small class="mr-2" @click="editItemUniOpe(props.item)">edit</v-icon>
                    <v-icon small @click.stop="deleteItemUniOpe(props.item)">delete</v-icon>
                  </td>
                </tr>
              </template>
              <template slot="expand" slot-scope="props">
                <v-card>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>Sucursales</v-toolbar-title>
                    <v-divider class="mx-2" style="max-height: 0px !important;" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="info"
                      class="mb-2"
                      @click.stop="nuevaSucursal(props.item.nIdUniOpe)"
                    >Nueva Sucursal</v-btn>
                  </v-toolbar>
                  <v-data-table
                    :headers="headersSucursal"
                    :items="props.item.sucursales"
                    :rows-per-page-items="rowsPerPageItems"
                    no-data-text="''"
                    rows-per-page-text="Filas por página"
                  >
                    <template v-slot:items="props">
                      <td class="text-xs-left">{{ props.item.cNomSurcursal }}</td>
                      <td class="text-xs-left">{{ props.item.cDescripcion }}</td>
                      <td class="justify-start layout">
                        <v-icon small class="mr-2" @click="editItemSucursal(props.item)">edit</v-icon>
                        <v-icon small @click.stop="deleteItemSucursal(props.item)">delete</v-icon>
                      </td>
                    </template>
                  </v-data-table>
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
    validUniOpe: true,
    validSucursal: true,
    erroredUniOpe: false,
    erroredSucursal: false,
    errorMessageUniOpe: null,
    errorMessageSucursal: null,
    dialogUniOpe: false,
    dialogSucursal: false,
    dialogDeleteUniOpe: false,
    dialogDeleteSucursal: false,
    nIdUniOpeSelected: -1,
    search: "",
    rowsPerPageItems: [10, 20, 30, 40],
    headersUniOpe: [
      { text: "Unidad Operativa", value: "cNomUniOpe" },
      { text: "Descripcion", value: "cDescripcion" },
      { text: "Acciones", value: "cNomUniOpe", sortable: false }
    ],
    headersSucursal: [
      { text: "Sucursal", value: "cNomSucursal" },
      { text: "Descripcion", value: "cDescripcion" },
      { text: "Acciones", value: "cNomSucursal", sortable: false }
    ],
    user: null,
    disabledEmpresa: false,
    unidadesOperativas: [],
    empresas: [],
    editedIndexUniOpe: -1,
    editedIndexSucursal: -1,
    itemToDeleteUniOpe: null,
    itemToDeleteSucursal: null,
    editedItemUniOpe: {
      nIdUniOpe: -1,
      cNomUniOpe: "",
      cDescripcion: "",
      nIdEmpresa: -1,
      nIdUsuCre: 1
    },
    defaultItemUniOpe: {
      nIdUniOpe: -1,
      cNomUniOpe: "",
      cDescripcion: "",
      nIdEmpresa: -1,
      nIdUsuCre: 1
    },
    editedItemSucursal: {
      nIdsucursal: -1,
      cNomSurcursal: "",
      cDescripcion: "",
      nIdUniOpe: -1,
      nIdUsuCre: 1
    },
    defaultItemSucursal: {
      nIdsucursal: -1,
      cNomSurcursal: "",
      cDescripcion: "",
      nIdUniOpe: -1,
      nIdUsuCre: 1
    },
    campoRequerido: [v => !!v || "El campo es requerido"],
    empresa: {
      nIdEmpresa: -1,
      cRazonSocial: ""
    }
  }),
  computed: {
    formTitleUniOpe() {
      return this.editedIndexUniOpe === -1
        ? "Nueva unidad operativa"
        : "Editar unidad operativa";
    },
    formTitleSucursal() {
      return this.editedIndexSucursal === -1
        ? "Nueva sucursal"
        : "Editar sucursal";
    }
  },

  // watch: {
  //   dialog(val) {
  //     val || this.close();
  //   }
  // },
  methods: {
    editItemUniOpe(item) {
      this.editedIndexUniOpe = this.unidadesOperativas.indexOf(item);
      this.editedItemUniOpe = Object.assign({}, item);
      this.dialogUniOpe = true;
    },

    editItemSucursal(item) {
      let nodeIndex = this.unidadesOperativas.findIndex(
        x => x.nIdUniOpe == item.nIdUniOpe
      );
      this.editedIndexSucursal = this.unidadesOperativas[
        nodeIndex
      ].sucursales.indexOf(item);
      this.editedItemSucursal = Object.assign({}, item);
      this.dialogSucursal = true;
    },

    deleteItemUniOpe(item) {
      this.dialogDeleteUniOpe = true;
      this.itemToDeleteUniOpe = item;
    },

    deleteItemSucursal(item) {
      this.dialogDeleteSucursal = true;
      this.itemToDeleteSucursal = item;
    },

    confirmDeleteUniOpe() {
      let nIdUniOpe = this.itemToDeleteUniOpe.nIdUniOpe;
      console.log(nIdUniOpe);
      let nIdUsuSesion = 1;
      this.$http
        .delete(`/api/unidadOperativa/${nIdUniOpe}/${nIdUsuSesion}`)
        .then(res => {
          let indexToDelete = this.unidadesOperativas.findIndex(
            x => x.nIdUniOpe == nIdUniOpe
          );
          this.unidadesOperativas.splice(indexToDelete, 1);
        })
        .catch(error => console.log(error.response.data));
      this.dialogDeleteUniOpe = false;
    },

    confirmDeleteSucursal() {
      let nIdSucursal = this.itemToDeleteSucursal.nIdsucursal;
      let nIdUsuSesion = 1;
      let nodeIndex = this.unidadesOperativas.findIndex(
        x => x.nIdUniOpe == this.itemToDeleteSucursal.nIdUniOpe
      );
      this.$http
        .delete(`/api/sucursal/${nIdSucursal}/${nIdUsuSesion}`)
        .then(res => {
          let indexToDelete = this.unidadesOperativas[
            nodeIndex
          ].sucursales.findIndex(x => x.nIdsucursal == nIdSucursal);
          this.unidadesOperativas[nodeIndex].sucursales.splice(
            indexToDelete,
            1
          );
        })
        .catch(error => console.log(error.response.data));
      this.dialogDeleteSucursal = false;
    },

    closeUniOpe() {
      this.dialogUniOpe = false;
      this.editedItemUniOpe = Object.assign({}, this.defaultItemUniOpe);
      this.editedIndexUniOpe = -1;
      this.erroredUniOpe = false;
      this.errorMessageUniOpe = null;
      this.$refs.formUniOpe.reset();
    },

    closeSucursal() {
      this.dialogSucursal = false;
      this.editedItemSucursal = Object.assign({}, this.defaultItemSucursal);
      this.editedIndexSucursal = -1;
      this.erroredSucursal = false;
      this.errorMessageSucursal = null;
      this.$refs.formSucursal.reset();
    },

    saveUniOpe() {
      if (this.$refs.formUniOpe.validate()) {
        console.log(this.editedItemUniOpe);
        this.editedItemUniOpe.nIdEmpresa = this.empresa.nIdEmpresa;
        if (this.editedIndexUniOpe > -1) {
          Object.assign(
            this.unidadesOperativas[this.editedIndexUniOpe],
            this.editedItemUniOpe
          );
          this.$http
            .put(
              `/api/unidadOperativa/${this.editedItemUniOpe.nIdUniOpe}`,
              this.editedItemUniOpe
            )
            .then(res => {
              console.log(res);
              this.closeUniOpe();
            })
            .catch(error => {
              this.erroredUniOpe = true;
              this.errorMessageUniOpe = error.response.data;
            });
        } else {
          this.$http
            .post("/api/unidadOperativa", this.editedItemUniOpe)
            .then(res => {
              console.log(res);
              this.editedItemUniOpe.nIdUniOpe = res.data.nIdUniOpe;
              this.unidadesOperativas.push(this.editedItemUniOpe);
              this.closeUniOpe();
            })
            .catch(error => {
              this.erroredUniOpe = true;
              this.errorMessageUniOpe = error.response.data;
            });
        }
      }
    },

    saveSucursal() {
      if (this.$refs.formSucursal.validate()) {
        if (this.editedIndexSucursal > -1) {
          let nodeIndex = this.unidadesOperativas.findIndex(
            x => x.nIdUniOpe == this.editedItemSucursal.nIdUniOpe
          );
          Object.assign(
            this.unidadesOperativas[nodeIndex].sucursales[
              this.editedIndexSucursal
            ],
            this.editedItemSucursal
          );
          this.$http
            .put(
              `/api/sucursal/${this.editedItemSucursal.nIdsucursal}`,
              this.editedItemSucursal
            )
            .then(res => {
              console.log(res);
              this.closeSucursal();
            })
            .catch(error => {
              console.log(error.response.data);
              this.erroredSucursal = true;
              this.errorMessageSucursal = error.response.data;
            });
        } else {
          this.editedItemSucursal.nIdUniOpe = this.nIdUniOpeSelected;
          let nodeIndex = this.unidadesOperativas.findIndex(
            x => x.nIdUniOpe == this.nIdUniOpeSelected
          );
          this.$http
            .post("/api/sucursal", this.editedItemSucursal)
            .then(res => {
              this.editedItemSucursal.nIdsucursal = res.data.nIdsucursal;
              console.log(this.unidadesOperativas[nodeIndex].sucursales);
              if (this.unidadesOperativas[nodeIndex].sucursales == null) {
                this.unidadesOperativas[nodeIndex].sucursales = [];
              }
              this.unidadesOperativas[nodeIndex].sucursales.push(
                this.editedItemSucursal
              );
              this.closeSucursal();
            })
            .catch(error => {
              console.log(error.response.data);
              this.erroredSucursal = true;
              this.errorMessageSucursal = error.response.data;
            });
        }
      }
    },

    nuevaSucursal(nIdUniOpe) {
      this.nIdUniOpeSelected = nIdUniOpe;
      console.log(nIdUniOpe);
      this.dialogSucursal = true;
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
        .get(`/api/unidadoperativa/sucursal?nIdEmpresa=${emp.nIdEmpresa}`)
        .then(res => {
          this.unidadesOperativas = res.data;
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style>
</style>