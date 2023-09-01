import React from "react";
import { useLoaderData } from "react-router-dom";
import PostItem from "../components/PostItem";

const Post = () => {
    const data = useLoaderData();
    const posts = data.posts;
    return (
        <section className="mx-auto flex flex-col justify-center items-center py-5 gap-y-10">
            {posts.length > 0 &&
                posts.map((post) => <PostItem key={post.id} post={post} />)}
        </section>
    );
};

export default Post;

export const loader = async () => {
    const response = await fetch(`${process.env.REACT_APP_DOMAIN}/posts`);
    if (!response.ok) {
        throw new Error("");
    } else {
        const data = await response.json();
        return data;
    }
};
