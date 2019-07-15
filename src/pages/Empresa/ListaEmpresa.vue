<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
          <div class="md-layout">
          <div class="md-layout-item md-small-size-20 md-size-20">
              <router-link to="/administracion/empresa" class="md-button" :class="`md-theme-blue`">Nuevo</router-link>
          </div>
          </div>
   <v-card>
    <v-card-title>
      Empresas
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="empresas"
      :search="search"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.cRuc }}</td>
        <td class="text-xs-left">{{ props.item.cRazonSocial }}</td>
        <td class="text-xs-left">{{ props.item.cPaginaWeb }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
    </div>
    </div>
  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }

    return items
  }

  export default {
    name: 'TableSearch',
    data: () => ({
      search: '',
      searched: [],
      headers: [
          { text: 'Ruc', value: 'cRuc' },
          { text: 'Razon social', value: 'cRazonSocial' },
          { text: 'Pagina web', value: 'cPaginaWeb' }
        ],
      empresas: []
    }),
    methods: {
      newUser () {
        window.alert('Noop')
      },
      searchOnTable () {
        this.searched = searchByName(this.users, this.search)
      }
    },
    mounted () {
      
    this.$http
      .get("/api/empresa")
      .then(res => {
        console.log(res.data);
        this.empresas = res.data;
      })
      .catch(error => console.log(error));
  
    }
  }
</script>

<style scoped>
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
</style>