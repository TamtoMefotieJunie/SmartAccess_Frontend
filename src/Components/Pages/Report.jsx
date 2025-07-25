import React from 'react'
import TertiaryButton from '../Button/TertiaryButton'


const Reports = () => {
  return (
    <>
    <div>
        <ul className='flex text-lg text-gray-400 ml-12  pt-5'>
          <li>Patient's Feedback</li>
        </ul>
        <form action="">
        <div className=' p-4 h-[60%] ml-10 self-center w-[33%]'>
          <div className="flex mt-5  space-x-2">
            <label htmlFor='Weight' className="block mt-1 text-base font-medium leading-5 text-gray-900">
              Weight:
            </label>
            <input
                id='Weight'
                name='weight'
                type='number'
                placeholder="weight"
                className="block w-[70%] text-base rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2"
            />
            <p className='text-gray-500 text-base'>Kg</p>
          </div>
          <div className="flex mt-5  space-x-2">
            <label htmlFor='haemoglobin' className="block mt-1 text-base font-medium leading-5 text-gray-900">
              Hb:
            </label>
            <input
                id='haemoglobin'
                name='hb'
                type='number'
                placeholder="Hb"
                className="block w-[70%] text-base rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2"
            />
            <p className='text-gray-500 text-base'> g/dl</p>
            <select id=" haemoglobin" className='block w-[80%] text-base rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2'>
                <option value="Normal">Normal</option>
                <option value="Mild anemia">Mild anemia</option>
                <option value="Moderate anemia">Moderate anemia</option>
                <option value="Severe Anemia">Severe Anemia</option>
            </select>
          </div>
          <div className="flex mt-5  space-x-2">
            <label htmlFor='bloodPressure' className="block mt-1 text-base font-medium leading-5 text-gray-900">
            blood Pressure:
            </label>
            <input
                id='bloodPressure'
                name='bloodPressure'
                type='number'
                placeholder=""
                className="block w-[20%] text-base rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2"
            />
            <p>/</p>
            <input
                id='bloodPressure'
                name='bloodPressure'
                type='number'
                placeholder=""
                className="block w-[20%] text-base rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2"
            />
              <p className='text-gray-500 text-base'> mmHg</p>
          </div>
          <div className="flex mt-5  space-x-2">
              <label htmlFor='pulse' className="block mt-1 text-base font-medium leading-5 text-gray-900">
                Pulse:
              </label>
              <input
                  id='pulse'
                  name='pulse'
                  type='number'
                  placeholder="pulse"
                  className="block w-[70%] text-base rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2"
              />
              <p className='text-gray-500 text-base'> bpm </p>
          </div>
          <div className="flex mt-5  space-x-2">
            <label for="transfusion-effects" className="block mt-1 text-base font-medium leading-5 text-gray-900">Undesirable Effects:</label>
            <select id="transfusion-effects" className='block w-[80%] text-base rounded-md py-1 text-gray-900 shadow-sm border border-1 outline-none pl-2'>
            <option value="">Select an effect</option>
            <option value="allergic-reactions">Allergic Reactions</option>
            <option value="trali">Transfusion-related Acute Lung Injury (TRALI)</option>
            <option value="hemolytic-reactions">Hemolytic Transfusion Reactions</option>
            <option value="circulatory-overload">Circulatory Overload</option>
            <option value="infectious-complications">Infectious Complications</option>
            <option value="hypothermia">Hypothermia</option>
            <option value="graft-vs-host">Graft-versus-Host Disease (GVHD)</option>
            <option value="delayed-hemolytic">Delayed Hemolytic Transfusion Reactions</option>
            </select>
          </div>
          <TertiaryButton name="Save"/>
        </div>
        </form>
    </div>
   </>
  )
}

export default Reports