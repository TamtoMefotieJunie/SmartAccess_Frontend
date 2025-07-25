import React, { useState } from 'react';

import * as Yup from 'yup'
import Navbar from '../Components/Bar/Navbar';
import { useFormik } from 'formik';
// import donorAppointment from './../assets/images/appointment.jpg'
import { useNavigate } from "react-router-dom";
import SecondaryButton from '../Components/Button/SecondaryButton';

const Donations = () => {
    let navigate = useNavigate();
    
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        month: Yup.string()
            .required('Month is required'),
        day: Yup.number()
            .min(1, 'Day must be at least 1')
            .max(31, 'Day cannot exceed 31')
            .required('Day is required'),
        year: Yup.number()
            .min(1900, 'Year must be 1900 or later')
            .max(new Date().getFullYear(), 'Year cannot be in the future')
            .required('Year is required'),
        gender: Yup.string()
            .required('Gender is required'),
        collectionCenter: Yup.string()
            .required('Collection Center is required'),
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const Formik = useFormik({
      initialValues: {
        name: '',
        month: '',
        day: '',
        year: '',
        gender: '',
        collectionCenter: '',
      },
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
     
      onSubmit: async (values) => {
        setIsSubmitted(true);
        console.log(values)
    
        let path = `/Collection`;
        console.log(`going to: ${path}`)
        navigate(path, { state: {  donorValues: values } });
    }
});
    return (
        <div className='w-full space-y-3 h-full overflow-y-hidden'>
            <Navbar />
            <p className='text-[#54C2B5] font-bold text-xl'>Add a donor</p>
            <div className='h-[90%] p-2'>
                <div
                    className="h-[50%]  w-full"
                    style={{
                        backgroundImage: `url(${donorAppointment})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: '50%',
                        width: '100%',
                    }}
                >
                    <div className='bg-[#ffffff]/20 h-full w-full '></div>
                </div>
                <div className='bg-white flex items-center justify-center self-center h-[50%] w-full '>
                    <div className='w-[30%] h-[60%] flex flex-col  p-7 rounded-lg bottom-5 bg-white shadow-xl absolute'>
                        <p className='text-lg font-bold'>Donor's information</p>
                        <form onSubmit={Formik.handleSubmit} method="POST" className="space-y-3 w-[100%] px-1  h-[93%] ">
                            <div className='space-y-2 pt-2'>
                                <label htmlFor='name' className="block text-sm font-medium leading-5 text-gray-900">
                                    Name
                                </label>
                                <input
                                    id='name'
                                    value={Formik.values.name}
                                    onChange={Formik.handleChange}
                                   
                                    type='text'
                                    className="block w-[100%] rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2"
                                />
                                 {Formik.errors.name && <p className="text-red-500">{Formik.errors.name}</p>}
                            </div>
                            <div className='space-y-2'>
                                <label htmlFor='dob' className="block text-sm font-medium leading-5 text-gray-900">
                                    Date of Birth
                                </label>
                                <div className="flex space-x-2">
                                <label htmlFor='month'></label>
                                    <select
                                        id='month'
                                        name='month'
                                        onChange={Formik.handleChange}
                                        value={Formik.values.month}
                                        className="block w-[30%] rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2"
                                    >
                                        <option value="">Month</option>
                                        <option value="01">January</option>
                                        <option value="02">February</option>
                                        <option value="03">March</option>
                                        <option value="04">April</option>
                                        <option value="05">May</option>
                                        <option value="06">June</option>
                                        <option value="07">July</option>
                                        <option value="08">August</option>
                                        <option value="09">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                    <input
                                        id='day'
                                        name='day'
                                        type='number'
                                        placeholder="Day"
                                        value={Formik.values.day}
                                        onChange={Formik.handleChange}
                                        className="block w-[20%] rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2"
                                        min="1"
                                        max="31"
                                    />
                                    <input
                                        id='year'
                                        name='year'
                                        type='number'
                                        placeholder="Year"
                                        value={Formik.values.year}
                                        onChange={Formik.handleChange}
                                        className="block w-[40%] rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                    />
                                </div>
                                {(Formik.errors.month || Formik.errors.day || Formik.errors.year) && (
                                <p className="text-red-500">
                                    {Formik.errors.month && <span>{Formik.errors.month} </span>}
                                    {Formik.errors.day && <span>{Formik.errors.day} </span>}
                                    {Formik.errors.year && <span>{Formik.errors.year}</span>}
                                </p>
                            )}
                            </div>
                            <div className='space-y-2 '>
                                <label htmlFor='gender' className="block text-sm font-medium leading-5 text-gray-900">
                                    Gender
                                </label>
                                <select
                                 id='gender'
                                 name='gender'
                                 onChange={Formik.handleChange}
                                 value={Formik.values.gender}
                                className="block w-[100%] rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2">
                                    <option value="">select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                { Formik.errors.gender && <p className="text-red-500">{Formik.errors.gender}</p>}
                            </div>
                            <div className='space-y-2'>
                                <label htmlFor='collection-center' className="block text-sm font-medium leading-5 text-gray-900">
                                    Collection Center
                                </label>
                                <select 
                                id='collectionCenter'
                                name='collectionCenter'
                                onChange={Formik.handleChange}
                                value={Formik.values.collectionCenter}
                                className="block w-[100%] rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2">
                                    <option value="">Select Center</option>
                                    <option value="HCY">HCY</option>
                                    <option value="CPY">CPY</option>
                                    <option value="CMY">CMY</option>
                                    <option value="bethanie">Bethanie</option>

                                </select>
                                { Formik.errors.collectionCenter && <p className="text-red-500">{Formik.errors.collectionCenter}</p>}
                            </div>
                            <SecondaryButton name="CREATE" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Donations