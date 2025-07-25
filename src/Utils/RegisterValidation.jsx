import * as Yup from "yup";
import { validateCamtel, validateMTN, validateOrange } from "../Utils/ValidatePhoneNumber";

export const validationSchema =  Yup.object().shape({
    name:  Yup.string()
                .required("Name is required")
                .matches(/^[A-Za-z\s]+$/i, "Only letters and whitespaces are allowed"),
    email: Yup.string()
                    .email("Enter a valid email address")
                    .required("Email is required"),
    // hospitalName: Yup.string().required('Hospital Name is required'),
    // hospitalAddress: Yup.string().required('Hospital Address is required'),
    // hospitalMatricule: Yup.string().required('Hospital Matricule is required'),
    // matriculationID: Yup.string().required('Admin Matriculation ID is required'),
    password:      Yup.string()
                    .min(5, "Password too short !")
                    .matches(/^[A-Za-z0-9]+[`!@#$%^&()_+\-=\[\]{};':"\\|,.<>\/?~]/, "Password should include letters, numbers and special characters !")
                    .required("Password is required"),
    confirmpassword:  Yup.string()
                      .required("Confirm your password")
                      .oneOf([Yup.ref("password"), null], "Passwords must match !"),
    gender:        Yup.string()
                    .required('choose your gender'),
    telephone: Yup.string()
                .required("Your phone number is required")
                .min(9, "Enter a Cameroonian Phone Number")
                .max(9, "Enter a Cameroonian Phone Number")
                .test("validate-phone", "Enter either MTN, Orange or CAMTEL", (telephone) => (validateMTN(telephone) && validateOrange(telephone) && validateCamtel(telephone)) == false),
   
 });

