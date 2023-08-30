import React from "react";
import PostForm from "../components/PostForm";

const CreatePost = () => {
    return (
        <PostForm
            formName="Create your post now."
            btnText="Submit"
            method="post"
        />
    );
};

export default CreatePost;
