import React from "react";
import {
    Link,
    redirect,
    useRouteLoaderData,
    useSubmit,
} from "react-router-dom";
import { ArrowLeftIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { getToken } from "../util/auth";

const PostDetails = () => {
    const data = useRouteLoaderData("post-detail");
    const { id, title, date, image, description } = data.post;
    const submit = useSubmit();
    const token = useRouteLoaderData("root");

    const postDeleteHandler = () => {
        const confirmStatus = window.confirm(
            "Are you sure want to delete this post?"
        );
        if (confirmStatus) {
            submit(null, { method: "DELETE" });
            return redirect("/");
        }
    };

    return (
        <section className=" w-3/5 mx-auto flex flex-col justify-center py-5 gap-y-2">
            <div className="flex justify-between items-start py-3">
                <h1 className="text-2xl font-bold">{title}</h1>
                <Link to={"/"} className="">
                    <ArrowLeftIcon className="w-8" />
                </Link>
            </div>
            <p className="text-slate-500 flex gap-x-1 items-center py-2">
                <CalendarDaysIcon className="w-6" />
                {date}
            </p>
            <img src={image} alt={title} />
            <p className=" text-justify py-2 text-slate-600">{description}</p>
            {token && (
                <div className="flex justify-end gap-x-3">
                    <Link
                        to={`/${id}/edit`}
                        className=" px-4 py-2 text-white bg-black"
                    >
                        Edit
                    </Link>
                    <button
                        className=" px-4 py-2 text-white bg-black"
                        onClick={postDeleteHandler}
                    >
                        Delete
                    </button>
                </div>
            )}
        </section>
    );
};

export default PostDetails;

export const loader = async ({ params }) => {
    const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/posts/${params.id}`
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error("");
    } else {
        return data;
    }
};

export const action = async ({ params }) => {
    const token = getToken();
    const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/posts/${params.id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );

    if (!response.ok) {
        throw Error("");
    }
    return redirect("/");
};
