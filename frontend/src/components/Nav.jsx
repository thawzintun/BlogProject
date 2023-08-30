import React from "react";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="flex justify-around items-center py-3 m-auto shadow-sm sticky">
            <Link to={"/"} className="text-3xl font-bold">
                BLOG.io
            </Link>
            <div className="text-xl grid grid-cols-2 items-center text-center">
                <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                        `${isActive ? ` bg-black text-white` : ""} px-3 py-2`
                    }
                >
                    Posts
                </NavLink>
                <NavLink
                    to={"/create"}
                    className={({ isActive }) =>
                        `${isActive ? ` bg-black text-white` : ""} px-3 py-2`
                    }
                >
                    Create Post
                </NavLink>
            </div>
        </nav>
    );
};

export default Nav;
