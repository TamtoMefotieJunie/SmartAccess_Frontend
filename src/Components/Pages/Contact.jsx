import React from 'react'
import ContactInput from '../Inputs/ContactInput'
import { Phone, Work,LocationCity } from '@mui/icons-material'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import TertiaryButton from '../Button/TertiaryButton'

const Contact = ({onSubmit}) => {
    const formik = useFormik({
        initialValues: {
          email: '',
          tel: '',
          address: '',
          occupation: '',
          location: '',
          city: '',
          nationality: ''
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Invalid email').required('Email is required'),
          tel: Yup.string().required('Telephone is required'),
          address: Yup.string().required('Address is required'),
          occupation: Yup.string().required('Occupation is required'),
          location: Yup.string().required('Service location is required'),
          city: Yup.string().required('City is required'),
          nationality: Yup.string().required('Nationality is required'),
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
          console.log(values)
          onSubmit(values);
        }
      });
    
    
      return (
        <form onSubmit={formik.handleSubmit} className="space-y-3 w-[100%] p-5 h-[93%]">
          <div>
            <h3 className='flex space-x-5 ml-5 font-semibold'>
              <Phone />
              <p>Based on Contact</p>
            </h3>
           <div className='flex space-x-5 space-y-5'>
                <ContactInput label="Email" name='email' type='email' id='email' value={formik.values.email}  onChange={formik.handleChange}/>
                {formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}
           </div>
           <div className='flex space-x-5 space-y-5'>
                <ContactInput label="Telephone" name='tel' type='tel' id='tel'value={formik.values.tel}  onChange={formik.handleChange} />
                {formik.errors.tel && <div className="text-red-500">{formik.errors.tel}</div>}
            </div>
            <div className='flex space-x-5 space-y-5'>
                <ContactInput label="Address" name='address' type='text' id='address' value={formik.values.address}  onChange={formik.handleChange}/>
                {formik.errors.address && <div className="text-red-500">{formik.errors.address}</div>}
            </div>
          </div>
          <div>
            <h3 className='flex space-x-5 ml-5 font-semibold'>
              <Work />
              <p>Based on Occupation</p>
            </h3>
            <div className='flex space-x-5 space-y-5'>
                <ContactInput label="Occupation" name='occupation' type='text' id='occupation' value={formik.values.occupation}  onChange={formik.handleChange} />
                {formik.errors.occupation && <div className="text-red-500">{formik.errors.occupation}</div>}
            </div>
            <div className='flex space-x-5 space-y-5'>
                <ContactInput label="Service Location" name='location' type='text' id='location' value={formik.values.location}  onChange={formik.handleChange} />
                {formik.errors.location && <div className="text-red-500">{formik.errors.location}</div>}
            </div>
          </div>
          <div>
            <h3 className='flex space-x-5 ml-5 font-semibold'>
              <LocationCity />
              <p>Based on Location</p>
            </h3>
            <div className='flex space-x-5 space-y-5'>
                <ContactInput label="City" name='city' type='text' id='city' value={formik.values.city}  onChange={formik.handleChange} />
                {formik.errors.city && <div className="text-red-500">{formik.errors.city}</div>}
            </div>
             <div className='flex space-x-5 space-y-5'>
                <ContactInput label="Nationality" name='nationality' type='text' id='nationality' value={formik.values.nationality}  onChange={formik.handleChange} />
                {formik.errors.nationality && <div className="text-red-500">{formik.errors.nationality}</div>}
            </div>
          </div>
          <TertiaryButton name="Save" />
        </form>
      );
    };
export default Contact