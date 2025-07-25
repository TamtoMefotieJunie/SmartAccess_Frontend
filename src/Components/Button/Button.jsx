import React from 'react'

function Button ({name}) {
  return (
    <>
    <div>
        <button
        type="submit"
        className="mt-5 flex w-[80%] justify-center rounded-md bg-[#317e3d] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#97BC62]/95 focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        {name}
        </button>
    </div>
    </>
  )
}

export default Button