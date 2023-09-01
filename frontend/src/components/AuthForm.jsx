import React from "react";
import {
    Form,
    Link,
    redirect,
    useActionData,
    useNavigation,
    useSearchParams,
} from "react-router-dom";

const AuthForm = () => {
    const actionData = useActionData();
    const [seachParams] = useSearchParams();
    const isLogin = seachParams.has("login");
    const isSignup = seachParams.has("signup");
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    return (
        <Form
            method="POST"
            className="w-1/3 grid grid-cols-1 mx-auto pt-14 gap-y-5 text-lg"
        >
            <div>
                <h1 className="font-bold text-2xl">
                    {isLogin || !isSignup
                        ? "Login to your account"
                        : "Create a new account"}
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
                {isLogin || !isSignup ? (
                    <p>
                        Don't have an account?
                        <Link to="/auth?signup" className="text-blue-500">
                            &nbsp;Create Account
                        </Link>
                    </p>
                ) : (
                    <p>
                        Already have an account?
                        <Link to="/auth?login" className="text-blue-500">
                            &nbsp;Sign In
                        </Link>
                    </p>
                )}
            </div>
            <div className="grid">
                <button
                    className="bg-black text-white py-2 disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Please Wait..."
                        : isLogin || !isSignup
                        ? "Login"
                        : "Sign up"}
                </button>
            </div>
        </Form>
    );
};

export default AuthForm;

export const action = async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;

    let url = `${process.env.REACT_APP_DOMAIN}/login`;

    const isSignup = searchParams.has("signup");

    if (isSignup) {
        url = `${process.env.REACT_APP_DOMAIN}/signup`;
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
    const expDate = new Date();
    expDate.setHours(expDate.getHours() + 1);
    localStorage.setItem("exp", expDate.toISOString());

    return redirect("/");
};
