import React from "react";
import Login from "../pages/Login";
import Event from "../pages/Event";


export interface IRoute{
    path: string;
    Component: React.ComponentType;
}

export const enum Routes{
    LOGIN = '/login',
    EVENT = '/'
}

export const publicRoutes : IRoute[] = [
    {path: Routes.LOGIN, Component: Login},
    {path: '/*', Component: Login}
]

export const privateRoutes : IRoute[] = [
    {path: Routes.EVENT, Component: Event},
    {path: '/*', Component: Event}
]


