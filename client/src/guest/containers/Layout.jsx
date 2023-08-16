import React, { useContext, Suspense, useEffect, lazy } from 'react'
import routes from '../routes'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Main from "./main";
import ThemedSuspense from '../../admin/components/ThemedSuspense';

function Layout() {
    return (
        <>
            <div className="flex flex-col flex-1 w-full">
                <Navbar />
                <Main>
                    <Suspense fallback={<ThemedSuspense />}>
                        <Switch>
                            {routes.map((route, i) => {
                                return route.component ? (
                                    <Route
                                        key={i}
                                        exact={true}
                                        path={`${route.path}`}
                                        render={(props) => <route.component {...props} />}
                                    />
                                ) : null
                            })}
                            <Redirect exact from="/" to="/index" />
                        </Switch>
                    </Suspense>
                </Main>
                <Footer />
            </div>
        </>
    );
}

export default Layout
