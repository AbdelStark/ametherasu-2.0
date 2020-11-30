// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import Peers from "@/pages/Peers/Peers";
import Configuration from "@/pages/Configuration/Configuration";
import Teku from "@/pages/Teku/Teku";

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        components: {default: Dashboard}
      },
      {
        path: 'peers',
        name: 'peers',
        components: {default: Peers}
      },
      {
        path: 'configuration',
        name: 'configuration',
        components: {default: Configuration}
      },
      {
        path: 'teku',
        name: 'teku',
        components: {default: Teku}
      },
    ]
  },
  {path: "*", component: NotFound},
];

export default routes;
