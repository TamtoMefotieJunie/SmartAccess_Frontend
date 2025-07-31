import React,{useEffect,useState} from 'react'
import Navbar from '../../Components/Bar/Navbar'
import { Typography } from '@mui/material'

function Prediction() {
  return (
    <div className="w-full h-full overflow-y-hidden">
      <Navbar/>
      <Typography variant="h6" className="text-[#317e3d]">
          Overview of Your Region
      </Typography>
    </div>
  )
}

export default Prediction