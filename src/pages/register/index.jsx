import { useState } from "react"
import { 
    ConfirmSchema,
    getErrors,
    getFieldError,
 } from "../../lib/validationForm"





export default function RegisterPage(){
    const [formSubmitted,setFormSubmitted]=useState(false);
    const [formErrors,setFormErrors]=useState({});
    const [touchedFields,setTouchedFields]=useState({});
    const [formState,setFormState]=useState({
        email:"",
        fistname:"",
        lastName:"",
        userName:"",
        password:"",
    });
    
    return(
        <><h1 className="text-4xl text-center">Register</h1></>

    )
}