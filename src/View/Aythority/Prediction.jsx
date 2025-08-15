import React,{useEffect,useState} from 'react'
import Navbar from '../../Components/Bar/Navbar'
import { Typography } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import prediction from '../../assets/images/prediction0.jpeg'
import { AccessTimeFilled, AutoGraph, InsightsRounded, MedicalServices, PeopleOutlineSharp } from '@mui/icons-material';


function Prediction() {
 
  const primaryColor = '#317e3d';
  const secondaryColor = '#97BC62';
  const tertiaryColor = '#E8A547';
  const GradientText = ({children,className = "",colors = ["#317e3d", "#E8A547", "#E8A547"],animationSpeed = 8,showBorder = false,}) =>{
    const gradientStyle = {
      backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
      animationDuration: `${animationSpeed}s`,
    };


  return (
    <div
      className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}
    >
      {showBorder && (
        <div
          className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
          style={{
            ...gradientStyle,
            backgroundSize: "300% 100%",
          }}
        >
          <div
            className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      )}
      <div
        className="inline-block relative z-2 text-transparent bg-cover animate-gradient"
        style={{
          ...gradientStyle,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          backgroundSize: "300% 100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
const formik = useFormik({
        initialValues: {
          horizon:''
        },
        validationSchema: Yup.object({
          horizon:Yup.number().required('the time span is required')
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
          console.log(values)
          onSubmit(values);
        }
      });

  return (
    <>
    <div className="w-full h-full overflow-y-hidden">
      <Navbar/>
      <div className='h-[60%] w-full relative items-center justify-center rounded-xl mb-6 bg-cover bg-center bg-no-repeat flex items-end' style={{ backgroundImage: `url(${prediction})` }}>
        <div className=" absolute top-4 text-center">
            <GradientText className='text-3xl font-bold' >
             Generate New Prediction
            </GradientText>
            <marquee className="text-white mt-2 text-lg animate-fadeInSlideUp" >Select the type of prediction you'd like to generate to receive data-driven insights for proactive planning.</marquee>
        </div>
          <div className='bg-white p-5 h-full right-0 mr-5 top-24 shadow-[#97BC62]/25 w-[60%] shadow-xl absolute'>
            <Typography variant='h5' color="#317e3d">
              Select the Prediction Type
            </Typography>
            <form id="prediction-form" onSubmit={formik.handleSubmit}>
                <div >
                  <label htmlFor="horizon" className="block mt-3 text-sm font-medium text-gray-700 mb-2">Time Horizon (Years)</label>
                  <div className="flex items-center border border-gray-300 space-x-3 rounded-lg p-2 bg-white transition-shadow duration-200">
                      <AccessTimeFilled style={{fontSize:'20'}}/>
                      <input type="number" id="horizon" name="horizon" placeholder='5' value={formik.values.horizon}  onChange={formik.handleChange} min="1" max="10" required/>
                  </div>
                </div>
              <div className='flex h-[40%] mt-5 mb-8 items-start justify-between'>
                <div className='w-[33%] h-full p-2 shadow-2xl'>
                  <PeopleOutlineSharp style={{ fontSize: '50px',color:'red' }} />
                  <label className="flex items-center mt-3 p-2 border rounded-lg cursor-pointer has-[:checked]:bg-green-50 has-[:checked]:border-green-600 transition duration-200 ease-in-out">
                      <input type="radio" name="predictionType" value="population" className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" />
                      <span className="ml-3 text-gray-700">Population Growth Risk</span>
                  </label>
                </div>
                <div className='w-[33%] h-full p-2 shadow-2xl'>
                    <AutoGraph style={{ fontSize: '50px',color:'green' }} />
                  <label className="flex items-center p-2 mt-3 border rounded-lg cursor-pointer has-[:checked]:bg-green-50 has-[:checked]:border-green-600 transition duration-200 ease-in-out">
                      <input type="radio" name="predictionType" value="population" className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" />
                      <span className="ml-3 text-gray-700">Disease widespread</span>
                  </label>
                </div>
                <div className='w-[33%] h-full p-2 shadow-2xl'>
                    <MedicalServices style={{ fontSize: '50px', color:'#FCF4A3'}} />
                  <label className="flex items-center p-2 mt-3 border rounded-lg cursor-pointer has-[:checked]:bg-green-50 has-[:checked]:border-green-600 transition duration-200 ease-in-out">
                      <input type="radio" name="predictionType" value="population" className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" />
                      <span className="ml-3 text-gray-700">Service Demand </span>
                  </label>
                </div>
                
                </div>
                <div className="text-center">
                  <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 flex items-center justify-center mx-auto w-full sm:w-auto">
                      <InsightsRounded/>
                      <span id="submit-btn-text" className='ml-4'>Generate Prediction</span>
                  </button>
                </div>
            </form>     
          </div>
           
      </div>
    </div>
    </>
  )
}

export default Prediction