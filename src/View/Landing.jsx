import React from 'react'
import logo from '../assets/images/logo2.jpg'
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/auth');
    };
  return (
        <div className='bg-white h-screen w-screen overflow-hidden'>
            <div className="bg-white flex justify-between items-center w-full h-[11%]">
            <div className="flex items-center justify-start space-x-10 w-[70%] h-full bg-white">
                <img alt="Your Company" src={logo} className="h-25 w-[15%]" />
                <ul className="flex font-sans font-semibold space-x-5">
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Our specialists</li>
                <li>Contact</li>
                </ul>
            </div>
            <div className="flex justify-around  items-center w-[20%] h-full">
                <ul className="flex w-full h-[40%] justify-center font-semibold font-sans space-x-4">
                    <li
                        onClick={handleRedirect}
                        style={{ cursor: 'pointer' }}
                        className="bg-transparent border border-[#317e3d] text-[#317e3d] rounded-xl w-[30%] text-center pt-1 hover:bg-[#317e3d] hover:text-white transition duration-300"
                    >
                        Login
                    </li>

                    <li
                        className="bg-[#97BC62] rounded-xl w-[40%] pt-1 text-center text-white cursor-pointer hover:bg-[#317e3d] transition duration-300"
                        onClick={() => {
                            navigate('/auth', { state: { register: true } });
                        }}
                    >
                        Sign Up
                    </li>
                    </ul>
            </div>
        </div>
        <div className="relative h-screen flex overflow-hidden">
            <div className="w-2/4 bg-[url('assets/images/nurse8.jpg')] bg-cover bg-center bg-no-repeat"></div>
            <div className="w-2/4 bg-white flex flex-col justify-center items-start p-10 z-10">
                <h1 className="text-5xl md:text-7xl font-extrabold text-[#FFFAFA] mb-4 drop-shadow-lg">
                Your Health <br></br><span className="text-[#66BB6A]">Is our Priority</span>
                </h1>
                <p className="text-xl md:text-3xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                AI-Powered Healthcare for Every Cameroonian: <br className="hidden md:block"/>
                <span className="text-[#66BB6A]">Optimizing Chronic Care, Empowering Communities.</span>
                </p>
                <button className='w-[35%] font-bold text-2xl font-sans rounded-xl h-10 mt-9 hover:bg-[#97BC62] text-white bg-[#317e3d]'  onClick={() => {
                        navigate('/auth', { state: { register: true } });
                    }}>Get Started</button>
            </div>
                            
           <div 
            className="absolute inset-0 z-10 pointer-events-none" 
            style={{ 
                background: `linear-gradient(
                90deg,
                rgba(49, 126, 61, 0.1) 0%,
                rgba(77, 137, 60, 0.4) 25%,
                rgba(104, 163, 83, 0.5) 50%,
                rgba(151, 188, 98, 0.3) 70%,
                transparent 90%
                )`,
            }}
            >
                </div>
        </div>
       
            
    </div>
    
  );
}

export default Landing;


