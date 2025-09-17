import React,{useState,useEffect} from 'react'
import {Button,Modal,Box,TextField,Typography,Chip,Tabs,Tab,Divider} from '@mui/material';
import Navbar from '../Components/Bar/Navbar'; 
import HospitalCard from './Cards/StockCard';
import { Close } from '@mui/icons-material';
import doctorImage  from '../assets/images/doctor.png'
import Swal from 'sweetalert2';
import axios from 'axios';
import { EmergencyCard,TotalRequestCard,ActiveMedicationCard } from './Cards/PatientCard'
function DashboardPatient() {

    const hospitals = [
        {
            id: 1,
            name: "Central Hospital Yaoundé",
            specialization: "General, Emergency",
            availability: "24/7",
            location: "Yaoundé",
            status: "Open"
        },
        {
            id: 2,
            name: "Douala General Hospital",
            specialization: "General, Surgery",
            availability: "24/7",
            location: "Douala",
            status: "Busy"
        },
        {
            id: 3,
            name: "Limbe Regional Hospital",
            specialization: "Maternity, Pediatrics",
            availability: "Mon-Sat 8AM-8PM",
            location: "Limbe",
            status: "Open"
        },
        {
            id: 4,
            name: "Ngaoundéré District Clinic",
            specialization: "General Practice",
            availability: "Mon-Fri 9AM-5PM",
            location: "Ngaoundéré",
            status: "Emergency Only"
        }
    ];

    const handleDetailsClick = (hospital) => {
        console.log("View details for:", hospital.name);  
    };
    
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [numSymptoms, setNumSymptoms] = useState(0);
    const [symptoms, setSymptoms] = useState([]);
    const [user, setUser] = useState(null);
    const [patientId, setPatientId] = useState(null);

     useEffect(() => {
      const storedData = localStorage.getItem('user');
      if (storedData !== "undefined") {
        try {
          const parsedData = JSON.parse(storedData);
          const token = parsedData.token;
          const user = parsedData.user;
          const patientId = user._id
          setUser(user)
          setPatientId(patientId)
          console.log("Token:", token);
          console.log("User:", user);
          console.log("User ID:", user._id);  
        }catch (error) {
        console.error("Error parsing stored data:", error);
      }
      }
      }, []);

    const baseURL='http://localhost:8080';
    const [formData, setFormData] = useState({
      city: "",
      description: "",
      symptom_severity: "",
    });

  const handleNumChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setNumSymptoms(value);
    setSymptoms(Array(value).fill(""));
  };
  const handleSymptomChange = (index, value) => {
    const updated = [...symptoms];
    updated[index] = value;
    setSymptoms(updated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      city:formData.city,
      description:formData.description,
      related_symptoms:symptoms,
      symptom_severity:formData.symptom_severity,
      patient:patientId
    };
    console.log(body)
    try {
      const response = await axios.post(`${baseURL}/emergency/new`, body);
      if (response.data) {
        console.log(response.data.data)
        Swal.fire('Error', 'emergency case created successfuly', 'success');
        setOpenModal(false);
      }
    } catch (error) {
      console.error("Error creating a new emergency situation:", error);
      Swal.fire('Error', 'Failed to create emergency case', 'error');
    }
  };
  const handleRouteClick = (hospital) => {
      console.log("Get route for:", hospital.name);
  };
  return (
    <>
        <div className='w-full h-full overflow-y-hidden '>
            <Navbar/>
            <p className='text-[#317e3d] font-bold text-lg'>Welcome, <span>Junie</span> <br/> <span className='text-gray-400 text-sm'>How are you doing today?</span>  </p>
        
          <div className=' flex justify-between h-screen items-start flex-row'>
               <div className='w-[65%] h-full space-y-2'>
                    <div className="bg-[#97BC62] h-1/5 space-y-2 rounded-xl shadow-lg flex justify-between items-center">
                        <div className="text-white pl-5">
                            <h2 className="text-3xl font-semibold">Find the best doctors with <br/> SmartAccess</h2>
                            <p className="mt-2  text-md">
                            Get immediate response to your emergencies
                            </p>
                        </div>
                        <img 
                            src={doctorImage} 
                            alt="Doctor" 
                            className="w-[20%] h-full object-cover mr-4" 
                        />
                    </div>
                    <div className="space-x-2 h-1/4 p-2 flex flex-row items-start justify-around">
                            <EmergencyCard showEmergencyModal = {handleOpenModal} />
                            <TotalRequestCard
                                diseaseType="Diabetes"
                                number="03"
                            />
                            <ActiveMedicationCard
                                medicationName="Metformin (500mg)"
                                dosage="Take 2 tablets daily"
                                nextDoseTime="Today, 7:00 PM"
                            />
                    </div>
                    <div className="tab-panel space-y-2">
                        <h2 className="text-xl font-bold mb-1">Referential Hospitals</h2>
                        <p className="text-sm text-gray-600">
                            Explore nearby hospitals and clinics, view their specializations, availability, and get optimal routes.
                        </p>
                        <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
                            {hospitals.map(hospital => (
                                <HospitalCard
                                    key={hospital.id}
                                    HospitalName={hospital.name}
                                    Specialization={hospital.specialization}
                                    Availability={hospital.availability}
                                    Location={hospital.location}
                                    Status={hospital.status}
                                    
                                    onDetailsClick={() => handleDetailsClick(hospital)}
                                    onRouteClick={() => handleRouteClick(hospital)}
                                />
                               
                            ))}
                        </div>
                    </div>
               </div>
               <div className=" w-[33%] h-full space-y-4 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="font-bold text-lg border-b ">Medical Summary</h3>
                        <div className="space-y-2 mt-2">
                        <p><span className="font-semibold">Blood Type:</span> O+</p>
                        <p><span className="font-semibold">Allergies:</span> Penicillin, Peanuts</p>
                        <p><span className="font-semibold">Chronic Conditions:</span> Type 2 Diabetes</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="font-bold text-lg border-b pb-2">Emergency Contacts</h3>
                        <div className="mt-2 space-y-3">
                        <div>
                            <p className="font-medium">Dr. Mbarga</p>
                            <p className="text-sm">General Physician</p>
                            <p className="text-sm">+237 6XX XXX XXX</p>
                        </div>
                        <div>
                            <p className="font-medium">Marie N.</p>
                            <p className="text-sm">Next of Kin</p>
                            <p className="text-sm">+237 6XX XXX XXX</p>
                        </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="font-bold text-lg text-green-600 border-b pb-2">Today's Health Tip</h3>
                        <p className="mt-2 italic">
                        "For diabetes management, remember to check your blood sugar levels before meals and take your Metformin as prescribed."
                        </p>
                    </div>
                </div>
                                    
                
          </div>
           <Modal open={openModal} onClose={handleCloseModal}>
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                  }}>
                    <div className="flex justify-between items-center mb-4">
                      <Typography variant="h5" className="text-[#317e3d]">
                       Emergency Medical Recommendation
                      </Typography>
                      <Button onClick={handleCloseModal} size="small">
                        <Close  style={{color:'#317e3d'}}/>
                      </Button>
                    </div>
          
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Enter your city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Brief description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Symptom Severity</label>
                      <select
                        name="symptom_severity"
                        value={formData.symptom_severity}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                      >
                        <option value="">Select severity</option>
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Severe">Severe</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Number of Symptoms</label>
                      <input
                        type="number"
                        min="0"
                        value={numSymptoms}
                        onChange={handleNumChange}
                        className="mt-1 p-2 border rounded w-full"
                      />
                    </div>
                    {symptoms.map((symptom, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium">
                          Symptom #{index + 1}
                        </label>
                        <input
                          type="text"
                          value={symptom}
                          onChange={(e) => handleSymptomChange(index, e.target.value)}
                          className="mt-1 p-2 border rounded w-full"
                          placeholder="Enter symptom"
                        />
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="bg-[#317e3d] text-white px-4 py-2 rounded hover:bg-[#317e3d]/70">
                      Submit
                    </button>
                  </form>
                  </Box>
            </Modal>
        </div>
   </>
  )
}

export default DashboardPatient