import React,{useEffect,useState} from 'react'
import Navbar from '../../Components/Bar/Navbar'
import { Modal,Box,Typography,Button } from '@mui/material';
import { Close,LocalHospitalOutlined } from '@mui/icons-material';
import emergency from '../../assets/images/emergency.jpeg'
import EmergencyCard from '../../Components/Cards/EmergencyCard';

function Emergency() {
    const [DetailsModal, setShowDetailsModal] = useState(false);
    const [ModalContent, setModalContent] = useState(null);
    const getStatusClass = (status) => {
        switch (status) {
        case 'Resolved':
            return 'bg-green-100 text-green-700';
        case 'Ongoing':
            return 'bg-yellow-100 text-yellow-700';
        case 'Failed':
            return 'bg-gray-200 text-gray-700';
        default:
            return 'bg-gray-100 text-gray-600';
        }
    };
    const handleCloseModal = () => setShowDetailsModal(false)

  const emergencyData = [
        { id: 1, type: 'Medical Emergency', date: '2025-07-26T14:30:00Z', location: 'Home - Bastos, Yaoundé', status: 'Resolved', team: 'Team Gamma (Ambulance 456)', details: { patientNotes: 'High fever and difficulty breathing.', responderNotes: 'Patient stabilized on site and transported to Central Hospital. Diagnosis: Severe Malaria.', outcome: 'Successfully treated and discharged.' } },
        { id: 2, type: 'Medical Emergency', date: '2025-06-10T23:00:00Z', location: 'Mokolo Market Area', status: 'Resolved', team: 'Team Alpha (Ambulance 123)', details: { patientNotes: 'Chest pains and shortness of breath.', responderNotes: 'ECG performed on site. Patient advised to see a cardiologist.', outcome: 'Patient stable, refused transport.' } },
        { id: 3, type: 'Medical Emergency', date: '2025-07-27T20:45:00Z', location: 'Home - Mvan, Yaoundé', status: 'Ongoing', team: 'Team Bravo (Ambulance 789)', details: { patientNotes: 'Allergic reaction, swelling of the face.', responderNotes: 'Administered epinephrine. Monitoring vitals.', outcome: 'Pending' } },
    ];
    
    const handleViewDetails = (id) => {
        const selectedEmergency = emergencyData.find(em => em.id === id);
        console.log("Viewing details for:", selectedEmergency);
        setShowDetailsModal(true); 
        setModalContent(selectedEmergency);
    };
 

  return (
   <>
    <div className="w-full h-full overflow-y-hidden">
            <Navbar />
            <div className="w-full h-full bg-no-repeat bg-cover overflow-y-scroll space-y-4 p-8 rounded-lg"
                style={{ backgroundImage: `url(${emergency})` }}
            >
                {emergencyData.map((em) => (
                    <EmergencyCard
                        key={em.id}
                        id={em.id} 
                        type={em.type}
                        date={new Date(em.date).toLocaleString()}
                        location={em.location}
                        status={em.status}
                        team={em.team}
                        details={em.details}
                        onDetailsClick={handleViewDetails}
                    />
                ))}
            </div>
            <Modal open={DetailsModal} onClose={handleCloseModal}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                  
                }}>
                    {ModalContent && (
                    <>
                        <div className="flex items-center mb-4 pb-4 border-b">
                        <span className="text-gray-700 mr-4">
                            <LocalHospitalOutlined sx={{ fontSize: 20 }}/>
                        </span>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{ModalContent.type}</h2>
                            <p className="text-sm text-gray-500">{new Date(ModalContent.date).toLocaleString()}</p>
                        </div>
                        </div>

                        <div className="space-y-4 text-gray-700">
                        <div>
                            <strong className="font-semibold block">Status:</strong>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full font-semibold text-xs ${getStatusClass(ModalContent.status)}`}>
                            {ModalContent.status}
                            </span>
                        </div>
                        <div><strong className="font-semibold block">Location:</strong> {ModalContent.location}</div>
                        <div><strong className="font-semibold block">Response Team:</strong> {ModalContent.team}</div>
                        <div className="pt-2">
                            <strong className="font-semibold block">Your Notes:</strong>
                            <p className="mt-1 p-2 bg-gray-100 rounded">{ModalContent.details?.patientNotes}</p>
                        </div>
                        <div className="pt-2">
                            <strong className="font-semibold block">Responder Notes:</strong>
                            <p className="mt-1 p-2 bg-gray-100 rounded">{ModalContent.details?.responderNotes}</p>
                        </div>
                        <div className="pt-2">
                            <strong className="font-semibold block">Outcome:</strong>
                            <p className="mt-1 p-2 bg-gray-100 rounded">{ModalContent.details?.outcome}</p>
                        </div>
                        </div>

                        <div className="mt-8 text-right">
                        <button
                            onClick={handleCloseModal}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition duration-300"
                        >
                            Close
                        </button>
                        </div>
                    </>
                    )}
                </Box>
            </Modal>

     </div>
   </>
  )
}

export default Emergency