import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import adminImg from '../assets/images/im7.jpeg';
import logo from '../assets/images/logo2.jpg';
import Button from '../Components/Button/Button';
import FormInput from '../Components/Inputs/FormInput';
import { apiClient } from '../Utils';
import Swal from 'sweetalert2';
import { useAuth } from '../Utils/AuthProvider';

function Authentication({ onToggle }) {
  const [isSignInActive, setIsSignInActive] = useState(false);
  const { login } = useAuth();
  const [isloggedIn, setIsloggedIn] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    Swal.fire({
      position: "center",
      icon:"success",
      title: "Login successful!!!",
      showConfirmButton: false,
      timer: 1500
    });
  }
  const handleFailure = () => {
    Swal.fire({
      position: "center",
      icon:"error",
      title: "Login Failed!!!",
      showConfirmButton: false,
      timer: 1500
    });
  }
  const onSubmit = async (values) => {
    try {
      console.log(values);
      apiClient
        .post('/auth/login', { ...values, role: 'HospitalAdmin' })
        .then((response) => {
          console.log(response.data.user.hospital);
          const adminhospital = response.data.user.hospital
          login(response.data);
          localStorage.setItem('hospitalId', adminhospital);
          navigate('/');
        })
        .catch((error) => {
          // alert('There was an error ->' + error);
          handleFailure(error)
        });
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    Formik.handleSubmit();
    await onSubmit(Formik.values);
  };
  const Formik = useFormik({
    validationSchema: Yup.object().shape({
      email: Yup.string().required('*'),
      password: Yup.string().required('*'),
    }),
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: (values) => {
      console.log(values);
      apiClient
        .post('/user/login', values)
        .then((response) => {
          console.log(response.data);
          login(response.data);
          handleLogin();
          navigate('/dashboard');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex h-[70%] w-[80%] items-center justify-center ">
          <div className="shadow-2xl shadow-[#97BC62] rounded-lg w-[50%] h-full flex flex-col justify-center">
            <div className="flex flex-row self-center justify-center h-[35%]  items-center">
              <img alt="Your Company" src={logo} className="h-full rounded-full w-[95%]" />
            
            </div>
            <h2 className="text-center text-xl font-bold tracking-tight text-[#317e3d]">Sign In to your account</h2>

            <div className="w-[80%] justify-center content-center ml-28">
              <form onSubmit={handleFormSubmit} action="#" method="POST" className="space-y-5 px-4">
                <div>
                  <FormInput
                    value={Formik.values.email}
                    onChange={Formik.handleChange}
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                  />
                  {Formik.errors.email && <span className="text-[#CF3304] text-sm">{Formik.errors.email}</span>}
                </div>

                <div>
                  <div className="flex items-center w-[80%] justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-[#97BC62] hover:text-[#317e3d]">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <FormInput
                      id="password"
                      name="password"
                      value={Formik.values.password}
                      onChange={Formik.handleChange}
                      type="password"
                      autoComplete="current-password"
                      className="block w-[80%] rounded-md py-1.5 text-gray-900 shadow-sm border border-1 outline-none pl-2"
                    />
                    {Formik.errors.password && <span className="text-[#CF3304] text-sm">{Formik.errors.password}</span>}
                  </div>
                </div>

                <Button name="Sign In" />
              </form>
            </div>
            <p className="mt-5 mr-15  text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-[#97BC62] hover:text-[#317e3d]" onClick={onToggle}>
                Sign Up Here
              </a>
            </p>
          </div>
          <div className="w-[50%] rounded-lg h-full bg-red-100 flex justify-center items-center" >
            <img src={adminImg} className="w-full h-full rounded-lg" alt="login image"  />
          </div>
        </div>
      </div>
    </>
  );
}

export default Authentication;
