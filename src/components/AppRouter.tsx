import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter = () => {
    const isAuth = useTypedSelector(state => state.authReducer.isAuth)

    return (
        isAuth ? <Routes>
            {privateRoutes.map(route =>
                <Route path = {route.path}
                       Component = {route.Component}
                       key = {route.path}
                />)}
        </Routes>
        : <Routes>
                {publicRoutes.map(route =>
                    <Route path = {route.path}
                           Component = {route.Component}
                           key = {route.path}
                    />)}
          </Routes>
    );
};

export default AppRouter;