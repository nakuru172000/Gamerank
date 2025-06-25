import { useState } from "react"
import { useNavigate } from "react-router";
import supabase from "../../supabase/supabase-client";
import {
    ConfirmSchema,
    getErrors,
    getFieldError,
} from "../../lib/validationForm"

export default function RegisterPage() {
    const navigate=useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        fistname: "",
        lastName: "",
        userName: "",
        password: "",
    });
const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      let { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username
          }
        }
      });
      if (error) {
        alert("Signing up error 👎🏻!");
      } else {
        alert("Signed up 👍🏻!");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
      }
    }
  };

    const onBlur = (property) => () => {
        const message = getFieldError(property, formState[property]);
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
        return false;
    };

    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: valueSelector ? valueSelector(e) : e.target.value
        }));
    };
    return (
        <div className="container mx-auto p-6 max-w-md">
            <h4 className="text-amber-400 text-2xl mb-4 ps-4">Register</h4>
            <form onSubmit={onSubmit} noValidate className="nearblack p-6 rounded-lg  shadow-xl shadow-amber-900">
                <div className="mb-4 ">
                    <label htmlFor="email" className="block text-gray-300 mb-2 ">Email:</label>
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

                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-300 mb-2">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formState.firstName}
                        onChange={setField("firstName")}
                        onBlur={onBlur("firstName")}
                        aria-invalid={isInvalid("firstName")}
                        required
                        className={`w-full px-4 py-2 rounded bg-gray-500 text-white border ${isInvalid("firstName") ? "border-red-500" : "border-gray-600"} focus:outline-none focus:ring-2 focus:ring-amber-400`}
                    />
                    {formErrors.firstName && <small className="text-red-400 text-sm">{formErrors.firstName}</small>}
                </div>

                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-300 mb-2">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formState.lastName}
                        onChange={setField("lastName")}
                        onBlur={onBlur("lastName")}
                        aria-invalid={isInvalid("lastName")}
                        required
                        className={`w-full px-4 py-2 rounded bg-gray-500 text-white border ${isInvalid("lastName") ? "border-red-500" : "border-gray-600"} focus:outline-none focus:ring-2 focus:ring-amber-400`}
                    />
                    {formErrors.lastName && <small className="text-red-400 text-sm">{formErrors.lastName}</small>}
                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-300 mb-2">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formState.username}
                        onChange={setField("username")}
                        onBlur={onBlur("username")}
                        aria-invalid={isInvalid("username")}
                        required
                        className={`w-full px-4 py-2 rounded bg-gray-500 text-white border ${isInvalid("username") ? "border-red-500" : "border-gray-600"} focus:outline-none focus:ring-2 focus:ring-amber-400`}
                    />
                    {formErrors.username && <small className="text-red-400 text-sm">{formErrors.username}</small>}
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
                    Sign Up
                </button>
            </form>
        </div>
    );
}