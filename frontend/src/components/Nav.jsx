import React from "react";
import { Link, NavLink, useRouteLoaderData } from "react-router-dom";

const Nav = () => {
    const token = useRouteLoaderData("root");
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
                        <NavLink to={"/logout"} className="px-3 py-2">
                            Logout
                        </NavLink>
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
