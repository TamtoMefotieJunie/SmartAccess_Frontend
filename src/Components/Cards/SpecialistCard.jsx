import { LockClockOutlined, Timer10Select } from "@mui/icons-material";
import React from "react";

const SpecialistCard = ({ specialist }) => {
      const firstLetter = specialist.name.charAt(4).toUpperCase();
    return (
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg p-6 w-full items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
        
            <div className="w-32 h-32 rounded-full bg-green-200 flex items-center justify-center shadow-md mx-auto md:mx-0">
                <span className="text-6xl font-bold text-green-800">{firstLetter}</span>
            </div>
            <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{specialist.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{specialist.personalInfo}</p>

                <div className="mb-4">
                    <h4 className="text-md font-semibold text-gray-700 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {specialist.specialties.map((specialty, index) => (
                            <span
                                key={index}
                                className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full"
                            >
                                {specialty}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center md:justify-start text-gray-600 space-x-2">
                    <LockClockOutlined/>
                    <span className="text-sm font-medium">{specialist.availability}</span>
                </div>
            </div>
        </div>
    );
};
export default SpecialistCard;