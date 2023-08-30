import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
    const { id, title, image, date } = post;
    return (
        <div className="w-11/12 sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/5 shadow-md">
            <Link to={`/${id}`}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-[25vh] object-cover object-top"
                />
            </Link>
            <div className="py-5 px-4 flex flex-col gap-y-3">
                <Link className="font-extrabold" to={`post/${id}`}>
                    <h3>{title}</h3>
                </Link>
                <p className="text-slate-500 flex items-center gap-x-1">
                    <CalendarDaysIcon className="w-6" />
                    {date}
                </p>
            </div>
        </div>
    );
};

export default PostItem;
