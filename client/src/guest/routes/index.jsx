import { lazy } from "react";

const Index = lazy(() => import('../pages/index'))
const Coop = lazy(() => import('../pages/coop'))
const Report = lazy(() => import('../pages/report'))

const routes = [
    {
        path: '/index',
        component: Index
    },
    {
        path: '/coop',
        component: Coop
    },
    {
        path: '/reports',
        component: Report
    }
]

export default routes;
