import React from "react";
import {
    Form,
    Link,
    redirect,
    useActionData,
    useSearchParams,
} from "react-router-dom";

const AuthForm = () => {
    const actionData = useActionData();
    const [seachParams] = useSearchParams();
    const isLogin = seachParams.has("login");
    return (
        <Form
            method="POST"
            className="w-1/3 grid grid-cols-1 mx-auto pt-14 gap-y-5 text-lg"
        >
            <div>
                <h1 className="font-bold text-2xl">
                    {isLogin ? "Login to your account" : "Create a new account"}
                    {actionData && actionData.message && (
                        <p className="text-sm text-red-500">
                            {actionData.message &&
                                Object.values(actionData.message)}
                        </p>
                    )}
                </h1>
            </div>
            <div className="grid gap-y-1">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    className="outline outline-1 focus:outline-2 outline-slate-300 rounded-sm p-1"
                    autoFocus
                />
                {actionData && actionData.errors && (
                    <p className="text-sm text-red-500">
                        {actionData.errors.email &&
                            Object.values(actionData.errors.email)}
                    </p>
                )}
            </div>
            <div className="grid gap-y-1">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="outline outline-1 focus:outline-2 outline-slate-300 rounded-sm p-1"
                />
                {actionData && actionData.errors && (
                    <p className="text-sm text-red-500">
                        {actionData.errors.password &&
                            Object.values(actionData.errors.password)}
                    </p>
                )}
            </div>
            <div className="grid">
                {isLogin ? (
                    <p>
                        Don't have an account?{" "}
                        <Link to="/auth?signup" className="text-blue-500">
                            Create Account
                        </Link>
                    </p>
                ) : (
                    <p>
                        Already has an account?{" "}
                        <Link to="/auth?login" className="text-blue-500">
                            Sign In
                        </Link>
                    </p>
                )}
            </div>
            <div className="grid">
                <button className="bg-black text-white py-2">
                    {isLogin ? "Login" : "Sign up"}
                </button>
            </div>
        </Form>
    );
};

export default AuthForm;

export const action = async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;

    if (!searchParams.has("login") && !searchParams.has("signup")) {
        throw new Error("");
    }

    let url = `http://localhost:8080/login`;

    const isLogin = searchParams.has("login");

    if (!isLogin) {
        url = `http://localhost:8080/signup`;
    }

    const data = await request.formData();

    const authData = {
        email: data.get("email"),
        password: data.get("password"),
    };

    const response = await fetch(url, {
        method: request.method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (!response.ok) {
        throw new Error("");
    }

    const resData = await response.json();
    const token = resData.token;
    localStorage.setItem("token", token);
    return redirect("/");
};
