import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Bar/Navbar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SpecialistCard from '../Components/Cards/SpecialistCard';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Typography, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

function Doctor() {
  const scheduleRegex = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)(, (Mon|Tue|Wed|Thu|Fri|Sat|Sun))*\s*:?\s*[0-1]?[0-9]:[0-5][0-9]\s*(AM|PM)\s*-\s*[0-1]?[0-9]:[0-5][0-9]\s*(AM|PM)$/i;

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [hospitalSpecialists, setHospitalSpecialists] = useState([]); 

  const baseURL = 'http://localhost:8080';

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchSpecialties = async () => {
    try {
      const response = await axios.get(`${baseURL}/specialty/`);
      if (response.data && response.data.data) {
        console.log(response.data.data)
        setSpecialties(response.data.data);
      } else if (response.data) {
        setSpecialties(response.data);
      }
    } catch (error) {
      console.error("Error fetching specialties:", error);
      setSpecialties([]);
    }
  };

  const fetchHospitalSpecialists = async () => {
    const hospitalId = localStorage.getItem("hospitalId");
    if (!hospitalId) return;

    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/hospitalSpec/fetch/all`, {
        params: { hospitalId }
      });

      if (response.data && response.data.data) {
        const specialistsData = response.data.data.map(item => {
          const names = item.specialists || [];
          return names.map((name, idx) => ({
            id: `${idx}`,
            name,
            specialties: [item.service_name],
            availability: item.availability_time,
            personalInfo: item.service_description,
            image: name.charAt(0).toUpperCase(),
          }));
        }).flat();

        setHospitalSpecialists(specialistsData);
      } else {
        setHospitalSpecialists([]);
      }
    } catch (error) {
      console.error("Error fetching hospital specialists:", error);
      setHospitalSpecialists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties();
    fetchHospitalSpecialists();
  }, []);

  const validationSchema = Yup.object({
    specialtyId: Yup.string().required('Specialty is required'),
    service_Status: Yup.string().required("must be either active, inactive or limited capacity"),
    specialists: Yup.string().notRequired(),
    availability: Yup.string()
      .matches(scheduleRegex, 'Must be a valid schedule format (e.g., Mon, Wed, Fri: 9:00 AM - 5:00 PM)')
      .notRequired(),
    specialtyDescription: Yup.string().required('description is required'),
  });

  const initialValues = {
    specialtyId: '',
    service_Status: '',
    specialists: '',
    availability: '',
    specialtyDescription: '',
  };

  const inputClasses = "w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const errorClasses = "text-red-500 text-xs mt-1";

  return (
    <div className='w-full space-y-2 h-screen '>
      <Navbar />

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="max-w-xl mx-auto bg-white mt-8 rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5" className="text-[#317e3d]">
              Add a New Specialty
            </Typography>
            <Button onClick={handleCloseModal} size="small" className='rounded-full'>
              <Close style={{ color: 'green', fontSize: '30', borderRadius: '100%' }} />
            </Button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const hospitalId = localStorage.getItem("hospitalId");
              const selectedSpecialty = specialties.find(s => s._id === values.specialtyId);

              const body = {
                hospital: hospitalId,
                speciality: values.specialtyId,
                service_name: selectedSpecialty ? `${selectedSpecialty.name} Department` : "",
                service_description: values.specialtyDescription,
                service_status: values.service_Status,
                specialists: values.specialists.split(',').map(s => s.trim()),
                availability_time: values.availability,
              };

              try {
                await axios.post(`${baseURL}/hospitalSpec/newspec`, body);
                Swal.fire("Success", "Specialty saved successfully!", "success");
                fetchHospitalSpecialists(); // refresh list
              } catch (error) {
                console.error("Error creating new specialty:", error);
                Swal.fire("Error", "Could not create specialty", "error");
              }

              setOpenModal(false);
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="specialtyId" className={labelClasses}>Name:</label>
                  <Field as="select" id="specialtyId" name="specialtyId" className={inputClasses}>
                    <option value="">-- Select Specialty --</option>
                    {specialties.length > 0 ? specialties.map(s => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    )) : <option disabled>No specialties available</option>}
                  </Field>
                  <ErrorMessage name="specialtyId" component="div" className={errorClasses} />
                </div>

                <div>
                  <label htmlFor="service_Status" className={labelClasses}>Service Status:</label>
                  <Field type="text" id="service_Status" name="service_Status" className={inputClasses} />
                  <ErrorMessage name="service_Status" component="div" className={errorClasses} />
                </div>

                <div>
                  <label htmlFor="specialists" className={labelClasses}>Specialists (comma-separated):</label>
                  <Field type="text" id="specialists" name="specialists" className={inputClasses} />
                  <ErrorMessage name="specialists" component="div" className={errorClasses} />
                </div>

                <div>
                  <label htmlFor="availability" className={labelClasses}>Availability Time:</label>
                  <Field type="text" id="availability" name="availability" className={inputClasses} />
                  <ErrorMessage name="availability" component="div" className={errorClasses} />
                </div>

                <div>
                  <label htmlFor="specialtyDescription" className={labelClasses}>Description:</label>
                  <Field as="textarea" id="specialtyDescription" name="specialtyDescription" rows="3" className={inputClasses} />
                  <ErrorMessage name="specialtyDescription" component="div" className={errorClasses} />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  >
                    Save Speciality
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>

      {/* Specialists Display */}
      <div className="font-inter h-full">
        <div className='w-full flex items-center mb-2 justify-between'>
          <h5 className="text-xl font-bold text-left text-[#97BC62]">Our Specialists</h5>
          <button
            onClick={handleOpenModal}
            className="bg-[#317e3d] hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-500"
          >
            Add New Specialty
          </button>
        </div>

        <div className="space-y-4 h-[75%] shadow-xl overflow-y-scroll">
          {hospitalSpecialists.length > 0 ? hospitalSpecialists.map(specialist => (
            <SpecialistCard key={specialist.id} specialist={specialist}  />
          )) : (
            <p className="text-center text-gray-500">No specialists found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctor;
