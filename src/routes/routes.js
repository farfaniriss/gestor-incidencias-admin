import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import RegistroIncidencia from "@/pages/RegistroIncidencia/RegistroIncidencia.vue";
import HistorialIncidencia from "@/pages/HistorialIncidencia/HistorialIncidencia.vue";
import SeguimientoIncidencia from "@/pages/SeguimientoIncidencia/SeguimientoIncidencia.vue";
import RegistroEmpresa from "@/pages/Empresa/RegistroEmpresa.vue";
import ListaEmpresa from "@/pages/Empresa/ListaEmpresa.vue";
import RegistroPerfil from "@/pages/Perfil/RegistroPerfil.vue";
import ListaUsuario from "@/pages/Usuario/ListaUsuario.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/inicio",
    children: [
      {
        path: "inicio",
        name: "Inicio",
        component: Dashboard
      },
      {
        path: "administracion/usuario",
        name: "Administración > Usuario",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO
      },
      {
        path: "configuracion/tablas",
        name: "Configuración > Tablas",
        component: RegistroIncidencia
      },
      {
        path: "registro",
        name: "Registro de incidencia",
        component: RegistroIncidencia
      },
      {
        path: "historial",
        name: "Historial de incidencia",
        component: HistorialIncidencia
      },
      {
        path: "/incidencia/:id",
        name: "Seguimiento de incidencia",
        component: SeguimientoIncidencia
      },
      {
        path: "/administracion/empresa",
        name: "Administracion > Registro de empresa",
        component: RegistroEmpresa
      },
      {
        path: "/administracion/empresas",
        name: "Administracion > Empresas",
        component: ListaEmpresa
      },
      {
        path: "/administracion/perfil",
        name: "Administracion > Perfil",
        component: RegistroPerfil
      },
      {
        path: "/administracion/usuarios",
        name: "Administracion > Usuarios",
        component: ListaUsuario
      }
    ]
  }
];

export default routes;
