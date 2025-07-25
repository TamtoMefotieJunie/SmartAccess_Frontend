import React from 'react'

const DonorActiveState = ({value,name,donations}) => {
  return (
    <div className='bg-gray-50 rounded-lg mt-2 flex p-2 items-center justify-between shadow'>
        <div className='flex items-center space-x-3 justify-between'>
            <span className='bg-[#54C2B5] rounded w-5 h-5'></span>
            <span>{name}</span>
            <span className='font-bold'>{donations}</span>
        </div>
        <progress progress="#CF3304" value={value}
            style={{
                color: 'transparent', 
                backgroundColor: 'transparent',
            }}
        />
            
         
    </div>
  )
}

export default DonorActiveState