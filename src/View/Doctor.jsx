import React,{useState,useEffect}  from 'react'
import Navbar from '../Components/Bar/Navbar'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SpecialistCard from '../Components/Cards/SpecialistCard';
import doc1 from '../assets/images/doc1.svg'
import doc2 from '../assets/images/doc2.svg'
import axios from 'axios';
import Swal from 'sweetalert2'
import { Modal, Typography, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
function Doctor() {
    const specialists = [
    {
        id: 1,
        name: 'Dr. Jane Foster',
        specialties: ['Cardiology', 'Internal Medicine'],
        availability: 'Mon, Wed, Fri: 9:00 AM - 5:00 PM',
        personalInfo: 'Dr. Foster is a board-certified cardiologist with over 15 years of experience in diagnosing and treating heart conditions.',
        image: doc2,
    },
    {
        id: 2,
        name: 'Dr. Alan Grant',
        specialties: ['Orthopedics', 'Sports Medicine'],
        availability: 'Tues, Thurs: 10:00 AM - 6:00 PM',
        personalInfo: 'Dr. Grant specializes in orthopedic surgery and has a focus on sports-related injuries and rehabilitation.',
        image: doc1,
    },
     {
        id: 2,
        name: 'Dr. Alan Grant',
        specialties: ['Orthopedics', 'Sports Medicine'],
        availability: 'Tues, Thurs: 10:00 AM - 6:00 PM',
        personalInfo: 'Dr. Grant specializes in orthopedic surgery and has a focus on sports-related injuries and rehabilitation.',
        image: doc1,
    },
    ];

    const [donors, setDonors] = useState([]);
    const baseURL = 'http://localhost:8080';
    const handlesave = () => {
    Swal.fire('Saved', 'the price for your hospital has been saved','success')
    }
    const [openModal, setOpenModal] = useState(false);
      const handleOpenModal = () => setOpenModal(true);
      const handleCloseModal = () => setOpenModal(false);
      const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...newCenter,
            recommendation_case: 'new_establishment',
            model_type: 'Manual Proposal'
          })
        });
        
        if (response.ok) {
          const updatedRecs = await fetch('/api/recommendations');
          setRecommendations(await updatedRecs.json());
          handleCloseModal();
        }
        } catch (error) {
          console.error('Error submitting proposal:', error);
        }
      };
      const handleRouteClick = (hospital) => {
          console.log("Get route for:", hospital.name);
      
      };

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  image: Yup.string().url('Must be a valid URL').notRequired(),
  specialties: Yup.string().notRequired(),
  availability: Yup.string().notRequired(),
  personalInfo: Yup.string().required('Personal information is required'),
});
const initialValues = {
  name: '',
  image: '',
  specialties: '',
  availability: '',
  personalInfo: '',
};

const inputClasses = "w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
const errorClasses = "text-red-500 text-xs mt-1";
    


  return (
    <div className='w-full space-y-2 h-screen '>
      <Navbar />
       <Modal open={openModal} onClose={handleCloseModal}>
          <div className="max-w-xl mx-auto bg-white mt-8 rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h5" className="text-[#317e3d]">
                Add a New Specialist
              </Typography>
              <Button onClick={handleCloseModal} size="small" className='rounded-full'>
                <Close style={{color:'green', fontSize:'30', borderRadius:'100%'}} />
              </Button>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                const newSpecialist = {
                    ...values,
                    specialties: values.specialties.split(',').map(s => s.trim()).filter(s => s !== ''),
                };
                onAddSpecialist(newSpecialist);
                resetForm();
              }}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="name" className={labelClasses}>Name:</label>
                            <Field type="text" id="name" name="name" className={inputClasses} />
                            <ErrorMessage name="name" component="div" className={errorClasses} />
                        </div>
                        <div>
                            <label htmlFor="image" className={labelClasses}>Image URL:</label>
                            <Field type="text" id="image" name="image" className={inputClasses} />
                            <ErrorMessage name="image" component="div" className={errorClasses} />
                        </div>
                        <div>
                            <label htmlFor="specialties" className={labelClasses}>Specialties (comma-separated):</label>
                            <Field type="text" id="specialties" name="specialties" className={inputClasses} />
                            <ErrorMessage name="specialties" component="div" className={errorClasses} />
                        </div>
                        <div>
                            <label htmlFor="availability" className={labelClasses}>Availability Time:</label>
                            <Field type="text" id="availability" name="availability" className={inputClasses} />
                            <ErrorMessage name="availability" component="div" className={errorClasses} />
                        </div>
                        <div>
                            <label htmlFor="personalInfo" className={labelClasses}>Personal Info:</label>
                            <Field as="textarea" id="personalInfo" name="personalInfo" rows="3" className={inputClasses} />
                            <ErrorMessage name="personalInfo" component="div" className={errorClasses} />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-200 disabled:opacity-50"
                            >
                                Save Specialist
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>           
        </Modal>
        <div className="font-inter h-full ">
            <div className='w-full flex items-center mb-2 justify-between'>
              <h5 className="text-xl font-bold text-left text-[#97BC62]">Our Specialists</h5>
              <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#317e3d] hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-500"
                >
                    Add New Specialist
                </button>
            </div>
            <div className="space-y-4 h-[75%] shadow-xl overflow-y-scroll">
                {specialists.map(specialist => (
                    <SpecialistCard key={specialist.id} specialist={specialist} />
                ))}
            </div>
        </div>
    
    </div>
    
  )
}

export default Doctor