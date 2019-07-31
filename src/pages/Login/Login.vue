<template>
  <div>
    <div :style="headerStyle">
      <div :style="containerStyle">
        <div class="md-size-100 md-small-size-100 md-xsmall-size-100 md-medium-size-100">
          <md-card class="md-card-login" :class="{ 'md-card-hidden': cardHidden }">
            <md-card-header class="md-card-header-green">
              <h4 class="card-title">JAAMTECH</h4>
            </md-card-header>
            <md-card-content>
              <p class="description">Login</p>
              <v-form v-model="valid" ref="form" lazy-validation>
                <md-field class="md-form-group">
                  <md-icon>email</md-icon>
                  <v-text-field v-model="email" label="Email" required :rules="campoRequerido"></v-text-field>
                </md-field>
                <md-field class="md-form-group">
                  <md-icon>lock_outline</md-icon>
                  <v-text-field
                    v-model="password"
                    label="Password"
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
            <md-card-actions>
              <md-button
                class="md-simple md-success md-lg"
                @click="login"
                :disabled="!valid"
              >Ingresar</md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import { TokenService } from "../../storage.service";

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
    login() {
      if (this.$refs.form.validate()) {
        let user = {
          cEmail: this.email,
          cContrasenia: this.password
        };
        this.$http
          .post(`/api/sesion/iniciar`, user)
          .then(res => {
            console.log(res.data.cToken);
            TokenService.saveToken(res.data.cToken);
            if (res.data.bCambioClave) {
              //this.$router.push('/')
              // Redirect the user to the page he first tried to visit or to the home view
              this.$router.push(
                this.$router.history.current.query.redirect || "/"
              );
            } else {
              this.$router.push({
                name: "cambioClave",
                params: { email: this.email }
              });
            }
          })
          .catch(error => {
            this.errored = true;
            this.errorMessage = error.response.data;
          });
      }
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
</style>
