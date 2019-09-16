<template>
  <div>
    <v-toolbar
      height="100px"
      style="display: flex; align-items: center; justify-content: center;"
      flat
      absolute
      color="#474A4F"
    >
      <v-container align-content-center justify-center>
        <img :src="header" width="250" />
      </v-container>
    </v-toolbar>
    <div :style="headerStyle">
      <div :style="containerStyle">
        <div class="md-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100">
          <md-card v-if="isLoading">
            <v-dialog v-model="dialog" hide-overlay persistent width="300">
              <v-card color="primary" dark>
                <v-card-text>
                  Por favor, espere...
                  <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </md-card>
          <md-card v-else class="md-card-login" :class="{ 'md-card-hidden': cardHidden }">
            <md-card-content>
               <h4 class="card-title">Iniciar sesión en su cuenta</h4>
              <!-- <p class="description">Iniciar sesión en su cuenta</p> -->
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
                <md-field class="md-form-group">
                  <md-icon>lock_outline</md-icon>
                  <v-text-field
                    v-model="password"
                    label="Contraseña"
                    required
                    @keyup.enter="login"
                    type="password"
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
            <md-card-actions>
              <md-button
                class="md-simple md-success md-lg"
                @click="olvidoClave"
              >¿Olvidaste tu contraseña?</md-button>
              <v-btn small depressed color="white" @click="login" :disabled="!valid">Ingresar</v-btn>
            </md-card-actions>
          </md-card>
        </div>
      </div>
    </div>
    <v-footer
      absolute
      style="display: flex; align-items: center; justify-content: center;"
      height="100px"
      color="#474A4F"
    >
      <div
        style="color: white; font-weight: 100;"
      >Copyright &copy; {{ new Date().getFullYear() }} — Jammtech. Todos los derechos reservados.</div>
    </v-footer>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import { TokenService } from "../../storage.service";
import { store } from "../../store/store";

export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      valid: true,
      errored: false,
      errorMessage: null,
      isLoading: false,
      dialog: true,
      campoRequerido: [v => !!v || "El campo es requerido"],
      firstname: null,
      email: null,
      password: null,
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
      default: require("@/assets/img/logo_login.png")
    }
  },
  beforeMount() {
    setTimeout(this.showCard, 400);
  },
  computed: {
    headerStyle() {
      return {
        backgroundColor: "#7AC043",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
        width: "100%",
        position: "fixed"
      };
    }
  },
  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 4000);
    }
  },
  methods: {
    showCard: function() {
      this.cardHidden = false;
    },
    login() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        this.dialog = true;
        let user = {
          cEmail: this.email,
          cContrasenia: this.password
        };
        this.$http
          .post(`/api/sesion/iniciar`, user)
          .then(res => {
            TokenService.saveToken(res.data.cToken);
            localStorage.setItem("user", JSON.stringify(res.data));
            console.log(res.data);
            if (res.data.bCambioClave) {
              // Redirect the user to the page he first tried to visit or to the home view
              this.$router.push(
                this.$router.history.current.query.redirect || "/"
              );
              this.isLoading = false;
            } else {
              this.$router.push({
                name: "cambioClave",
                params: { email: this.email }
              });
              this.isLoading = false;
            }
          })
          .catch(error => {
            console.log(error);
            console.log(error.response);
            this.errored = true;
            this.errorMessage = error.response.data;
            this.isLoading = false;
          });
      }
    },
    olvidoClave() {
      this.$router.push("/olvidoClave");
    }
  }
};
</script>

<style >
.md-field label {
  line-height: 1 !important;
}
.md-field > .md-icon {
  margin: 16px 2px !important;
}
.md-field.md-theme-default > .md-icon:after {
  background-color: transparent !important;
}
.md-field:not(.md-disabled):after {
  display: none;
}

.v-btn__content {
  color: white !important;
}
</style>
