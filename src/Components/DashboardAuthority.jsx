import React, { useState, useEffect } from 'react';
import {TrendingUpOutlined,LocalHospitalOutlined,CloudUpload,Description,Close,Healing,Map,Star}from '@mui/icons-material';
import {TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Modal,Box,TextField,Typography} from '@mui/material';
import Navbar from '../Components/Bar/Navbar';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import AuthorityCard from './Cards/AuthorityCard';

function DashboardAuthority() {
  const primaryColor = '#317e3d';
  const secondaryColor = '#97BC62';
  const tertiaryColor = '#E8A547';
 const emergencyTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    series: [
      {
        id: 'emergency-requests',
        label: 'Emergency Requests',
        data: [800, 400, 800, 480, 450, 675, 780],
        color: primaryColor,
        area: true,
        curve: 'neutral'
      },
      {
        id: 'population-growth',
        label: 'Population Growth Index',
        data: [550, 752, 465, 328, 680, 443, 565],
        color: secondaryColor,
        area: true,
        curve: 'monotoneX'
      },
    ]
  };

    const dataDistributionData = {
        labels: ['Mild', 'Moderate', 'Severe', 'Critical'],
        datasets: [{
            label: 'Emergency Types',
            data: [300, 50, 150, 20],
            backgroundColor: [
                primaryColor,
                secondaryColor,
                '#a0aec0', 
                '#cbd5e0'  
            ],
            hoverOffset: 4
        }]
    };
    const pieChartData = dataDistributionData.datasets[0].data.map((value, index) => ({
    label: dataDistributionData.labels[index],
    value: value,
    }));

  const size = {
    width: 200,
    height: 200,
  };
  const documentData = [
    { id: 1, documentName: 'Model Training Data', uploadedBy: 'Mike', uploadDate: '10/01/2023', status: 'Completed' },
    { id: 2, documentName: 'Maintenance Guide', uploadedBy: 'Nichol', uploadDate: '09/25/2023', status: 'Pending' },
    { id: 3, documentName: 'User Feedback', uploadedBy: 'Emily', uploadDate: '09/20/2023', status: 'Completed' },
    { id: 4, documentName: 'Model Evaluation Report', uploadedBy: 'Aaron', uploadDate: '09/15/2023', status: 'Under Review' },
  ];
  return (
    <div className="w-full h-full overflow-y-hidden">
      <Navbar/>
      <Typography variant="h6" className="text-[#317e3d]">
          Overview of Your Region
      </Typography>
      <div className="space-x-2 h-1/4 p-2 flex flex-row items-start justify-between">
        <AuthorityCard
            title="Total Emergency Requests"
            value='12.5K'
            description='Total emergencies recorded in your region for the latest months'
            icon={<LocalHospitalOutlined sx={{ fontSize: 40,color:'#4A9FA4' }} className='p-2 mr-2 items-center flex justify-center bg-gray-200 rounded-full'/>}
            bgColor="bg-white"
        />
         <AuthorityCard
            title="Total Data Submissions"
            value='850'
            description='Number of files you submitted for training updates'
            icon={<CloudUpload sx={{ fontSize: 40,color:'#28A745' }} className='p-2 mr-2 items-center flex justify-center bg-gray-200 rounded-full' />}
            bgColor="bg-white"
        />
         <AuthorityCard
            title="Active Health Centers"
            value='45'
            description='The hospitals known to be active in emergency cases'
            icon={<LocalHospitalOutlined sx={{ fontSize: 40,color:'#4A90A4' }} className='p-2 mr-2 items-center flex justify-center bg-gray-200 rounded-full' />}
            bgColor="bg-white"
        />
         <AuthorityCard
            title="Predicted Population Growth"
            value='+2.3%'
            description='Recent prediction result for your zone,Take a look at the factors '
            icon={<TrendingUpOutlined sx={{ fontSize: 40,color:'#A44A4A' }} className='p-2 mr-2 items-center flex justify-center bg-gray-200 rounded-full' />}
            bgColor="bg-white"
        />
       
      </div>
       <div className='flex justify-between items-center h-[40%]'>
          <div className="relative w-[60%] border-2 bg-white rounded-lg p-4">
            <Typography variant="h6" className="mb-2" style={{ color: primaryColor }}>
              Emergency Trends & Population Growth
            </Typography>
            <LineChart
            height={180}
              series={emergencyTrendData.series}
              xAxis={[{ 
                id: 'months',
                data: emergencyTrendData.labels,
                scaleType: 'point',
              }]} 
              grid={{ vertical: true, horizontal: true }}
              
            />
          </div>
          <div className="relative w-[38%] border-2 bg-white rounded-lg p-4 flex flex-col items-center">
            <Typography variant="h6" className="mb-2" style={{ color: primaryColor }}>
              Emergency Types Distribution
            </Typography>
             <PieChart
                series={[
                    {
                        data: pieChartData,
                        arcLabel: (item) => `${item.value}`,
                        arcLabelMinAngle: 35,
                        arcLabelRadius: '60%',
                    }
                ]}
                colors={[primaryColor, secondaryColor, tertiaryColor, '#cbd5e0']}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fontWeight: 'bold',
                    },
                }}
                {...size}
            />
        </div>
        
       </div>
      
            <h2 className="bg-gray-100 text-lg font-semibold p-1 ">Latest Documents Uploaded</h2>
            <table className="min-w-full divide-y rounded-lg divide-gray-300">
                <thead className="bg-gray-200 ">
                    <tr>
                        <th className="py-3 px-4 text-left text-gray-600">Document Name</th>
                        <th className="py-3 px-4 text-left text-gray-600">Uploaded By</th>
                        <th className="py-3 px-4 text-left text-gray-600">Upload Date</th>
                        <th className="py-3 px-4 text-left text-gray-600">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                    {documentData.map(doc => (
                        <tr key={doc.id} className="hover:bg-gray-100">
                            <td className="py-3 px-4">{doc.documentName}</td>
                            <td className="py-3 px-4">{doc.uploadedBy}</td>
                            <td className="py-3 px-4">{doc.uploadDate}</td>
                            <td className="py-3 px-4">{doc.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
   
  )
}

export default DashboardAuthority