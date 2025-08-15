import React from 'react'
import Navbar from './Bar/Navbar'
import Cards from './Cards/Card'
import { AutoGraph, PeopleAltSharp,Man,Woman, ArrowDropDown, BarChart, Backpack, Opacity, HealthAndSafety, LocalPostOfficeOutlined, Spa } from '@mui/icons-material'
import ProgressBar from './Bar/ProgressBar'
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart, Pie, Cell } from 'recharts';
import { Typography } from '@mui/material'



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
            color: '#4A9FA4', 
        },
    ];
    const pieChartData = [
        { id: 0, value: 70, label: 'Female', color: secondaryColor },
        { id: 1, value: 30, label: 'Male', color: primaryColor },
    ];
    console.log(pieChartData); 
    const populationIcons = [
        ...Array(7).fill('female'),
        ...Array(3).fill('male'),
    ];
   return(
   <>
   <div className='w-full h-full overflow-y-hidden '>
            <Navbar/>
         <Typography variant='h6' className='text-[#97BC62] ml-2 font-semibold'>Welcome Back,Junie</Typography>
        <div className='flex justify-around items-center w-full p-2 h-full '>
            <div className='h-full flex flex-col justify-center items-center mr-3 w-3/4'>
                <div className="bg-white p-3 h-[70%] mt-10 bg-black rounded-xl w-full shadow-lg">
                    <div className="flex justify-between items-center mb-2 w-full">
                        <h2 className="text-lg font-semibold text-gray-800">Emergency Request Trends</h2>
                        <div className="flex items-center space-x-2 text-gray-600">
                        <span className="text-sm">Sort by</span>
                        <button className="flex items-center bg-gray-100  rounded-md text-sm">
                            This Month <ArrowDropDown />
                        </button>
                        </div>
                    </div>
                    <div className="h-[90%] w-full border-2 border-dashed  bg-gray-50">
                        <LineChart
                        series={seriesData}
                        xAxis={[{ 
                            id: 'barCategories',
                            data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                            scaleType: 'band',
                        }]} 
                        height={290}
                        grid={{ vertical: true, horizontal: true }}      
                        />
                    </div>
                </div>
                <div className='w-full p-2 h-[51%]'>
                    <Typography variant='h6' color='#97BC62'>Population demographics</Typography>
                    <div className="flex h-full justify-between w-full">
                        <div className='border-2  w-[55%] rounded-xl h-[48%]'>
                            <div className='flex justify-around mt-5'>
                                {populationIcons.map((gender, index) => (
                                <div key={index} className="p-1 flex flex-row justify-around">
                                    {gender === 'female' ? (
                                        <Woman style={{ color: secondaryColor ,fontSize:'40'}} className="text-2xl" />    
                                    ) : (
                                        <Man style={{ color: primaryColor,fontSize:'40' }} className="text-2xl" />
                                    )}
                                </div>
                                 ))}
                            </div>
                            <div className="flex w-full mt-4 text-sm font-medium text-gray-600 space-x-4 justify-center ">
                                <span style={{ color: secondaryColor }} className="flex items-center">
                                    <Woman style={{ fontSize: 30 }} className="mr-1" /> Female Population
                                </span>
                                <span style={{ color: primaryColor }} className="flex items-center">
                                    <Man style={{ fontSize: 30 }} className="mr-1"/> Male Population
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row rounded-xl border-2 h-[48%] w-[44%]">
                            <div className="w-[50%] flex items-start justify-start">
                                <PieChart width={300} height={400}>
                                    <Pie
                                        data={pieChartData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="7%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        cornerRadius={5}
                                        startAngle={90}
                                        endAngle={-270}
                                        labelLine={false}
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </div>
                            <div className="flex flex-col items-center mt-2">
                                <div className="flex flex-wrap justify-center w-full text-sm font-medium text-gray-600 space-x-3">
                                    <span className="flex items-center">
                                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: secondaryColor }}></span>
                                        Female (70%)
                                    </span>
                                    <span className="flex items-center">
                                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: primaryColor }}></span>
                                        Male (30%)
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-gray-600 text-center mt-2">
                                    The chart visualizes the population split in high-risk zones, with females representing 70% and males representing 30%.
                                </p>
                                </div>
                        
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='w-1/4 h-full justify-start flex flex-col items-center'>
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
            <Cards value="50.00" label="Available HealthCenters" 
            bg2="#317e3d"
            bg='white'
            mt={18}
            icon={<HealthAndSafety/>}
            increase="+5.2%" stats={<ProgressBar value={0.5}/>} 
            statDescription="5 today"
            description="Registered active health facilities" />
            <Cards value="30.0" label="Local Authorities" 
            bg2="#317e3d"
            bg='white'
            mt={18}
            icon={<LocalPostOfficeOutlined/>}
            increase="+5.2%" stats={<ProgressBar value={0.5} progress="#97BC62"/>} 
            statDescription="12 today"
            description="All competent government authorities actively submitting crucial data" />
        </div>
    </div>
   </div>
   </>
   )
}
export default DashboardRight