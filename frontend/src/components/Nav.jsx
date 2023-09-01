import React from "react";
import {
    Link,
    NavLink,
    useNavigate,
    useRouteLoaderData,
} from "react-router-dom";

const Nav = () => {
    const token = useRouteLoaderData("root");
    const navigate = useNavigate();
    const logoutHandler = () => {
        const confirmStatus = window.confirm("Are you sure want to logout?");

        if (confirmStatus) {
            navigate("/logout");
        }
    };
    return (
        <nav className="flex justify-between px-20 items-center py-3 m-auto shadow-sm sticky">
            <Link to={"/"} className="text-3xl font-bold">
                BLOG.io
            </Link>
            <div className="text-xl items-center text-center">
                <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                        `${isActive ? ` bg-black text-white` : ""} px-3 py-2`
                    }
                >
                    Posts
                </NavLink>

                {token ? (
                    <>
                        <NavLink
                            to={"/create"}
                            className={({ isActive }) =>
                                `${
                                    isActive ? ` bg-black text-white` : ""
                                } px-3 py-2`
                            }
                        >
                            Create Post
                        </NavLink>
                        <button onClick={logoutHandler} className="px-3 py-2">
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink
                        to={"/auth"}
                        className={({ isActive }) =>
                            `${
                                isActive ? ` bg-black text-white` : ""
                            } px-3 py-2`
                        }
                    >
                        Login
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Nav;
