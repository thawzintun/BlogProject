import { redirect } from "react-router-dom";

export const getExpDuration = () => {
    const expDate = localStorage.getItem("exp");
    const expDateInMili = new Date(expDate);
    const currentDateInMilli = new Date();
    const duration = expDateInMili - currentDateInMilli;
    return duration;
};

export const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    const duration = getExpDuration();
    if (duration < 0) {
        return "TOKEN EXPIRED";
    }
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
