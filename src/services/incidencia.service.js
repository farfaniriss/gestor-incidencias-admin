import Vue from "vue";
const vm = new Vue();

const incidenciaService = {
  async addIncidencia(incidencia) {
    console.log(incidencia);
    await vm.$http
      .post("/api/Incidencia", incidencia)
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => console.log(error));
  }
};

export default incidenciaService;
