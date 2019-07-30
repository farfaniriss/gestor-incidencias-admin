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
                        v-model="editedItem.cDNI"
                        :rules="dniRules"
                        type="number"
                        class="inputNumber"
                        label="DNI"
                        :counter="8"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.cNombre"
                        :rules="campoRequerido"
                        label="Nombres"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field v-model="editedItem.cPaginaWeb" label="Página web"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md6>
                      <v-text-field
                        v-model="editedItem.cApePaterno"
                        label="Apellido paterno"
                        :rules="campoRequerido"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md6>
                      <v-text-field
                        v-model="editedItem.cApeMaterno"
                        label="Apellido materno"
                        :rules="campoRequerido"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.dFecNacimiento"
                        label="Fecha nacimiento"
                        :rules="campoRequerido"
                        required
                      ></v-text-field>
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
                        v-model="editedItem.cCelContacto"
                        label="Celular Contacto"
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
                    return-object
                  ></v-combobox>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-combobox
                    v-model="sucursalesEdited"
                    item-text="cNomSurcursal"
                    item-value="nIdsucursal"
                    :items="sucursalesEdited"
                    label="Sucursal"
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
                    return-object
                  ></v-combobox>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
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
              no-data-text="''"
              rows-per-page-text="Filas por página"
            >
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.cDNI }}</td>
                <td class="text-xs-left">{{ props.item.cCodUsu }}</td>
                <td class="text-xs-left">{{ props.item.cNombre }}</td>
                <td class="text-xs-left">{{ props.item.cApePaterno }}</td>
                <td class="text-xs-left">{{ props.item.cApeMaterno }}</td>
                <td class="text-xs-left">{{ props.item.dFecNacimiento }}</td>
                <td class="text-xs-left">{{ props.item.cEmail }}</td>
                <td class="text-xs-left">{{ props.item.cCelular }}</td>
                <td class="text-xs-left">{{ props.item.cRazonSocial }}</td>
                <td class="text-xs-left">{{ props.item.cNomUniOpe }}</td>
                <td class="text-xs-left">{{ props.item.cNomSurcursal }}</td>
                <td class="text-xs-left">{{ props.item.cNomArea }}</td>
                <td class="text-xs-left">{{ props.item.cNomCargo }}</td>
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
    dialog: false,
    dialogDelete: false,
    search: "",
    rowsPerPageItems: [10, 20, 30, 40],
    headers: [
      { text: "DNI", value: "cDNI" },
      { text: "Username", value: "cCodUsu" },
      { text: "Nombre", value: "cNombre" },
      { text: "Apellido paterno", value: "cApePaterno" },
      { text: "Apellido materno", value: "cApeMaterno" },
      { text: "Fecha de nacimiento", value: "dFecNacimiento" },
      { text: "Email", value: "cEmail" },
      { text: "Celular", value: "cCelular" },
      { text: "Empresa", value: "cRazonSocial" },
      { text: "Uni. Operativa", value: "cNomUniOpe" },
      { text: "Sucursal", value: "cNomSurcursal" },
      { text: "Area", value: "cNomArea" },
      { text: "Cargo", value: "cNomCargo" },
      { text: "Acciones", value: "cDNI", sortable: false }
    ],
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
    indexToDelete: -1,
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
      v => v.length <= 8 || "DNI no debe tener más de 8 caracteres",
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
    empresa: function (emp) {
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
    unidadOperativa: function (uniOpe) {
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
    area: function (ar) {
      this.$http
        .get(`/api/cargo?nIdArea=${ar.nIdArea}`)
        .then(res => {
          this.cargos = res.data;
          this.cargo = {
            nIdCargo: -1,
            cNomCargo: ""
          }
        })
        .catch(error => console.log(error));
    },
    empresaEdited: function (emp) {
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
    unidadOperativaEdited: function (uniOpe) {
      this.$http
        .get(`/api/sucursal?nIdUniOpe=${uniOpe.nIdUniOpe}`)
        .then(res => {
          this.sucursalesEdited = res.data;
          this.sucursalesEdited = {
            nIdsucursal: -1,
            cNomSurcursal: ""
          };
        })
        .catch(error => console.log(error));
    },
    areaEdited: function (ar) {
      this.$http
        .get(`/api/cargo?nIdArea=${ar.nIdArea}`)
        .then(res => {
          this.cargosEdited = res.data;
          this.cargoEdited = {
            nIdCargo: -1,
            cNomCargo: ""
          }
        })
        .catch(error => console.log(error));
    },
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
      this.sucursalEdited = {
        nIdsucursal: this.editedItem.nIdsucursal,
        cNomSurcursal: this.editedItem.cNomSurcursal
      },
      this.areaEdited = {
        nIdArea: this.editedItem.nIdArea,
        cNomArea: this.editedItem.cNomArea
      },
      this.cargoEdited = {
        nIdCargo: this.editedItem.nIdCargo,
        cNomCargo: this.editedItem.cNomCargo
      },
      this.dialog = true;
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.indexToDelete = this.usuarios.indexOf(item);
    },

    confirmDelete() {
      this.usuarios.splice(this.indexToDelete, 1);
      let nIdUsuario = this.usuarios[this.indexToDelete].nIdUsuario;
      this.$http
        .delete(`/api/usuario/${nIdUsuario}`)
        .then(res => {
          console.log(res);
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
      }, 300);
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.usuarios[this.editedIndex], this.editedItem);
          this.$http
            .put(`/api/usuario/${this.editedItem.nIdUsuario}`, this.editedItem)
            .then(res => {
              console.log(res);
            })
            .catch(error => console.log(error));
        } else {
          this.$http
            .post("/api/usuario", this.editedItem)
            .then(res => {
              console.log(res.data);
              this.editedItem.nIdUsuario = res.data.nIdUsuario;
              this.empresas.push(this.editedItem);
            })
            .catch(error => console.log(error));
        }
        this.close();
      }
    },

    searchData() {
      return this.usuarios.some(
        row =>
          row.cDNI
            .toString()
            .toLowerCase()
            .indexOf(this.search) > -1 ||
          row.cNombre
            .toString()
            .toLowerCase()
            .indexOf(this.search) > -1 ||
          row.cApePaterno
            .toString()
            .toLowerCase()
            .indexOf(this.search) > -1 ||
          row.cApeMaterno
            .toString()
            .toLowerCase()
            .indexOf(this.search) > -1
      );
    },
    filterData() {
      return this.usuarios.filter(
        row =>
          row.cDNI
            .toString()
            .toLowerCase()
            .indexOf(this.search) > -1 ||
          row.cNombre
            .toString()
            .toLowerCase()
            .indexOf(this.search) > -1 ||
          row.cApePaterno
            .toString()
            .toLowerCase()
            .indexOf(this.search) > -1 ||
          row.cApeMaterno
            .toString()
            .toLowerCase()
            .indexOf(this.search) > -1
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
</style>
