import React from "react";
import { Form, Link, useActionData, useSearchParams } from "react-router-dom";

const AuthForm = () => {
    const actionData = useActionData();
    const [seachParams] = useSearchParams();
    const isLogin = seachParams.has("login");
    console.log(isLogin);
    return (
        <Form
            method="POST"
            className="w-1/3 grid grid-cols-1 mx-auto pt-14 gap-y-5 text-lg"
        >
            <div>
                <h1 className="font-bold text-2xl">
                    {isLogin ? "Login to your account" : "Create a new account"}
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
