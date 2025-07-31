import React from 'react'

const AuthorityCard = ({ title, value, icon, bgColor,description }) => {
  return (
          <div className = {`bg-white p-4 w-[24%] h-full rounded-lg shadow-sm border-l-4 border-[#97BC62] ${bgColor} `}>
              <h3 className="text-lg font-bold text-green-700 mb-1">{title}</h3>
              <p className="text-sm font-semibold mt-3">{description}</p>
              <p className="text-gray-800 font-bold text-xl mt-3">
                 {icon
              
                } {value}
              </p>
          </div>
      );
}

export default AuthorityCard