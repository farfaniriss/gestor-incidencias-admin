import Vue from "vue";
const vm = new Vue();

const empresaService = {
  getEmpresas() {
    vm.$http
      .get("/api/empresa")
      .then(res => {
        console.log(res.data);
        return res;
      })
      .catch(error => console.log(error));
  }
};

export default empresaService;
