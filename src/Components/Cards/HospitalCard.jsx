import React from 'react'
import { Delete, EditAttributes, QrCode } from '@mui/icons-material'

const HospitalCard = ({ID,name,location,}) => {
  return (
    <>
    <div className='p-2 border-b-gray-300 border flex items-center pr-5 justify-around text-center'>
        <div className=' w-[80%] flex items-center justify-between text-base font-semibold text-center '>
            <span  className=' text-center '>{ID}</span>
            <span  className=' text-center '>{name}</span>
            <span  className=' text-center '>{location}</span>
             
        
            <span className='  flex flex-row items-center justify-end w-[10%] space-x-2 '>
                <EditAttributes style={{width:40,height:40,color:"#54C2B5"}}/>
                <Delete style={{width:30,height:30,color:"#CF3304"}}/>
            </span>
         </div>
       
    </div>
    </>
  )
}

export default HospitalCard