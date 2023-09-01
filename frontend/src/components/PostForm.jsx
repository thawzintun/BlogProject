import React from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import uuid from "react-uuid";
import { getToken } from "../util/auth";

const PostForm = ({ formName, btnText, oldData, method }) => {
    const actionData = useActionData();
    const { state } = useNavigation();
    return (
        <Form
            method={method}
            className="w-1/3 grid grid-cols-1 mx-auto pt-14 gap-y-5 text-lg"
        >
            <div>
                <h1 className="font-bold text-2xl">{formName}</h1>
            </div>
            <div className="grid gap-y-1">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    className="outline outline-1 focus:outline-2 outline-slate-300 rounded-sm p-1"
                    autoFocus
                    defaultValue={oldData ? oldData.title : ""}
                />
                {actionData && actionData.errors && (
                    <p className="text-sm text-red-500">
                        {actionData.errors.title &&
                            Object.values(actionData.errors.title)}
                    </p>
                )}
            </div>
            <div className="grid gap-y-1">
                <label htmlFor="image">Image</label>
                <input
                    type="url"
                    name="image"
                    id="image"
                    className="outline outline-1 focus:outline-2 outline-slate-300 rounded-sm p-1"
                    defaultValue={oldData ? oldData.image : ""}
                />
                {actionData && actionData.errors && (
                    <p className="text-sm text-red-500">
                        {actionData.errors.image &&
                            Object.values(actionData.errors.image)}
                    </p>
                )}
            </div>
            <div className="grid gap-y-1">
                <label htmlFor="date">Choose Date</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    className="outline outline-1 focus:outline-2 outline-slate-300 rounded-sm p-1"
                    defaultValue={oldData ? oldData.date : ""}
                />
                {actionData && actionData.errors && (
                    <p className="text-sm text-red-500">
                        {actionData.errors.date &&
                            Object.values(actionData.errors.date)}
                    </p>
                )}
            </div>
            <div className="grid gap-y-1">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="7"
                    className="outline outline-1 focus:outline-2 outline-slate-300 rounded-sm p-1"
                    defaultValue={oldData ? oldData.description : ""}
                ></textarea>
                {actionData && actionData.errors && (
                    <p className="text-sm text-red-500">
                        {actionData.errors.description &&
                            Object.values(actionData.errors.description)}
                    </p>
                )}
            </div>
            <div className="grid grid-cols-2">
                <button
                    className="bg-black text-white col-start-2 py-2 disabled:opacity-50"
                    disabled={state === "submitting"}
                >
                    {state === "submitting" ? "Please Wait..." : btnText}
                </button>
            </div>
        </Form>
    );
};

export default PostForm;

export const action = async ({ request, params }) => {
    const data = await request.formData();

    let url = `${process.env.REACT_APP_DOMAIN}/posts`;

    const token = getToken();

    const postData = {
        id: request.method === "POST" ? uuid() : params.id,
        title: data.get("title"),
        date: data.get("date"),
        image: data.get("image"),
        description: data.get("description"),
    };

    if (request.method === "PATCH") {
        url = `${process.env.REACT_APP_DOMAIN}/posts/${params.id}`;
    }
    const response = await fetch(url, {
        method: request.method,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(postData),
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw new Error("");
    }

    return request.method === "PATCH"
        ? redirect(`/${params.id}`)
        : redirect("/");
};
