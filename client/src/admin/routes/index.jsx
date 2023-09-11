import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Buttons = lazy(() => import("../pages/Buttons"));
const Reports = lazy(() => import("../pages/Report"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const insertReport = lazy(() => import("../pages/insertReport"));
const coop = lazy(() => import("../pages/coop"));
const insertCoop = lazy(() => import("../pages/insertCoop"));
const advisor = lazy(() => import("../pages/advisor"));
const Loan = lazy(() => import("../pages/Loan"));
const Admin = lazy(() => import("../pages/Admin"));
const AdminGuide = lazy(() => import("../pages/Guide"));

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },


  {
    path: "/buttons",
    component: Buttons,
  },
  {
    path: "/Reports",
    component: Reports,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
  {
    path: "/report/insert",
    component: insertReport,
  },
  {
    path: "/coop",
    component: coop,
  },
  {
    path: "/coop/insert",
    component: insertCoop,
  },
  {
    path: "/advisor",
    component: advisor,
  },
  {
    path: "/Loan",
    component: Loan,
  },
  {
    path: "/Admin",
    component: Admin,
  },
  {
    path: "/AdminGuide",
    component: AdminGuide,
  }
];

export default routes;
