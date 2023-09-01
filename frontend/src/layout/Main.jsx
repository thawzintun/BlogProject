import React, { useEffect } from "react";
import Nav from "../components/Nav";

import {
    Outlet,
    useLoaderData,
    useNavigation,
    useSubmit,
} from "react-router-dom";
import { getExpDuration } from "../util/auth";
import Loading from "../components/Loading";

const Main = () => {
    const token = useLoaderData();
    const submit = useSubmit();
    const { state } = useNavigation();

    useEffect(() => {
        if (!token) {
            return;
        }
        if (token === "TOKEN EXPIRED") {
            submit(null, {
                action: "/logout",
                method: "POST",
            });
        }
        const duration = getExpDuration();
        setTimeout(() => {
            submit(null, {
                action: "/logout",
                method: "POST",
            });
        }, [duration]);
    }, [token, submit]);

    return (
        <>
            <Nav />
            {state === "loading" ? <Loading /> : <Outlet />}
        </>
    );
};

export default Main;
