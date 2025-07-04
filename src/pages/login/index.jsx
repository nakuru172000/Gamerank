import { useState } from "react"
import { useNavigate } from "react-router";
import {supabase} from "../../supabase/supabase-client";
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
    
    // Validate form
    const { error: validationError, data } = FormSchemaLogin.safeParse(formState);
    if (validationError) {
        setFormErrors(getErrors(validationError));
        return;
    }

    try {
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email: data.email.trim(), 
            password: data.password,
        });

        if (error) {
            console.error('Login error:', error);
            setFormErrors({
                password: error.message || "Invalid email or password"
            });
            return;
        }

        if (user) {
            alert("Login successful!");
            navigate("/");
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        setFormErrors({
            password: "An unexpected error occurred. Please try again."
        });
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
        <div className="container  mx-auto p-6 max-w-md rounded-lg">
            <h4 className="text-amber-400 text-2xl mb-4 ps-4">Login</h4>        
            <form onSubmit={onSubmit} noValidate className="nearblack p-6 rounded-lg shadow-lg button1 shadow-amber-900">
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
                    className=" w-full bg-amber-400 hover:bg-amber-500 text-gray-600 font-bold py-3 px-4 rounded transition duration-200 text-center"
                >
                    Login
                </button>
            </form>
        </div>
    );
}