import axios from 'axios'; // Add this import
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import adminImg from '../assets/images/im3.jpeg';
import Button from '../Components/Button/Button';
import FormInput from '../Components/Inputs/FormInput';
import Swal from 'sweetalert2';
import { validationSchema } from '../Utils/RegisterValidation';

function Register({ onToggle }) {
  const navigate = useNavigate();

  const baseURL = 'http://localhost:8080';

  // Formik logic
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
      gender: '',
      telephone: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      console.log("Form Submitted with values: ", values);

      const submittedValues = {
        name: values.name,
        email: values.email,
        password: values.password,
        gender: values.gender,
        telephone: values.telephone,
        role: "687717c036a5e00b2e57f8fe",
      };

      try {
        const response = await axios.post(`${baseURL}/auth/register`, submittedValues);
        console.log('Full response:', response);
        
        // Check for successful registration
        if (response.status === 201) { // Adjusted to check for 201 status
          console.log("User registered successfully:", response.data);
          Swal.fire('Success', 'User created successfully', 'success');
          navigate('/auth');
        } else {
          const errorMessage = response.data?.message || 'Registration failed';
          Swal.fire('Error', errorMessage, 'error');
        }
      } catch (error) {
        console.error("Registration error:", error);
        const errorMessage = error.response?.data?.message || 'Registration failed';
        Swal.fire('Error', errorMessage, 'error');
      }
    }
  });

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex h-[90%] w-[80%] items-center justify-center ">
          <div className="shadow-2xl shadow-[#317e3d] rounded-lg w-[50%] h-full flex flex-col justify-center">
            <h2 className="text-center text-xl font-bold text-[#317e3d]">CREATE AN ACCOUNT</h2>

            <div className="w-[80%] justify-center content-center ml-28">
              <form onSubmit={formik.handleSubmit} className="space-y-6 px-4">
                <div>
                  <FormInput
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    type="text"
                    label="Name"
                    autoComplete="name"
                  />
                  {formik.errors.name && <span className="text-[#CF3304] text-sm ">{formik.errors.name}</span>}
                </div>
                <div>
                  <FormInput
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                  />
                  {formik.errors.email && <span className="text-[#CF3304] text-sm">{formik.errors.email}</span>}
                </div>
                <div>
                  <FormInput
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    name="password"
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                  />
                  {formik.errors.password && <span className="text-[#CF3304] text-sm">{formik.errors.password}</span>}
                </div>
                <div>
                  <FormInput
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                    id="confirm-password"
                    name="confirmpassword"
                    type="password"
                    label="Confirm Password"
                    autoComplete="current-password"
                  />
                  {formik.errors.confirmpassword && (
                    <span className="text-[#CF3304] text-sm">{formik.errors.confirmpassword}</span>
                  )}
                </div>
                <div>
                  <select
                    name="gender"
                    id="gender"
                    className='block w-[80%] text-base rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2'
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {formik.errors.gender && (
                    <span className="text-[#CF3304] text-sm">{formik.errors.gender}</span>
                  )}
                </div>
                <div>
                  <FormInput
                    value={formik.values.telephone}
                    onChange={formik.handleChange}
                    id="telephone"
                    name="telephone"
                    type="tel"
                    label="Telephone"
                    autoComplete="telephone"
                  />
                  {formik.errors.telephone && <span className="text-[#CF3304] text-sm">{formik.errors.telephone}</span>}
                </div>
                
                <Button name="Sign Up" type="submit" />
              </form>
            </div>
            <p className="mt-4 mr-15 text-center text-sm text-gray-500">
              Already a member?{' '}
              <a href="#" className="font-semibold leading-6 text-[#97BC62] hover:text-[#317e3d]" onClick={onToggle}>
                Sign In Here
              </a>
            </p>
          </div>
          <div className="w-[50%] rounded-lg h-full bg-red-100 flex justify-center items-center">
            <img src={adminImg} className="w-full h-full rounded-lg" alt="login image" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;