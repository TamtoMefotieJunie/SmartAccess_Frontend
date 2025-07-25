import React from 'react'

function SecondaryButton ({name}) {
  return (
    <>
    <div>
        <button
        type="submit"
        className="mt-5 flex w-[100%] justify-center rounded-md bg-[#CF3304] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#8BD0C7] focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        {name}
        </button>
    </div>
    </>
  )
}

export default SecondaryButton