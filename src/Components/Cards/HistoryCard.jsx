import React from 'react'

const HistoryCard = ({Group,Quantity,CollectionDate,Type,ExpDate,Component}) => {
  return (
   <>
    <div className='  w-full flex items-center border-b-2 border-b-gray-300 justify-around p-2 text-base font-semibold text-left'>
            
            <span className=' text-center w-[10%]'>{Quantity}</span>
            <span className=' text-center  w-[10%]'>{CollectionDate}</span>
            <span className=' text-center  w-[10%]'>{Type}</span>
            <span className=' text-center  w-[10%]'>{ExpDate}</span>
            <span className=' text-center  w-[10%]'>{Component}</span>    
        </div>
   </>
  )
}

export default HistoryCard