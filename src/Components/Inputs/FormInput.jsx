import React from 'react'

function FormInput({type,name,id,label,value,onChange}) {
  return (
    <>
   
        <label htmlFor={id} className="block text-base font-medium leading-6 text-gray-900">
            {label}
        </label>
        <div className="">
            <input
                id={id}
                value={value}
                onChange={onChange}
                name={name}
                type={type} 
                className="block w-[80%] text-base rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2"
                   
            />
                
        </div>
    </>
  )
}

export default FormInput