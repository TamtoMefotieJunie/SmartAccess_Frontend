import React from 'react';
import { InfoOutlined, DirectionsRun, LocationOnOutlined } from '@mui/icons-material';

const HospitalCard = ({ 
  HospitalName, 
  Specialization, 
  Availability, 
  Location, 
  Status, 
  onDetailsClick, 
  onRouteClick 
}) => {
  return (
    <div className='p-3 border-b border-gray-200 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors'>
      <div className='w-[92%] flex'>
        <div className='w-[22%] pr-2'>
          <p className='font-medium text-gray-800 truncate'>{HospitalName}</p>
        </div>
        <div className='w-[23%] pr-2'>
          <p className='text-gray-600 text-sm truncate'>{Specialization}</p>
        </div>
        <div className='w-[20%] pr-2'>
          <p className='text-gray-600 text-sm'>{Availability}</p>
        </div>
        
        <div className='w-[15%] pr-2 flex items-center'>
          <LocationOnOutlined sx={{ fontSize: 16, color: '#64748b', mr: 0.5 }} />
          <p className='text-gray-600 text-sm truncate'>{Location}</p>
        </div>
        <div className='w-[20%] pl-20 flex items-end'>
          <span className={`inline-flex items-end w-15% px-2.5 text-right py-0.5 rounded-full text-xs font-medium ${
            Status === 'Open' ? 'bg-green-100 text-green-800' :
            Status === 'Busy' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {Status}
          </span>
        </div>
      </div>
      <div className='flex space-x-1 '>
        <button
          onClick={onDetailsClick}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          title="View Details"
        >
          <InfoOutlined style={{ color: "#317e3d", fontSize: 20 }} /> 
        </button>
        <button
          onClick={onRouteClick}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          title="Get Optimal Route"
        >
          <DirectionsRun style={{ color: "#97BC62", fontSize: 20 }} /> 
        </button>
      </div>
    </div>
  );
};

export default HospitalCard;