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
              <v-btn color="green darken-1" @click="dialogDelete = false">No</v-btn>
              <v-btn color="green darken-1" @click="confirmDelete">Sí</v-btn>
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
                        v-model="editedItem.cDNI"
                        :rules="dniRules"
                        type="number"
                        class="inputNumber"
                        label="DNI"
                        :counter="8"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md4>
                      <v-text-field
                        v-model="editedItem.cNombre"
                        :rules="campoRequerido"
                        label="Nombres"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md4>
                      <v-text-field
                        v-model="editedItem.cApePaterno"
                        label="Apellido paterno"
                        :rules="campoRequerido"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md4>
                      <v-text-field
                        v-model="editedItem.cApeMaterno"
                        label="Apellido materno"
                        :rules="campoRequerido"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <div class="caption theme--light v-label">Fecha de nacimiento</div>
                      <datepicker
                        :language="es"
                        v-model="editedItem.dFecNacimiento"
                        placeholder="Seleccione fecha"
                        wrapper-class="v-text-field__slot"
                        calendar-button
                        format="dd/MM/yyyy"
                        calendar-button-icon="fa fa-calendar"
                      ></datepicker>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.cEmail"
                        label="Email"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.cCelular"
                        label="Celular"
                        :rules="campoRequerido"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-combobox
                        v-model="empresaEdited"
                        item-text="cRazonSocial"
                        item-value="nIdEmpresa"
                        :items="empresas"
                        label="Empresa"
                        :rules="[v => v.nIdEmpresa != -1 || 'El campo es requerido']"
                        required
                        :disabled="disabledEmpresa"
                        return-object
                      ></v-combobox>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-combobox
                        v-model="unidadOperativaEdited"
                        item-text="cNomUniOpe"
                        item-value="nIdUniOpe"
                        :items="unidadesOperativasEdited"
                        label="Unidad Operativa"
                        :rules="[v => v.nIdUniOpe != -1 || 'El campo es requerido']"
                        required
                        return-object
                      ></v-combobox>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-combobox
                        v-model="sucursalEdited"
                        item-text="cNomSurcursal"
                        item-value="nIdsucursal"
                        :items="sucursalesEdited"
                        label="Sucursal"
                        :rules="[v => v.nIdsucursal != -1 || 'El campo es requerido']"
                        required
                        return-object
                      ></v-combobox>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-combobox
                        v-model="areaEdited"
                        item-text="cNomArea"
                        item-value="nIdArea"
                        :items="areasEdited"
                        label="Área"
                        :rules="[v => v.nIdArea != -1 || 'El campo es requerido']"
                        required
                        return-object
                      ></v-combobox>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-combobox
                        v-model="cargoEdited"
                        item-text="cNomCargo"
                        item-value="nIdCargo"
                        :items="cargosEdited"
                        label="Cargo"
                        :rules="[v => v.nIdCargo != -1 || 'El campo es requerido']"
                        required
                        return-object
                      ></v-combobox>
                    </v-flex>
                    <v-flex>
                      <v-checkbox v-model="editedItem.bActivo" color="green">
                        <template v-slot:label>
                          <div @click.stop>Activo</div>
                        </template>
                      </v-checkbox>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
              <div v-if="errored" class="v-messages theme--light error--text pl-3">
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
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-divider class="mx-2" style="max-height: 0px !important;" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="info" class="mb-2" @click.stop="dialog = true">Nuevo usuario</v-btn>
        </v-toolbar>
        <div style="position: static !important;">
          <v-card>
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap justify-space-between>
                <v-flex xs12 sm3>
                  <v-combobox
                    v-model="empresa"
                    item-text="cRazonSocial"
                    item-value="nIdEmpresa"
                    :items="empresas"
                    label="Empresa"
                    :disabled="disabledEmpresa"
                    return-object
                  ></v-combobox>
                </v-flex>
                <v-flex xs12 sm2>
                  <v-combobox
                    v-model="unidadOperativa"
                    item-text="cNomUniOpe"
                    item-value="nIdUniOpe"
                    :items="unidadesOperativas"
                    label="Unidad Operativa"
                    return-object
                  ></v-combobox>
                </v-flex>
                <v-flex xs12 sm2>
                  <v-combobox
                    v-model="sucursal"
                    item-text="cNomSurcursal"
                    item-value="nIdsucursal"
                    :items="sucursales"
                    label="Sucursal"
                    return-object
                  ></v-combobox>
                </v-flex>
                <v-flex xs12 sm2>
                  <v-combobox
                    v-model="area"
                    item-text="cNomArea"
                    item-value="nIdArea"
                    :items="areas"
                    label="Área"
                    return-object
                  ></v-combobox>
                </v-flex>
                <v-flex xs12 sm2>
                  <v-combobox
                    v-model="cargo"
                    item-text="cNomCargo"
                    item-value="nIdCargo"
                    :items="cargos"
                    label="Cargo"
                    return-object
                  ></v-combobox>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Buscar por DNI / Nombre"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="usuarios"
              :search="search"
              :filter="searchData"
              :custom-filter="filterData"
              :rows-per-page-items="rowsPerPageItems"
              class="elevation-1"
              no-data-text="''"
              rows-per-page-text="Filas por página"
            >
              <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                  <span slot="activator">{{ props.header.text }}</span>
                  <span>{{ props.header.text }}</span>
                </v-tooltip>
              </template>
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.cDNI }}</td>
                <td class="text-xs-left">{{ props.item.cCodUsu }}</td>
                <td class="text-xs-left">{{ props.item.cNomNivel }}</td>
                <td class="text-xs-left">{{ props.item.cNombre }}</td>
                <td class="text-xs-left">{{ props.item.cApePaterno }}</td>
                <td class="text-xs-left">{{ props.item.cApeMaterno }}</td>
                <td class="text-xs-left">{{ props.item.dFecNacimiento | formatDate }}</td>
                <td class="text-xs-left">{{ props.item.cEmail }}</td>
                <td class="text-xs-left">{{ props.item.cCelular }}</td>
                <td class="text-xs-left">{{ props.item.cRazonSocial }}</td>
                <td class="text-xs-left">{{ props.item.cNomUniOpe }}</td>
                <td class="text-xs-left">{{ props.item.cNomSurcursal }}</td>
                <td class="text-xs-left">{{ props.item.cNomArea }}</td>
                <td class="text-xs-left">{{ props.item.cNomCargo }}</td>
                <td class="text-xs-left">{{ props.item.bActivo ? "Activo" : "Inactivo" }}</td>
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
import Datepicker from "vuejs-datepicker";
import { es } from "vuejs-datepicker/dist/locale";

const toLower = text => {
  return text.toString().toLowerCase();
};

export default {
  name: "TableSearch",
  components: {
    Datepicker
  },
  data: () => ({
    es: es,
    errored: false,
    errorMessage: null,
    isLoading: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    valid: true,
    dialog: false,
    dialogDelete: false,
    search: "",
    rowsPerPageItems: [10, 20, 30, 40],
    headers: [
      { text: "DNI", value: "cDNI", width: "1%" },
      { text: "Username", value: "cCodUsu", width: "1%" },
      { text: "Tipo de usuario", value: "cNomNivel", width: "1%" },
      { text: "Nombre", value: "cNombre", width: "1%" },
      { text: "Apellido paterno", value: "cApePaterno", width: "1%" },
      { text: "Apellido materno", value: "cApeMaterno", width: "1%" },
      { text: "Fecha de nacimiento", value: "dFecNacimiento", width: "1%" },
      { text: "Email", value: "cEmail", width: "1%" },
      { text: "Celular", value: "cCelular", width: "1%" },
      {
        text: "Empresa                                      .",
        value: "cRazonSocial",
        width: "1%"
      },
      { text: "Unidad Operativa", value: "cNomUniOpe", width: "1%" },
      { text: "Sucursal", value: "cNomSurcursal", width: "1%" },
      { text: "Area", value: "cNomArea", width: "1%" },
      { text: "Cargo", value: "cNomCargo", width: "1%" },
      { text: "Activo", value: "bActivo", width: "1%" },
      { text: "Acciones", value: "cDNI", sortable: false, width: "1%" }
    ],
    user: null,
    disabledEmpresa: false,
    usuarios: [],
    empresas: [],
    unidadesOperativas: [],
    sucursales: [],
    areas: [],
    cargos: [],
    unidadesOperativasEdited: [],
    sucursalesEdited: [],
    areasEdited: [],
    cargosEdited: [],
    editedIndex: -1,
    itemToDelete: null,
    editedItem: {
      nIdUsuario: 0,
      cDNI: "",
      cNombre: "",
      cApePaterno: "",
      cApeMaterno: "",
      dFecNacimiento: "",
      cEmail: "",
      cCelular: "",
      nIdsucursal: -1,
      nIdUniOpe: -1,
      nIdEmpresa: -1,
      nIdArea: -1,
      nIdCargo: -1,
      cRazonSocial: "",
      cNomUniOpe: "",
      cNomSurcursal: "",
      cNomArea: "",
      cNomCargo: "",
      usuSesion: {
        UserId: 1,
        Username: "jxalxi"
      }
    },
    defaultItem: {
      nIdUsuario: 0,
      cDNI: "",
      cNombre: "",
      cApePaterno: "",
      cApeMaterno: "",
      dFecNacimiento: "",
      cEmail: "",
      cCelular: "",
      nIdsucursal: -1,
      nIdUniOpe: -1,
      nIdEmpresa: -1,
      nIdArea: -1,
      nIdCargo: -1,
      cRazonSocial: "",
      cNomUniOpe: "",
      cNomSurcursal: "",
      cNomArea: "",
      cNomCargo: "",
      usuSesion: {
        UserId: 1,
        Username: "jxalxi"
      }
    },
    empresa: {
      nIdEmpresa: -1,
      cRazonSocial: ""
    },
    unidadOperativa: {
      nIdUniOpe: -1,
      cNomUniOpe: ""
    },
    sucursal: {
      nIdsucursal: -1,
      cNomSurcursal: ""
    },
    area: {
      nIdArea: -1,
      cNomArea: ""
    },
    cargo: {
      nIdCargo: -1,
      cNomCargo: ""
    },
    empresaEdited: {
      nIdEmpresa: -1,
      cRazonSocial: ""
    },
    unidadOperativaEdited: {
      nIdUniOpe: -1,
      cNomUniOpe: ""
    },
    sucursalEdited: {
      nIdsucursal: -1,
      cNomSurcursal: ""
    },
    areaEdited: {
      nIdArea: -1,
      cNomArea: ""
    },
    cargoEdited: {
      nIdCargo: -1,
      cNomCargo: ""
    },
    dniRules: [
      v => !!v || "El campo es requerido",
      v => v.length == 8 || "DNI debe tener 8 caracteres",
      v => /^\d*$/.test(v) || "DNI sólo puede contener números"
    ],
    emailRules: [
      v => !!v || "El campo es requerido",
      v => /.+@.+/.test(v) || "Email no es válido"
    ],
    campoRequerido: [v => !!v || "El campo es requerido"]
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo usuario" : "Editar usuario";
    }
  },
  watch: {
    empresa: function(emp) {
      console.log(emp.nIdEmpresa);
      this.$http
        .get(`/api/unidadOperativa?nIdEmpresa=${emp.nIdEmpresa}`)
        .then(res => {
          this.unidadesOperativas = res.data;
          this.unidadOperativa = {
            nIdUniOpe: -1,
            cNomUniOpe: ""
          };
        })
        .catch(error => console.log(error));

      this.$http
        .get(`/api/area?nIdEmpresa=${emp.nIdEmpresa}`)
        .then(res => {
          this.areas = res.data;
          this.area = {
            nIdArea: -1,
            cNomArea: ""
          };
        })
        .catch(error => console.log(error));
    },
    unidadOperativa: function(uniOpe) {
      this.$http
        .get(`/api/sucursal?nIdUniOpe=${uniOpe.nIdUniOpe}`)
        .then(res => {
          this.sucursales = res.data;
          this.sucursal = {
            nIdsucursal: -1,
            cNomSurcursal: ""
          };
        })
        .catch(error => console.log(error));
    },
    area: function(ar) {
      this.$http
        .get(`/api/cargo?nIdArea=${ar.nIdArea}`)
        .then(res => {
          this.cargos = res.data;
          this.cargo = {
            nIdCargo: -1,
            cNomCargo: ""
          };
        })
        .catch(error => console.log(error));
    },
    empresaEdited: function(emp) {
      console.log(emp.nIdEmpresa);
      this.$http
        .get(`/api/unidadOperativa?nIdEmpresa=${emp.nIdEmpresa}`)
        .then(res => {
          this.unidadesOperativasEdited = res.data;
          this.unidadOperativaEdited = {
            nIdUniOpe: -1,
            cNomUniOpe: ""
          };
        })
        .catch(error => console.log(error));

      this.$http
        .get(`/api/area?nIdEmpresa=${emp.nIdEmpresa}`)
        .then(res => {
          this.areasEdited = res.data;
          this.areaEdited = {
            nIdArea: -1,
            cNomArea: ""
          };
        })
        .catch(error => console.log(error));
    },
    unidadOperativaEdited: function(uniOpe) {
      this.$http
        .get(`/api/sucursal?nIdUniOpe=${uniOpe.nIdUniOpe}`)
        .then(res => {
          this.sucursalesEdited = res.data;
          this.sucursalEdited = {
            nIdsucursal: -1,
            cNomSurcursal: ""
          };
        })
        .catch(error => console.log(error));
    },
    areaEdited: function(ar) {
      this.$http
        .get(`/api/cargo?nIdArea=${ar.nIdArea}`)
        .then(res => {
          this.cargosEdited = res.data;
          this.cargoEdited = {
            nIdCargo: -1,
            cNomCargo: ""
          };
        })
        .catch(error => console.log(error));
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.empresaEdited = {
        nIdEmpresa: this.editedItem.nIdEmpresa,
        cRazonSocial: this.editedItem.cRazonSocial
      };
      this.unidadOperativaEdited = {
        nIdUniOpe: this.editedItem.nIdUniOpe,
        cNomUniOpe: this.editedItem.cNomUniOpe
      };
      (this.sucursalEdited = {
        nIdsucursal: this.editedItem.nIdsucursal,
        cNomSurcursal: this.editedItem.cNomSurcursal
      }),
        (this.areaEdited = {
          nIdArea: this.editedItem.nIdArea,
          cNomArea: this.editedItem.cNomArea
        }),
        (this.cargoEdited = {
          nIdCargo: this.editedItem.nIdCargo,
          cNomCargo: this.editedItem.cNomCargo
        }),
        (this.dialog = true);
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },

    confirmDelete() {
      let nIdUsuario = this.itemToDelete.nIdUsuario;
      let nIdUsuSesion = 1;
      this.$http
        .delete(`/api/usuario/${nIdUsuario}/${nIdUsuSesion}`)
        .then(res => {
          console.log(res);
          let indexToDelete = this.usuarios.findIndex(
            x => x.nIdUsuario == nIdUsuario
          );
          console.log("nIdUsuario", nIdUsuario);
          console.log(this.usuarios);
          console.log(indexToDelete);
          this.usuarios.splice(indexToDelete, 1);
        })
        .catch(error => console.log(error));
      this.dialogDelete = false;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$refs.form.reset();
        this.errorMessage = "";
        this.errored = false;
      }, 300);
    },

    save() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        this.isLoading = true;
        this.editedItem.nIdEmpresa = this.empresaEdited.nIdEmpresa;
        this.editedItem.cRazonSocial = this.empresaEdited.cRazonSocial;
        this.editedItem.nIdsucursal = this.sucursalEdited.nIdsucursal;
        this.editedItem.cNomSurcursal = this.sucursalEdited.cNomSurcursal;
        this.editedItem.nIdUniOpe = this.unidadOperativaEdited.nIdUniOpe;
        this.editedItem.cNomUniOpe = this.unidadOperativaEdited.cNomUniOpe;
        this.editedItem.nIdArea = this.areaEdited.nIdArea;
        this.editedItem.cNomArea = this.areaEdited.cNomArea;
        this.editedItem.nIdCargo = this.cargoEdited.nIdCargo;
        this.editedItem.cNomCargo = this.cargoEdited.cNomCargo;
        this.editedItem.usuSesion = { nIdUsuario: 1 };
        if (this.editedIndex > -1) {
          Object.assign(this.usuarios[this.editedIndex], this.editedItem);
          this.$http
            .put(`/api/usuario/${this.editedItem.nIdUsuario}`, this.editedItem)
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
            .post("/api/usuario", this.editedItem)
            .then(res => {
              console.log(res.data);
              this.editedItem.nIdUsuario = res.data.nIdUsuario;
              this.editedItem.cCodUsu = res.data.cCodUsu;
              this.usuarios.push(this.editedItem);
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
      return this.usuarios.some(
        row =>
          (row.cDNI
            .toString()
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1 ||
            row.cNombre
              .toString()
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) > -1 ||
            row.cApePaterno
              .toString()
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) > -1 ||
            row.cApeMaterno
              .toString()
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) > -1) &&
          row.nIdEmpresa ==
            (this.empresa.nIdEmpresa == -1
              ? row.nIdEmpresa
              : this.empresa.nIdEmpresa) &&
          row.nIdUniOpe ==
            (this.unidadOperativa.nIdUniOpe == -1
              ? row.nIdUniOpe
              : this.unidadOperativa.nIdUniOpe) &&
          row.nIdsucursal ==
            (this.sucursal.nIdsucursal == -1
              ? row.nIdsucursal
              : this.sucursal.nIdsucursal) &&
          row.nIdArea ==
            (this.area.nIdArea == -1 ? row.nIdArea : this.area.nIdArea) &&
          row.nIdCargo ==
            (this.cargo.nIdCargo == -1 ? row.nIdCargo : this.cargo.nIdCargo)
      );
    },
    filterData() {
      return this.usuarios.filter(
        row =>
          (row.cDNI
            .toString()
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1 ||
            row.cNombre
              .toString()
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) > -1 ||
            row.cApePaterno
              .toString()
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) > -1 ||
            row.cApeMaterno
              .toString()
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) > -1) &&
          row.nIdEmpresa ==
            (this.empresa.nIdEmpresa == -1
              ? row.nIdEmpresa
              : this.empresa.nIdEmpresa) &&
          row.nIdUniOpe ==
            (this.unidadOperativa.nIdUniOpe == -1
              ? row.nIdUniOpe
              : this.unidadOperativa.nIdUniOpe) &&
          row.nIdsucursal ==
            (this.sucursal.nIdsucursal == -1
              ? row.nIdsucursal
              : this.sucursal.nIdsucursal) &&
          row.nIdArea ==
            (this.area.nIdArea == -1 ? row.nIdArea : this.area.nIdArea) &&
          row.nIdCargo ==
            (this.cargo.nIdCargo == -1 ? row.nIdCargo : this.cargo.nIdCargo)
      );
    }
  },
  mounted() {
    this.$http
      .get("/api/usuario")
      .then(res => {
        this.usuarios = res.data;
      })
      .catch(error => console.log(error));

    this.$http
      .get("/api/empresa")
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
          this.empresaEdited = {
            nIdEmpresa: this.user.nIdEmpresa,
            cRazonSocial: this.empresas[index].cRazonSocial
          };
          this.disabledEmpresa = true;
        }
      })
      .catch(error => console.log(error));
  }
};
</script>

<style>
.v-menu > .v-menu__content {
  max-width: none;
  top: 0px !important;
  left: 0px !important;
}

.v-list {
  padding: 2px 0 !important;
}

.v-list__tile {
  font-size: 12px !important;
  height: 30px !important;
}

.container {
  padding: 0px 18px 0px 18px !important;
}

.v-menu__content--fixed {
  position: absolute !important;
}

table {
  border-radius: 2px;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  max-width: 100%;
}
</style>
