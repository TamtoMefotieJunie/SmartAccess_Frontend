import React from 'react'
import { CheckCircle, Delete, EditAttributes, QrCode } from '@mui/icons-material'


const DonorCard =({Name,Total_Volume,MSFD,Group,Number_Donations,MSLD,recommendation,confidence,onCheckClick,loading = false}) => {
  const handleCheck = () => {
    onCheckClick();
  };
  return (
     <>
        <div className='p-2 border-b-gray-300 border flex items-center pr-5 justify-around '>
            <div className=' w-[80%] flex items-center justify-between text-base font-semibold '>
                <span  className=' text-center  w-[8%]'>{Name}</span>
                <span  className=' text-center  w-[10%]'>{Total_Volume}</span>
                <span  className=' text-center  w-[10%]'>{MSFD}</span>
                <span  className=' text-center  w-[10%]'>{Group}</span>
                <span  className=' text-center  w-[10%]'>{Number_Donations}</span>
                <span  className=' text-center  w-[10%]'>{MSLD}</span>    
                <span  className=' text-center  w-[10%]'>{recommendation}</span>    
                <span  className=' text-center  w-[10%]'>{confidence}</span>    
            </div>
                <span className=' w-[7%] space-x-2 '>
                    <CheckCircle style={{width:40,height:40,color:"#54C2B5"}} onClick={handleCheck}/>
                    <Delete style={{width:30,height:30,color:"#CF3304"}}/>
                </span>
           
        </div>
        </>
  )
}

export default DonorCard
