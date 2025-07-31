import React,{useState,useEffect} from 'react';
import { ChevronLeft, ChevronRight, Close, CloseRounded } from '@mui/icons-material';
import hospitalsImage from '../../assets/images/patientHospitalImg.jpeg';
import Navbar from '../../Components/Bar/Navbar';
import HospitalCard from '../../Components/Cards/StockCard';

function Hospitals() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; 
    
  const hospitals = [
    {
      id: 1,
      name: "Central Hospital Yaoundé",
      specialization: "General, Emergency",
      availability: "24/7",
      location: "Yaoundé",
      contact: "+237 6XX XXX XXX",
      status: "Open"
    },
    {
      id: 2,
      name: "Douala General Hospital",
      specialization: "General, Surgery",
      availability: "24/7",
      location: "Douala",
      contact: "+237 6XX XXX XXX",
      status: "Busy"
    },
    {
      id: 3,
      name: "Limbe Regional Hospital",
      specialization: "Maternity, Pediatrics",
      availability: "Mon-Sat 8AM-8PM",
      location: "Limbe",
      contact: "+237 6XX XXX XXX",
      status: "Open"
    },
    {
      id: 4,
      name: "Ngaoundéré District Clinic",
      specialization: "General Practice",
      availability: "Mon-Fri 9AM-5PM",
      location: "Ngaoundéré",
      contact: "+237 6XX XXX XXX",
      status: "Emergency Only"
    }
  ];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hospitals.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
    

  const handleDetailsClick = (hospital) => {
    console.log("View details for:", hospital.name);
  };

  const handleRouteClick = (hospital) => {
    console.log("Get route for:", hospital.name);
    
  };

  return (
    <div className="w-full h-full overflow-y-hidden">
      <Navbar/>
      
      <div className="p-4">
        <div 
          className="h-48 rounded-xl mb-6 bg-cover bg-center bg-no-repeat flex items-end p-6"
          style={{ backgroundImage: `url(${hospitalsImage})` }}
        >
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            Available Hospitals
          </h1>
        </div>
        <div className="bg-[#317e3d] text-white p-3 rounded-t-lg grid grid-cols-5 gap-2 font-bold text-sm">
          <span >Hospital Name</span>
          <span>Specialization</span>
          <span>Availability</span>
          <span>Location</span>
          <span>Status</span>
        </div>
        <div className="border border-gray-200 rounded-b-lg overflow-hidden">
          {currentItems.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              HospitalName={hospital.name}
              Specialization={hospital.specialization}
              Availability={hospital.availability}
              Location={hospital.location}
              Contact={hospital.contact}
              Status={hospital.status}
              onDetailsClick={() => handleDetailsClick(hospital)}
              onRouteClick={() => handleRouteClick(hospital)}
            />
          ))}
          <div className='flex justify-end mt-4 pr-5'>
                <div className='flex items-center'>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='p-2 rounded-l-md bg-gray-200 hover:bg-gray-300 focus:outline-none'
                  >
                    <ChevronLeft className='h-5 w-5 text-gray-500' />
                  </button>
                  {Array.from({ length: Math.ceil(hospitals.length / itemsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`p-2 hover:bg-gray-300 h-11 focus:outline-none ${currentPage === pageNumber ? 'bg-[#317e3d] ' : 'red'}`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(hospitals.length / itemsPerPage)}
                    className='p-2 rounded-r-md bg-gray-200 hover:bg-gray-300 focus:outline-none'
                  >
                    <ChevronRight className='h-5 w-5 text-gray-500' />
                  </button>
                </div>
     </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default Hospitals;