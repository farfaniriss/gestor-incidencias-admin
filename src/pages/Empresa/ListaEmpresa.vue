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
        <v-toolbar flat color="white">
          <v-toolbar-title>Empresas</v-toolbar-title>
          <v-divider class="mx-2" style="max-height: 0px !important;" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px" persistent>
            <template v-slot:activator="{ on }">
              <v-btn color="info" class="mb-2" v-on="on">Nueva empresa</v-btn>
            </template>
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
                        <v-text-field v-model="editedItem.cPaginaWeb" label="Página web"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field
                          v-model="editedItem.cDNIContacto"
                          label="DNI Contacto"
                          :rules="campoRequerido"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field
                          v-model="editedItem.cNomContacto"
                          label="Nombre Contacto"
                          :rules="campoRequerido"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field
                          v-model="editedItem.cEmailContacto"
                          label="Email Contacto"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field
                          v-model="editedItem.cTelContacto"
                          label="Teléfono Contacto"
                          :rules="campoRequerido"
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
              :headers="headers"
              :items="empresas"
              :search="search"
              :filter="searchData"
              :custom-filter="filterData"
            >
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.cRuc }}</td>
                <td class="text-xs-left">{{ props.item.cRazonSocial }}</td>
                <td class="text-xs-left">{{ props.item.cPaginaWeb }}</td>
                <td class="text-xs-left">{{ props.item.cDNIContacto }}</td>
                <td class="text-xs-left">{{ props.item.cNomContacto }}</td>
                <td class="text-xs-left">{{ props.item.cEmailContacto }}</td>
                <td class="text-xs-left">{{ props.item.cTelContacto }}</td>
                <td class="text-xs-left">{{ props.item.cCelContacto }}</td>
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
    headers: [
      { text: "Ruc", value: "cRuc" },
      { text: "Razon social", value: "cRazonSocial" },
      { text: "Pagina web", value: "cPaginaWeb" },
      { text: "DNI Contacto", value: "cDNIContacto" },
      { text: "Nombre Contacto", value: "cNomContacto" },
      { text: "Email Contacto", value: "cEmailContacto" },
      { text: "Teléfono Contacto", value: "cTelContacto" },
      { text: "Celular Contacto", value: "cCelContacto" },
      { text: "Acciones", value: "cRuc", sortable: false }
    ],
    empresas: [],
    editedIndex: -1,
    indexToDelete: -1,
    editedItem: {
      cRuc: "",
      cRazonSocial: "",
      cPaginaWeb: "",
      cDNIContacto: "",
      cNomContacto: "",
      cEmailContacto: "",
      cTelContacto: "",
      cCelContacto: ""
    },
    defaultItem: {
      cRuc: "",
      cRazonSocial: "",
      cPaginaWeb: "",
      cDNIContacto: "",
      cNomContacto: "",
      cEmailContacto: "",
      cTelContacto: "",
      cCelContacto: ""
    },
    rucRules: [
      v => !!v || "El campo es requerido",
      v => v.length <= 11 || "RUC no debe tener más de 11 caracteres"
    ],
    razonSocialRules: [
      v => !!v || "El campo es requerido",
      v => v.length <= 11 || "Razón social no debe tener más de 11 caracteres"
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

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.empresas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      console.log("deleteItem");
      this.dialogDelete = true;
      this.indexToDelete = this.empresas.indexOf(item);
    },

    confirmDelete() {
      this.empresas.splice(this.indexToDelete, 1);
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
          Object.assign(this.empresas[this.editedIndex], this.editedItem);
        } else {
          this.empresas.push(this.editedItem);
        }
        this.close();
      }
    },

    searchData() {
      return this.empresas.some(
        row =>
          row.cRuc
            .toString()
            .toLowerCase()
            .indexOf(this.search) > -1 ||
          row.cRazonSocial
            .toString()
            .toLowerCase()
            .indexOf(this.search) > -1
      );
    },
    filterData() {
      return this.empresas.filter(
        row =>
          row.cRuc
            .toString()
            .toLowerCase()
            .indexOf(this.search) > -1 ||
          row.cRazonSocial
            .toString()
            .toLowerCase()
            .indexOf(this.search) > -1
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

.v-dialog {
  max-height: 500px !important;
  margin-top: 460px !important;
  background-color: rgba(0, 0, 0, 0.5); /*dim the background*/
}

.v-toolbar {
  z-index: 1 !important;
}

.theme--light.v-messages {
  color: red !important;
}

.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background-color: #76bf5e !important;
}

/* .v-text-field > .v-input__control > .v-input__slot:after {
  border-color: #2196f3 !important;
} */
</style>