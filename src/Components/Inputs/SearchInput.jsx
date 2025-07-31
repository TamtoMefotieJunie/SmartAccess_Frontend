import React from 'react'
import { Search } from '@mui/icons-material'
const SearchInput = () => {
    return (
          <div className="border flex flex-row pl-3 items-center border-gray-200 mt-2 w-[80%] rounded-md ">
             <Search style={{color:"gray",color:'#317e3d'}}/>
            <input
              id="price"
              name="price"
              type="text"
              placeholder="Search......"
              className=" w-full outline-none rounded-lg  py-1.5 pl-2 pr-20 text-gray-900  sm:text-md"
            /> 
          </div>
        
      )
}

export default SearchInput