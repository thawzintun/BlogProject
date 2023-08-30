import React from "react";
import PostForm from "../components/PostForm";
import { useRouteLoaderData } from "react-router-dom";

const EditPost = () => {
    const oldData = useRouteLoaderData("post-detail");
    return (
        <>
            <PostForm
                formName="Edit Post Here!"
                btnText="Update"
                oldData={oldData.post}
                method="patch"
            />
        </>
    );
};

export default EditPost;
