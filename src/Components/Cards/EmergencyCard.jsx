import React from 'react';
import {LocalHospitalOutlined,DirectionsCarFilledOutlined,HealingOutlined,ErrorOutline,CalendarMonthOutlined,LocationOnOutlined} from '@mui/icons-material';

const EmergencyCard = ({ id, type, date, location, status, team, details, onDetailsClick }) => {

    const getStatusClass = (status) => {
        switch (status) {
            case 'Resolved': return 'bg-green-100 text-green-700';
            case 'Ongoing': return 'bg-yellow-100 text-yellow-700';
            case 'Failed': return 'bg-gray-200 text-gray-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    };
    
    const itemDate = new Date(date);
    const formattedDate = itemDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = itemDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const borderColor = status === 'Resolved' ? '#38a169' : status === 'Failed' ? '#a0aec0' : '#dd6b20';

    return (
        <div
            className="bg-white p-4 md:p-6 rounded-lg shadow-md border-l-4 transition-transform transform hover:scale-[1.02]"
            style={{ borderColor: borderColor }}
        >
            <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                    <div className="flex items-center mb-2">
                        <span className="text-xl text-gray-600 mr-3">
                            <LocalHospitalOutlined sx={{ fontSize: 20 }}/>
                        </span>
                        <h3 className="text-lg font-bold text-gray-800">{type}</h3>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center">
                        <CalendarMonthOutlined sx={{ fontSize: 16 }} className="mr-2" />
                        {formattedDate} at {formattedTime}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 flex items-center">
                        <LocationOnOutlined sx={{ fontSize: 16 }} className="mr-2" />
                        {location}
                    </p>
                </div>
                <div className="mt-4 md:mt-0 md:text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full font-semibold text-xs ${getStatusClass(status)}`}>
                        {status}
                    </span>
                    <p className="text-sm text-gray-600 mt-2">Response: {team}</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 text-right">
                <button
                    onClick={() => onDetailsClick(id)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md text-sm transition duration-300"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default EmergencyCard;