<template>
  <div>
    <div :style="headerStyle">
      <div :style="containerStyle">
        <div class="md-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100">
          <md-card class="md-card-login" :class="{ 'md-card-hidden': cardHidden }">
            <md-card-header class="md-card-header-green">
              <h4 class="card-title">JAAMTECH</h4>
            </md-card-header>
            <md-card-content v-if="success">
              <p class="description">{{message}}</p>
            </md-card-content>
            <md-card-content v-else>
              <p class="description">Ingrese su correo electrónico para enviarle su contraseña</p>
              <v-form v-model="valid" ref="form" lazy-validation>
                <md-field class="md-form-group">
                  <md-icon>email</md-icon>
                  <v-text-field
                    v-model="email"
                    label="Correo electrónico"
                    required
                    :rules="campoRequerido"
                  ></v-text-field>
                </md-field>
              </v-form>
              <div v-if="errored" class="v-messages theme--light error--text">
                <div class="v-messages__wrapper">
                  <div class="v-messages__message">{{ errorMessage }}</div>
                </div>
              </div>
            </md-card-content>
            <md-card-actions v-if="!success">
              <md-button
                class="md-simple md-success md-lg"
                @click="cancel"
                :disabled="!valid"
              >Cancelar</md-button>
              <md-button
                class="md-simple md-success md-lg"
                @click="resendPassword"
                :disabled="!valid && isLoading"
              >Enviar email</md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      errored: false,
      success: false,
      errorMessage: null,
      message: null,
      email: null,
      campoRequerido: [v => !!v || "El campo es requerido"],
      cardHidden: true,
      containerStyle: {
        display: "-ms-flexbox",
        display: "-webkit-flex",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate3d(-50%,-50%,0)"
      }
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    }
  },
  beforeMount() {
    setTimeout(this.showCard, 400);
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
        width: "100%",
        position: "fixed"
      };
    }
  },
  methods: {
    showCard: function() {
      this.cardHidden = false;
    },
    resendPassword() {
      this.isLoading = true;
      if (this.$refs.form.validate()) {
        let user = {
          cEmail: this.email
        };
        this.$http
          .post(`/api/sesion/enviarclave`, user)
          .then(res => {
            this.isLoading = false;
            this.success = true;
            this.message =
              "Te hemos enviado un mensaje con tu contraseña a tu correo. Revise en su bandeja de entrada o spam.";
          })
          .catch(error => {
            this.errored = true;
            this.isLoading = false;
            this.errorMessage = error.response.data;
          });
      }
    },
    cancel() {
      this.$router.push("/login");
    }
  }
};
</script>

<style >
.description,
.card-description,
.footer-big p {
  color: darkolivegreen !important;
}
</style>
