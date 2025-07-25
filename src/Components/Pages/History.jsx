
import React, { useState } from 'react';
import { Filter, Filter1Outlined, FilterList, HealthAndSafety } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import HistoryCard from '../Cards/HistoryCard';


const History = ({onClick}) => {
  // let navigate = useNavigate();
  //   const handleClick = () => {
  //   let path = `/NewDonation`; 
  //   navigate(path);
  //   }
  return (
    <>
    <div className="p-4 h-full">
        <div className='flex p-1 items-center justify-between'>
          <p className='font-bold text-gray-500 text-xl'>Last Donations</p>
          <div className='flex items-center w-[25%] justify-around'>
                <button  onClick={onClick} className='flex p-2 w-[60%] items-center bg-gradient-to-b from-[#CF3304] to-[#CF3304]/70 color-white text-white justify-around rounded-lg'>
                    <HealthAndSafety />
                    <p className='text-md font-bold'>Add a Donation</p>
                </button>
                <div className='h-10 w-10 border border-2 border-[#CF3304] flex items-center justify-center rounded-full'>
                  <p className='font-bold'>A+</p>
                </div>
            </div>
        </div>
        <div className='bg-[#e5e5e5]/10 p-2 rounded-xl mt-2 h-[80%]'>
            
            <div className=' w-full flex items-center border-b-2 border-b-gray-300 justify-around p-2 text-base font-bold text-right'>
                
                <span className=' text-center  w-[10%]'>Quantity</span>
                <span className=' text-center  w-[10%]'>Collection date</span>
                <span className=' text-center  w-[10%]'>Type</span>
                <span className=' text-center  w-[10%]'>Expiration date</span>
                <span className=' text-center  w-[10%]'>Component</span>
            </div>
            <HistoryCard Quantity="2" ExpDate="30/10/2024" Component="RBC / PLT / PL" Type="Tripple" CollectionDate="02/05/2018"/>
            <HistoryCard Quantity="2" ExpDate="10/10/2025" Component="RBC / PLT " Type="Double" CollectionDate="02/05/2019"/>
                
          
        </div>
    </div>
    </>
  )
}

export default History