import React,{useState,useEffect}  from 'react'
import Navbar from '../Components/Bar/Navbar'
import { useNavigate} from 'react-router-dom';
import { Filter, Filter1Outlined, FilterList, HealthAndSafety } from '@mui/icons-material';
import StockCard from '../Components/Cards/StockCard';
import { ChevronLeft, ChevronRight, RequestQuote } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2'
import DonorCard from '../Components/Cards/DonorCard';

function Donor() {
    let navigate = useNavigate()
    const handleClick = () => {
    let path = `/Donation`; 
    navigate(path);
    }

    const [donors, setDonors] = useState([]);
    const [donorStats, setDonorStats] = useState({});
    const [checkedDonors, setCheckedDonors] = useState({});
    const [loadingStats, setLoadingStats] = useState({});
    const baseURL = 'http://localhost:8080';

    useEffect(() => {
        const fetchDonors = async () => {
        try {
            const response = await axios.get(`${baseURL}/auth/getAll/Role/66d1b01a13201b49b440af16`);
            console.log(response.data);
            const donorList = response.data.data;
            setDonors(donorList);
            
            // Initialize loading state for each donor
            const initialLoadingState = {};
            donorList.forEach(donor => {
                initialLoadingState[donor._id] = true;
            });
            setLoadingStats(initialLoadingState);
            
            // fetching donor information from donor id
            donorList.forEach(async (donor) => {
                try {
                const statsResponse = await axios.post(`${baseURL}/blood/check-donor`, {
                    donorId: donor._id
                });

                setDonorStats(prev => ({
                    ...prev,
                    [donor._id]: statsResponse.data
                }));
                
                // Mark this donor as loaded
                setLoadingStats(prev => ({
                    ...prev,
                    [donor._id]: false
                }));
                
                } catch (err) {
                console.error("Error fetching donor stats for", donor._id, err);
                // Mark as loaded even on error
                setLoadingStats(prev => ({
                    ...prev,
                    [donor._id]: false
                }));
                }
            });
        } catch (error) {
            console.log(error);
        }
        };

        fetchDonors();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; 
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = donors.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlesave = () => {
    Swal.fire('Saved', 'the price for your hospital has been saved','success')
    }

    const getDisplayValue = (value, isLoading, fallback = "N/A") => {
        if (isLoading) return "Loading...";
        return value !== undefined && value !== null ? value : fallback;
    };

    const getRecommendationColor = (status) => {
        switch(status) {
            case 'safe': return 'text-green-600';
            case 'unsafe': return 'text-red-600';
            case 'new_donor': return 'text-blue-600';
            default: return 'text-gray-600';
        }
    };

  return (
    <div className='w-full space-y-3 h-full overflow-y-hidden'>
      <Navbar />
      <p className='text-[#54C2B5] font-bold text-2xl'>Donation Safety Check</p>
     
        
        <div className='bg-white rounded-xl mt-2 h-[90%]'>
          <div className='p-2 border-b-gray-300 border flex items-center pr-5 justify-around'>
            <div className=' w-[80%] flex items-center justify-between text-base font-bold text-right'>
              <span className=' text-center  w-[10%]'>Name</span>
              <span className=' text-center  w-[10%]'>Total volume</span>
              <span className=' text-center  w-[10%]'>MSFD</span>
              <span className=' text-center  w-[10%]'>Group</span>
              <span className=' text-center  w-[10%]'>Number_Donations</span>
              <span className=' text-center  w-[10%]'>MSLD</span>
              <span className="w-[10%] text-center font-bold">Status</span>
              <span className="text-center w-[10%]">Confidence</span>
      
            </div>
            <span className=' w-[10%] text-center font-semibold space-x-2'>Action</span>
          </div>
          {currentItems.map((item, index) => {
            const stats = donorStats[item._id];
            const isLoading = loadingStats[item._id];
            
            // Extract values with fallbacks
            const totalVolume = stats?.donationMetrics?.totalVolumeDonated || 0;
            const msfd = stats?.donationMetrics?.lastDonationMonthsAgo; // Months Since First Donation
            const numberOfDonations = stats?.donationMetrics?.totalDonations || 0;
            const msld = stats?.donationMetrics?.lastDonationMonthsAgo; // Months Since Last Donation
            const status = stats?.status || 'unknown';
            const confidence = stats?.confidence || 0;
            
            return (
                <DonorCard
                    key={index}
                    Name={item.name}
                    Total_Volume={getDisplayValue(totalVolume, isLoading, "0")}
                    MSFD={getDisplayValue(msfd, isLoading, "N/A")}
                    Group={item.bloodGroup}
                    Number_Donations={getDisplayValue(numberOfDonations, isLoading, "0")}
                    MSLD={getDisplayValue(msld, isLoading, "N/A")}
                    recommendation={
                        isLoading 
                            ? "Loading..." 
                            : (
                                <span className={getRecommendationColor(status)}>
                                    {status === 'safe' ? '✅ Safe' : 
                                     status === 'unsafe' ? '❌ Unsafe' : 
                                     status === 'new_donor' ? '🆕 New Donor' : 
                                     'Unknown'}
                                </span>
                            )
                    }
                    confidence={getDisplayValue(`${confidence.toFixed(1)}%`, isLoading, "0%")}
                    loading={isLoading}
        
                    onCheckClick={() => {
                        if (isLoading) {
                            Swal.fire('Loading', 'Prediction still loading. Please wait...', 'info');
                            return;
                        }
                        
                        if (!stats) {
                            Swal.fire('Error', 'No data available for this donor', 'error');
                            return;
                        }

                        setCheckedDonors(prev => ({ ...prev, [item._id]: true }));
                        
                        const isSafe = stats.status === 'safe';
                        
                        Swal.fire({
                          title: isSafe ? 'Safe to Donate' : stats.status === 'new_donor' ? 'New Donor' : 'Not Safe to Donate',
                          html: `
                              <div class="text-left">
                                  <p class="mb-2"><b>Name:</b> ${item.name}</p>
                                  <p class="mb-2"><b>Blood Group:</b> ${item.bloodGroup}</p>
                                  <p class="mb-2"><b>Status:</b> ${stats.status}</p>
                                  <p class="mb-2"><b>Confidence:</b> ${stats.confidence?.toFixed(1) || 0}%</p>
                                  
                                  ${stats.donationMetrics ? `
                                      <hr class="my-3"> <h5 class="mb-2">Donation History:</h5>
                                      <p class="mb-2"><b>Total Donations:</b> ${stats.donationMetrics.totalDonations || 0}</p>
                                      <p class="mb-2"><b>Total Volume Donated:</b> ${stats.donationMetrics.totalVolumeDonated || 0} c.c.</p>
                                      <p class="mb-2"><b>Last Donation:</b> ${stats.donationMetrics.lastDonationMonthsAgo || 0} months ago</p>
                                      <p class="mb-2"><b>First Donation:</b> ${stats.donationMetrics.monthsSinceFirstDonation || 0} months ago</p> <p class="mb-2"><b>Donation Rate:</b> ${stats.donationMetrics.donationRate?.toFixed(2) || 0} donations/month</p>
                                      <p class="mb-2"><b>Average Volume:</b> ${stats.donationMetrics.averageVolume?.toFixed(2) || 0} c.c./donation</p>
                                      <hr class="my-3"> ` : ''}
                                  
                                  <p class="mb-2"><b>Recommendation:</b> ${stats.recommendation || 'No recommendation available'}</p>
                                  
                                  ${stats.decisionFactors?.length ? 
                                      `<p class="mb-2"><b>Decision Factors:</b><br>${stats.decisionFactors.map(factor => `• ${factor}`).join('<br>')}</p>` : ''}
                                  
                                  <p class="mb-2"><b>Meets Basic Requirement (3+ months since last donation):</b> ${stats.meetsBasicRequirement ? '✅ Yes' : '❌ No'}</p>
                              </div>
                          `,
                          icon: isSafe ? 'success' : stats.status === 'new_donor' ? 'info' : 'error',
                          confirmButtonColor: isSafe ? '#54C2B5' : stats.status === 'new_donor' ? '#3085d6' : '#CF3304',
                          confirmButtonText: 'OK',
                          width: '600px'
                      });
                    }}
                 />
            );
            })}

        
        <div className='flex justify-end mt-5 pr-5'>
          <div className='flex items-center'>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className='p-2 rounded-l-md bg-gray-200 hover:bg-gray-300 focus:outline-none'
            >
              <ChevronLeft className='h-5 w-5 text-gray-500' />
            </button>
            {Array.from({ length: Math.ceil(donors.length / itemsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`p-2 bg-gray-200 hover:bg-gray-300 h-11 focus:outline-none ${currentPage === pageNumber ? 'bg-[#CF3300]' : ''}`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(donors.length / itemsPerPage)}
              className='p-2 rounded-r-md bg-gray-200 hover:bg-gray-300 focus:outline-none'
            >
              <ChevronRight className='h-5 w-5 text-gray-500' />
            </button>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Donor