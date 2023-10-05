import { lazy } from "react";

const Index = lazy(() => import('../pages/index'))
const Coop = lazy(() => import('../pages/coop'))
const Report = lazy(() => import('../pages/report'))
const Like = lazy(() => import('../pages/Like'))
const Statistic = lazy(() => import('../pages/statistic'))

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
    },
    {
        path: '/like',
        component: Like
    },
    {
        path: '/statistic',
        component: Statistic
    }
]

export default routes;
