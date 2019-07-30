import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import ListaEmpresa from "@/pages/Empresa/ListaEmpresa.vue";
import RegistroPerfil from "@/pages/Perfil/RegistroPerfil.vue";
import ListaUsuario from "@/pages/Usuario/ListaUsuario.vue";
import Login from "@/pages/Login/Login.vue";
import CambioClave from "@/pages/CambioClave/CambioClave.vue";

const routes = [
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
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
    // meta: {
    //   guest: true
    // }
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
];

export default routes;
