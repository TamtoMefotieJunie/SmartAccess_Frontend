import React from 'react';
import { LocalHospital, AccessTime, RequestQuoteSharp } from '@mui/icons-material';

const EmergencyCard = ({showEmergencyModal}) => {

    return (
        <div className="bg-[#317e3d]/25 border-l-4 w-[30%] h-full border-[#317e3d] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-[#317e3d] mb-1">Emergency Access</h3>
            <p className="text-sm text-white mb-2">In a medical emergency, press the button below for immediate assistance.</p>
            <button
                onClick={showEmergencyModal}
                className="w-full bg-[#317e3d] hover:bg-[#97BC62] text-white font-bold py-2 px-2 rounded-lg text-sm transition duration-300 flex items-center justify-center"
            >
                <LocalHospital sx={{ fontSize: 24 }} className="mr-3" /> Request Help Now
            </button>
        </div>
    );
};
const TotalRequestCard = ({ doctorName, diseaseType, number }) => {
    return (
        <div className="bg-white p-4 w-[30%] h-full  rounded-lg shadow-sm border-l-4 border-green-500">
            <h3 className="text-lg font-bold text-green-500 mb-1">My Requests</h3>
            <p className="text-sm text-black mb-1">Your number of emergencies over the last 3 months</p>
            {/* <p className="font-bold">{doctorName}</p> */}
            <p className="text-sm font-semibold mt-5">{diseaseType}</p>
            <p className="text-gray-800 font-bold text-xl">
                <RequestQuoteSharp sx={{ fontSize: 16 }} className="mr-2 " /> {number}
            </p>
        </div>
    );
};



const ActiveMedicationCard = ({ medicationName, dosage, nextDoseTime }) => {
    return (
        <div className="bg-white p-4 w-[30%] h-full rounded-lg shadow-sm border-l-4 border-[#4A90A4]">
            <h3 className="text-lg font-bold text-[#4A90A4] mb-1">Active Medications</h3>
            <p className="text-sm text-black mb-1">Your current medications for your condition</p>
            <p className="font-semibold">{medicationName}</p>
            <p className="text-sm text-gray-600">{dosage}</p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
                <AccessTime sx={{ fontSize: 16 }} className="mr-2" /> {nextDoseTime}
            </p>
        </div>
    );
};



export { EmergencyCard, TotalRequestCard, ActiveMedicationCard };