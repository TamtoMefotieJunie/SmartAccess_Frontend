import * as Yup from "yup";
import { validateCamtel, validateMTN, validateOrange } from "../Utils/ValidatePhoneNumber";

export const validationSchema = Yup.object().shape({
  
  name: Yup.string()
    .required("Admin name is required")
    .matches(/^[A-Za-z\s.]+$/i, "Only letters and spaces are allowed"),

  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`!@#$%^&()_+\-=\[\]{};':"\\|,.<>\/?~]).+$/,
      "Password must include letters, numbers and special characters"
    )
    .required("Password is required"),

  matriculationID: Yup.string().required("Admin Matriculation ID is required"),

  telephone: Yup.string()
    .required("Admin phone number is required")
    .length(9, "Enter a valid Cameroonian phone number")
    .test(
      "validate-phone",
      "Enter a valid MTN, Orange or CAMTEL number",
      (tel) =>
        (tel && (validateMTN(tel) || validateOrange(tel) || validateCamtel(tel))) || false
    ),

  hospitalName: Yup.string().required("Hospital Name is required"),

  hospitalAddress: Yup.string().required("Hospital Address is required"),

  hospitalRegion: Yup.string().required("Hospital Region is required"),

  hospitalTelephone: Yup.string()
    .required("Hospital phone number is required")
    .length(9, "Enter a valid Cameroonian phone number")
    .test(
      "validate-hospital-phone",
      "Enter a valid MTN, Orange or CAMTEL number",
      (tel) =>
        (tel && (validateMTN(tel) || validateOrange(tel) || validateCamtel(tel))) || false
    ),

  longitude: Yup.number()
    .typeError("Longitude must be a number")
    .required("Longitude is required"),

  latitude: Yup.number()
    .typeError("Latitude must be a number")
    .required("Latitude is required"),
});