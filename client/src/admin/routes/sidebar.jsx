/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/admin/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/admin/Reports",
    icon: "TablesIcon",
    name: "Report",
  },
  {
    path: "/admin/coop",
    icon: "CardsIcon",
    name: "Cooperative"
  },
  {
    path: "/admin/advisor",
    icon: "PeopleIcon",
    name: "Advisor"
  },
  {
    path: "/admin/Loan",
    icon: "FormsIcon",
    name: "Loan-Return management"
  },
  {
    path: "/admin/Admin",
    icon: "MailIcon",
    name: "Admin management"
  },
  {
    icon: "PagesIcon",
    name: "Admin Guide",
    path: "/admin/AdminGuide",
  },
];

export default routes;
