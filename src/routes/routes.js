import Vue from "vue";
import Router from "vue-router";
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import ListaEmpresa from "@/pages/Empresa/ListaEmpresa.vue";
import RegistroPerfil from "@/pages/Perfil/RegistroPerfil.vue";
import ListaUsuario from "@/pages/Usuario/ListaUsuario.vue";
import Login from "@/pages/Login/Login.vue";
import CambioClave from "@/pages/CambioClave/CambioClave.vue";
import UnidadOperativaSucursal from "@/pages/UnidadOperativaSucursal/UnidadOperativaSucursal.vue";
import AreaCargo from "@/pages/AreaCargo/AreaCargo.vue";
import { TokenService } from "../storage.service";

Vue.use(Router);

const router = new Router({
  mode: "history",
  linkExactActiveClass: "nav-item active",
  routes: [
    {
      path: "/",
      component: DashboardLayout,
      children: [
        {
          path: "inicio",
          name: "Inicio",
          component: Dashboard,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "administracion/usuario",
          name: "Administración > Usuario",
          component: UserProfile,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/administracion/empresas",
          name: "Administracion > Empresas",
          component: ListaEmpresa
          // meta: {
          //   requiresAuth: true,
          //   is_admin: true
          // }
        },
        {
          path: "/administracion/perfil",
          name: "Administracion > Perfiles",
          component: RegistroPerfil
          // meta: {
          //   requiresAuth: true,
          //   is_admin: true
          // }
        },
        {
          path: "/administracion/usuarios",
          name: "Administracion > Usuarios",
          component: ListaUsuario
          // meta: {
          //   requiresAuth: true,
          //   is_admin: true
          // }
        },
        {
          path: "/administracion/unidadoperativa",
          name: "Administracion > Unidades Operativas / Sucursales",
          component: UnidadOperativaSucursal
        },
        {
          path: "/administracion/area",
          name: "Administracion > Areas / Cargos",
          component: AreaCargo
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        public: true, // Allow access to even if not logged in
        onlyWhenLoggedOut: true
      }
    },
    {
      path: "/cambioClave",
      name: "cambioClave",
      component: CambioClave,
      props: true
      // meta: {
      //   guest: true
      // }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    record => record.meta.onlyWhenLoggedOut
  );
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath } // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next("/");
  }

  next();
});

export default router;
