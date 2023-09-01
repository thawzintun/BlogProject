import { redirect } from "react-router-dom";
import { getToken } from "./auth";

export const loader = () => {
    const token = getToken();
    if (!token) {
        return redirect("/");
    }
    const confirmStatus = window.confirm("Are you sure want to logout?");
    if (confirmStatus) {
        localStorage.removeItem("token");

        return redirect("/");
    }
    return redirect("/");
};
