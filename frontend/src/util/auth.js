import { redirect } from "react-router-dom";

export const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

export const loader = () => {
    return getToken();
};

export const checkToken = () => {
    const token = getToken();
    if (!token) {
        return redirect("/auth");
    }
    return null;
};

export const authRouteToken = () => {
    const token = getToken();
    if (token) {
        return redirect("/");
    }
    return null;
};

export const getExpDuration = () => {
    const expDate = localStorage.getItem("exp");
    const expDateInMili = new Date(expDate);
    const currentDateInMilli = new Date();
    const duration = expDateInMili - currentDateInMilli;
    return duration;
};
