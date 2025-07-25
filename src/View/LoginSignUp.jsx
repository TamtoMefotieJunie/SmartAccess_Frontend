import React, { useState } from 'react';
import Authentication from './Authentication';
import Register from './Register';
import { useLocation } from 'react-router-dom';


const AuthContainer = () => {
  const location = useLocation();
  const startWithRegister = location.state?.register || false;

  const [isSignInActive, setIsSignInActive] = useState(!startWithRegister);
  
  const handleToggleForm = () => {
    setIsSignInActive(!isSignInActive);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className={`transition-transform duration-500 ease-in-out absolute w-full h-full ${
          isSignInActive ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Authentication onToggle={handleToggleForm} />
      </div>
      <div
        className={`transition-transform duration-500 ease-in-out absolute w-full h-full ${
          isSignInActive ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <Register onToggle={handleToggleForm} />
      </div>
    </div>
  );
};

export default AuthContainer;