import { Height, PeopleAltSharp, TrendingUpOutlined } from '@mui/icons-material'
import { CircularProgress, LinearProgress } from '@mui/material'
import { AutoGraph, Backpack, VolunteerActivism, BarChart, ArrowDropDown, LocalHospital, People, MoreHoriz } from '@mui/icons-material'; 
import React from 'react'
import ProgressBar from '../Bar/ProgressBar'


function Cards({icon,value,label,description,increase,stats,statDescription,bg,bg2,text,mt}){
   return(
   <>
   
   <div className=' w-full rounded-lg shadow-xl mb-1 p-3 border-box '
   style={{ backgroundColor: bg,color:text }} 
   >
                  
        <div className='flex items-center justify-between'>
            <div className='flex flex-row items-center justify-center pl-2'>
                <div className='rounded-lg bg-white mr-5 shadow-lg flex flex-row items-center justify-center ' style={{height:"28px",width:"40px",color:"#97BC62"}}>{icon}</div>
                <div className='font-semibold text-md'>{label}</div>
            </div>
          
            <MoreHoriz/>
        </div>
        <div className='p-1 mt-1 font-semibold h-[50%]'>
           
            <div className='flex space-x-5'>
                <span className='text-2xl font-bold'>{value}</span>
                <span className=' font-semibold rounded-[50px] items-center justify-center text-center w-[29%] text-sm flex ' 
                
                style={{backgroundColor:bg2,opacity:0.8}}> {increase} </span>
            </div>
            <span className='text-md'>{description}</span>
             
        </div>
        <div className='flex items-center box-sizing box-content justify-around space-x-5'
        style={{marginTop:mt}}>
        {stats}
        
         <span>{statDescription}</span>
        </div>

   </div>
   
   </>
   )
}
export default Cards
