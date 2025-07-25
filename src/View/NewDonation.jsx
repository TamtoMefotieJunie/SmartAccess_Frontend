import React from 'react'
import ContactInput from '../Components/Inputs/FormInput'
import TertiaryButton from '../Components/Button/TertiaryButton'
import axios from 'axios';
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import { useFormik } from 'formik';


const NewDonation = ({mergedValues}) => {
    if (!mergedValues) {
        console.log('No values passed to new donation page')
    }
      console.log("values passed to new donation",mergedValues);
      const dob = mergedValues.month + "-" + mergedValues.day + "-" + mergedValues.year;
    console.log("date of birth:", dob);
   

    const handleNewDonation = () => {
        Swal.fire('Added', 'New donation added','success')
        }
    const baseURL='http://localhost:8080';
    
    const formik = useFormik({
        initialValues: {
          date: '',
          pack: '',
          component: '',
          startHour: '',
          startMinute: '',
          startPeriod: '',
          endHour: '',
          endMinute: '',
          endPeriod: '',
          bloodGroup: '',
        },
        validationSchema: Yup.object({
          date: Yup.date().required('Date is required'),
          pack: Yup.string().required('Pack type is required'),
          component: Yup.string().required('Blood component is required'),
          startHour: Yup.number().min(1).max(12).required('Start hour is required'),
          startMinute: Yup.number().min(0).max(59).required('Start minute is required'),
          startPeriod: Yup.string().required('period is required'),
          endHour: Yup.number().min(1).max(12).required('End hour is required'),
          endMinute: Yup.number().min(0).max(59).required('End minute is required'),
          endPeriod: Yup.string().required('period is required'),
        }),
        onSubmit: async (values) => {
          console.log("blood values",values);
                console.log(formik.values)
                const collectionDate = new Date(values.date);
                collectionDate.setMonth(collectionDate.getMonth() + 6);
                const expirationDate = collectionDate.toISOString().split('T')[0];
                const startTime = formik.values.startHour + ":" + formik.values.startMinute + "" + formik.values.startPeriod;
                const endTime = formik.values.endHour + ":" + formik.values.endMinute + "" + formik.values.endPeriod;
                const hospitalId = localStorage.getItem('hospitalId')
                const body = {
                "pack":{
                    type:formik.values.pack,
                    components:formik.values.component,
                    CollectionDate:formik.values.date,
                    ExpirationDate:expirationDate,
                    collectionCenter:mergedValues.collectionCenter,
                    status:"Available",
                    startTime:startTime,
                    endTime:endTime,
                    group:formik.values.bloodGroup
                },
                "donor":{
                    name:mergedValues.name,
                    Dob:dob,
                    gender:mergedValues.gender,
                    email:mergedValues.email,
                    address:mergedValues.address,
                    telephone:mergedValues.tel,
                    city:mergedValues.city,
                    nationality:mergedValues.nationality,
                    occupation:mergedValues.occupation,
                    serviceLocation:mergedValues.location,
                    bloodGroup:formik.values.bloodGroup,
                    role: "66d1b01a13201b49b440af16"
                }
              }
                console.log("form values:", body);
                try {
                    const response = await axios.post(`${baseURL}/blood/newpack/${hospitalId}`, body);
                    console.log(response.data);
                    handleNewDonation();
                } catch (error) {
                    console.log(error);
                }
            
        },
      });
      
  return (
    
    <>
        <div className="p-4 h-full">
            <h2 className='text-[#54C2B5] font-bold text-2xl border-b-2 border-b-gray-300'>New Donation </h2>
            <ul className='flex text-lg text-gray-400 justify-around gap-20'>
                <li>Donation Info</li>
                <li>Duration of Collection</li> 
            </ul>
            <form onSubmit={formik.handleSubmit} method='POST' className=''>
      <div className='flex text-lg text-gray-400 justify-around h-full'>
        <div className='w-[33%] h-[60%] pl-2'>
          <div className="mt-4 text-lg space-y-2">
            <ContactInput
              label="Date"
              name='date'
              type='date'
              id='date'
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.date && formik.errors.date ? (
              <div className="text-red-600">{formik.errors.date}</div>
            ) : null}
          </div>
          <div className="mt-7 text-lg space-y-2">
        <label htmlFor="bloodGroup" className='block text-base font-medium leading-6 text-gray-900'>
          Blood Group
        </label>
        <select
          id='bloodGroup'
          name='bloodGroup'
          className='block text-base w-[80%] rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2'
          value={formik.values.bloodGroup}
          onChange={formik.handleChange}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
          <div className="mt-7 text-lg space-y-2">
            <label htmlFor="pack" className='block text-base font-medium leading-6 text-gray-900'>
              Type of Pack
            </label>
            <select
              id='pack'
              name='pack'
              value={formik.values.pack}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='block text-base w-[80%] rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2'
            >
              <option value="">Select Pack</option>
              <option value="Simple">Simple/Male</option>
              <option value="Simple">Simple/Female</option>
              <option value="Double">Double/Male</option>
              <option value="Double">Double/Female</option>
              <option value="Tripple">Tripple/Male</option>
              <option value="Tripple">Tripple/Female</option>
              <option value="Quadriple">Quadriple/Male</option>
              <option value="Quadriple">Quadriple/Female</option>
            </select>
            {formik.touched.pack && formik.errors.pack ? (
              <div className="text-red-600">{formik.errors.pack}</div>
            ) : null}
          </div>

          <div className="mt-7 text-lg space-y-2">
            <label htmlFor="component" className='block text-base font-medium leading-6 text-gray-900'>
              Blood Component
            </label>
            <select
              id='component'
              name='component'
              value={formik.values.component}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='block text-base w-[80%] rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2'
            >
              <option value="">Select Component</option>
              <option value="RBC">Red blood Cell only</option>
              <option value="PL">Plasma only</option>
              <option value="PLT">platelets only</option>
              <option value="RBC/PLT">RBC/PLT</option>
              <option value="RBC/PLT/PL">RBC/PLT/PL</option>
              <option value="RBC/PLT/PL/Cryoprecipitate">RBC/PLT/PL/Cryoprecipitate</option>
              <option value="Whole">whole</option>
            </select>
            {formik.touched.component && formik.errors.component ? (
              <div className="text-red-600">{formik.errors.component}</div>
            ) : null}
          </div>
        </div>

        <div className='h-[60%] p-4 w-[32%]'>
          <div className="flex mt-5 space-x-2">
            <label htmlFor='startHour' className="block text-base font-medium leading-5 text-gray-900">
              Starting Time:
            </label>
            <input
              id='startHour'
              name='startHour'
              type='number'
              placeholder="Hour"
              className="block w-[25%] rounded-md text-base text-gray-900 shadow-sm border border-1 outline-none pl-2"
              max="12"
              min="1"
              value={formik.values.startHour}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          
            <input
              id='startMinute'
              name='startMinute'
              type='number'
              placeholder="Minutes"
              className="block w-[25%] rounded-md text-base text-gray-900 shadow-sm border border-1 outline-none pl-2"
              max="59"
              min="0"
              value={formik.values.startMinute}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
           
            <select
              name='startPeriod'
              value={formik.values.startPeriod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-[20%] rounded-md text-base text-gray-900 shadow-sm border border-1 outline-none pl-2"
            >
              <option value="">Select</option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
           
          </div>
            <p>
                {formik.touched.startHour && formik.errors.startHour ? (
                <span className="text-red-600">{formik.errors.startHour}</span>
                ) : null}   {formik.touched.startMinute && formik.errors.startMinute ? (
                    <span className="text-red-600">{formik.errors.startMinute}</span>
                ) : null} {formik.touched.startPeriod && formik.errors.startPeriod ? (
                    <span className="text-red-600">{formik.errors.startPeriod}</span>
                ) : null}
            </p>

          <div className="flex mt-5 space-x-2">
            <label htmlFor='endHour' className="block text-base font-medium leading-5 text-gray-900">
              Ending Time:
            </label>
            <input
              id='endHour'
              name='endHour'
              type='number'
              placeholder="Hour"
              className="block w-[25%] rounded-md text-base text-gray-900 shadow-sm border border-1 outline-none pl-2"
              max="12"
              min="1"
              value={formik.values.endHour}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              id='endMinute'
              name='endMinute'
              type='number'
              placeholder="Minutes"
              className="block w-[25%] rounded-md text-base text-gray-900 shadow-sm border border-1 outline-none pl-2"
              max="59"
              min="0"
              value={formik.values.endMinute}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            

            <select
              name='endPeriod'
              value={formik.values.endPeriod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-[20%] rounded-md text-base text-gray-900 shadow-sm border border-1 outline-none pl-2"
            >
              <option value="">Select</option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            
          </div>
          <p>
            {formik.touched.endHour && formik.errors.endHour ? (
                <span className="text-red-600">{formik.errors.endHour}</span>
            ) : null}  {formik.touched.endMinute && formik.errors.endMinute ? (
                 <span className="text-red-600">{formik.errors.endMinute}</span>
            ) : null}  {formik.touched.endPeriod && formik.errors.endPeriod ? (
                <span className="text-red-600">{formik.errors.endPeriod}</span>
              ) : null}
            </p>
        </div>
      
        </div>
            <TertiaryButton name="Save"/>
            </form>
        </div>
        
    </>
  )
}

export default NewDonation