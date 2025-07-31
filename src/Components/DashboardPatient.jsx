import React,{useState,useEffect} from 'react'
import {Button,Modal,Box,TextField,Typography,Chip,Tabs,Tab,Divider} from '@mui/material';
import Navbar from '../Components/Bar/Navbar'; 
import HospitalCard from './Cards/StockCard';
import { Close } from '@mui/icons-material';
import doctorImage  from '../assets/images/doctor.png'
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
                        Propose New Health Center
                      </Typography>
                      <Button onClick={handleCloseModal} size="small">
                        <Close />
                      </Button>
                    </div>
          
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* <TextField
                          label="City"
                          name="city"
                        //   value={newCenter.city}
                          onChange={handleInputChange}
                          required
                          fullWidth
                          variant="outlined"
                          size="small"
                        /> */}
                       
                        {/* <TextField
                          label="Specialty"
                          name="specialty"
                        //   value={newCenter.specialty}
                          onChange={handleInputChange}
                          required
                          fullWidth
                          variant="outlined"
                          size="small"
                          select
                          SelectProps={{ native: true }}
                        >
                          <option value=""></option>
                          <option value="General Practice">General Practice</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Maternity">Maternity</option>
                          <option value="Trauma">Trauma</option>
                          <option value="Cardiology">Cardiology</option>
                        </TextField> */}
                       
                      </div>
          
                      
          
                      <div className="mb-4">
                        <Typography variant="subtitle2" className="mb-2">
                          Reasoning Factors
                        </Typography>
                        <div className="flex gap-2 mb-2">
                          {/* <TextField
                            label="Add Reasoning Factor"
                            name="reasoningFactorInput"
                            value={newCenter.reasoningFactorInput || ''}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            size="small"
                          /> */}
                          <Button 
                            variant="outlined" 
                          >
                            Add
                          </Button>
                        </div>
                        
                      </div>
          
                      <Divider className="my-4" />
          
                      <div className="flex justify-end space-x-2">
                        <Button variant="outlined" onClick={handleCloseModal}>
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          variant="contained" 
                          style={{ backgroundColor: '#317e3d', color: 'white' }}
                        >
                          Submit Proposal
                        </Button>
                      </div>
                    </form>
                  </Box>
                </Modal>
        </div>
   </>
  )
}

export default DashboardPatient