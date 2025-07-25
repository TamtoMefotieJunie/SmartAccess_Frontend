import React from 'react'

const BloodCard = ({group,type,component,status}) => {
  return (
    <div className='flex text-md text-white  border-b-2 mt-3 font-bold items-center justify-around w-full'>
        <span className='ml-10'>{group}</span>
        <span className='ml-12'>{component}</span>
        <span>{type}</span>
        <span>{status}</span>
    </div>
  )
}

export default BloodCard