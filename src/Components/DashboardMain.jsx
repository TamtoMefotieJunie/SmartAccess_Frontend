import React from 'react'
import Navbar from './Bar/Navbar'
import Cards from './Cards/Card'
import { AutoGraph, PeopleAltSharp,VolunteerActivism,FilterList, ArrowDropDown, BarChart, Backpack, Opacity } from '@mui/icons-material'
import ProgressBar from './Bar/ProgressBar'
import { LineChart } from '@mui/x-charts/LineChart';



function DashboardRight({...props}){

 const primaryColor = '#317e3d';
    const secondaryColor = '#97BC62';

    const seriesData = [
        {
            data: [10, 20, 15, 30], 
            label: 'Overall Requests',
            color: primaryColor,
        },
        {
            data: [15, 10, 25, 13], 
            label: 'Healthcare Service Requests',
            color: secondaryColor,
        },
        {
            data: [5, 12, 8, 18], 
            label: 'Data Submissions',
            color: '#60a5fa', 
        },
    ];
   return(
   <>
   <div className='w-full  h-full overflow-y-hidden '>
            <Navbar/>
         <p className='text-[#317e3d] font-bold text-xl'>Welcome Back, <span>Junie</span></p>
        <div className='flex justify-around items-center w-full p-2 h-full '>
            <div className='h-fullflex flex-col justify-center items-center p-4 w-3/4'>
                <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Emergency Request Trends</h2>
                        <div className="flex items-center space-x-2 text-gray-600">
                        <span className="text-sm">Sort by</span>
                        <button className="flex items-center bg-gray-100 px-3 py-1 rounded-md text-sm">
                            This Month <ArrowDropDown />
                        </button>
                        </div>
                    </div>
                    <div className="relative h-[50%] w-full border-2 border-dashed  bg-gray-50">
                        <LineChart
                        series={seriesData}
                        xAxis={[{ 
                            id: 'barCategories',
                            data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                            scaleType: 'band',
                        }]} 
                        height={300}
                        grid={{ vertical: true, horizontal: true }}
                        
                        />
                    </div>
                </div>
            </div>
            <div className='w-1/4 space-y-2 h-full justify-start flex flex-col items-center'>
           
            <Cards
            icon={<AutoGraph/>}
            label="Overall Requests"
            bg="#317e3d"
            text="white"
            increase="+25.55%"
            statDescription="over 10 today"
            value="100.01"
            bg2="silver"
            description="increase in data by 50 since the last 7 days from 20 to 70"
            stats={<BarChart style={{width:60,height:"40",marginRight:"90"}}/>}
            />

            <Cards value="50.00" label="Available Packs" 
            bg2="#317e3d"
            mt={18}
            icon={<Backpack/>}
            increase="+5.2%" stats={<ProgressBar value={0.5}/>} 
            statDescription="5 today"
            description="Donations received for the last 7 days from 10% to 25%" />

            <Cards value="30.0" label="Donors" 
            bg2="#317e3d"
            mt={18}
            icon={<VolunteerActivism/>}
            increase="+5.2%" stats={<ProgressBar value={0.5} progress="#97BC62"/>} 
            statDescription="12 today"
            description="Donors received for the last 7 days from 10% to 25%" />
        </div>
        
        </div>
        

    
   </div>
   </>
   )
}
export default DashboardRight