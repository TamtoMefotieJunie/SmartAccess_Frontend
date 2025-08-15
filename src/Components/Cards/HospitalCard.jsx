import React from 'react'
import { Delete, ModeEdit, QrCode } from '@mui/icons-material'

const HospitalCard = ({ID,name,location,specialties}) => {
  return (
    <>
    <div className='p-2 border-b-gray-300 border flex items-center justify-around font-semibold text-center'>
      <span className='text-right w-[10%]'>{ID}</span>
      <span className='text-center'>{name}</span>
      <span className='text-center w-[7%]'>{location}</span>
      <span className='text-left w-[14%]'>{specialties}</span>     
      <span className='flex flex-row items-center justify-start w-[10%] space-x-2 '>
          <ModeEdit style={{width:30,height:30,color:"#97BC62"}}/>
          <Delete style={{width:30,height:30,color:"#CF3304"}}/>
      </span>
    </div>
    </>
  )
}

export default HospitalCard