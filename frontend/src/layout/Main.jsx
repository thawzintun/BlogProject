import React from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    );
};

export default Main;
