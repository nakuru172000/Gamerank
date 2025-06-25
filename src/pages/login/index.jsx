import { useState } from "react"
import { useNavigate } from "react-router";
import supabase from "../../supabase/supabase-client";
import {
    FormSchemaLogin,
    getErrors,
    getFieldError,
} from "../../lib/validationForm"

export default function LoginPage() {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = FormSchemaLogin.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
            console.log(errors);
        } else {
            let { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });
            if (error) {
                alert("Login error! Please check your credentials.");
            } else {
                alert("Login successful!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }
        }
    };

    const onBlur = (property) => () => {
        const message = getFieldError(FormSchemaLogin, property, formState[property]);
        setFormErrors((prev) => ({
            ...prev,
            [property]: message
        }));
        setTouchedFields((prev) => ({
            ...prev,
            [property]: true
        }));
    };

    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property];
        }
        return undefined;
    };

    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: valueSelector ? valueSelector(e) : e.target.value
        }));
    };

    return (
        <div className="container mx-auto p-6 max-w-md">
            <h4 className="text-amber-400 text-2xl mb-4 ps-4">Login</h4>
            <form onSubmit={onSubmit} noValidate className="nearblack p-6 rounded-lg shadow-xl shadow-amber-900">
                <div className="mb-4 ">
                    <label htmlFor="email" className="block text-gray-300 mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={setField("email")}
                        onBlur={onBlur("email")}
                        aria-invalid={isInvalid("email")}
                        required
                        className={`w-full px-4 py-2 rounded bg-gray-500 text-white border ${isInvalid("email") ? "border-red-500" : "border-gray-600"} focus:outline-none focus:ring-2 focus:ring-amber-400`}
                    />
                    {formErrors.email && <small className="text-red-400 text-sm">{formErrors.email}</small>}
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-300 mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formState.password}
                        onChange={setField("password")}
                        onBlur={onBlur("password")}
                        aria-invalid={isInvalid("password")}
                        required
                        className={`w-full px-4 py-2 rounded bg-gray-500 text-white border ${isInvalid("password") ? "border-red-500" : "border-gray-600"} focus:outline-none focus:ring-2 focus:ring-amber-400`}
                    />
                    {formErrors.password && <small className="text-red-400 text-sm">{formErrors.password}</small>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 px-4 rounded transition duration-200"
                >
                    Log In
                </button>
            </form>
        </div>
    );
}