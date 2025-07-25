import React from 'react'

const ContactInput = ({id,label,name,value,type,onChange}) => {
  return (
    <div className='space-y-2 flex justify-around items-center w-[40%] pt-2'>
    <label htmlFor={id} className="block text-sm font-medium leading-5 text-gray-900">
    {label}
    </label>
    <input
        id={id}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        className="block w-[80%] rounded-md py-1 text-gray-900 shadow-sm border-b-2 border-b-gray-400 outline-none pl-2"  
    />
</div>
  )
}

export default ContactInput