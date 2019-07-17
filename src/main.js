// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import axios from "axios";
import IncidenciaHub from "./incidencia-hub";
//import * as firebase from "firebase/app";
import "firebase/messaging";
import Vuetify from "vuetify";

// Setup axios as the Vue default $http library
axios.defaults.baseURL = "http://jaamtech-api.azurewebsites.net"; // same as the Url the server listens to
Vue.prototype.$http = axios;

// var firebaseConfig = {
//   apiKey: "AIzaSyCI7y3rcVhrogl8fyChRMhJV8vmaHfUbEg",
//   authDomain: "gestor-incidencias1.firebaseapp.com",
//   databaseURL: "https://gestor-incidencias1.firebaseio.com",
//   projectId: "gestor-incidencias1",
//   storageBucket: "gestor-incidencias1.appspot.com",
//   messagingSenderId: "148900812737",
//   appId: "1:148900812737:web:c3150f0cafed85a6"
// }; // 4. Get Firebase Configuration
// firebase.initializeApp(firebaseConfig);

// Vue.prototype.$messaging = firebase.messaging();
// Vue.prototype.$messaging.usePublicVapidKey(
//   "BLqhu0ZadFOjlvwo4IU7uQeV6KbtdBUzJHU4CC8S6WpG5BM85-yAWmXdZPy88big7SHlCG3HYyX51EoSmmMe-84"
// );

// Request Permission of Notifications
// Vue.prototype.$messaging
//   .requestPermission()
//   .then(() => {
//     console.log("Notification permission granted.");
//     // Get Token
//     Vue.prototype.$messaging.getToken().then(token => {
//       console.log(token);
//       Vue.prototype.$messagingToken = token;
//     });
//   })
//   .catch(err => {
//     console.log("Unable to get permission to notify.", err);
//   });

// Vue.prototype.$messaging.onMessage(function(payload) {
//   console.log("Message received. ", payload);
// });

import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css"; //Vuesax styles

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";
import "./registerServiceWorker";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;

Vue.use(IncidenciaHub);
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(Vuesax);
Vue.use(Vuetify, {
  theme: {
    primary: "#3f51b5",
    secondary: "#b0bec5",
    accent: "#8c9eff",
    error: "#b71c1c"
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
});
