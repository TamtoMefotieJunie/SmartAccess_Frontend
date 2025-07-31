import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './View/Dashboard';
import DashboardMain from './Components/DashboardMain';
import DashboardPatient from './Components/DashboardPatient';
import DashboardAuthority from './Components/DashboardAuthority';
import DashboardHospital from './Components/DashboardHospital';
import Stock from './View/Stock';
import Emergency from './View/Patient/Emergency';
import Orders from './View/Orders';
import HospitalList from './View/Patient/Hospitals'
import Technician from './View/Technician';
import Settings from './View/Settings';
import Notification from './View/Notification';
import Statistics from './Components/Charts/Statistics';
import AuthContainer from './View/LoginSignUp';
import LandingPage from './View/Landing';
import Donations from './View/Donations';
import BloodCollection from './View/BloodCollection';
import NewDonation from './View/NewDonation';
import Hospitals from './View/Hospitals';
import Donor from './View/Donor';
import PatientRecommendation from './View/Patient/Recommendation';
import Recommendation from './View/Recommendation';
import Register from './View/Register';
import { Provider } from 'react-redux';
import { useAuth } from './Utils/AuthProvider';
import Prediction from './View/Aythority/Prediction';
import DataUpload from './View/Aythority/DataUpload';

function App() {
  const { user, getUser } = useAuth();
  const [userState, setUserState] = useState("");

  useEffect(() => {
    console.log("The user has changed in App.jsx");
    console.log(user);

    setUserState(user);
  }, [user]);

  useEffect(() => {
    let u = getUser();

    setUserState(u);

    console.log(`Setting userState to`)
    console.log(u);
  }, []);

  useEffect(() => {
    console.log("In App.jsx, userState is")
    console.log(userState);
  }, [userState]);

  const _roleBasedRoutes = {
    Local: [
      { path: "dashboard", element: <DashboardPatient/>, exact: true },
      { path: 'emergency', element: <Emergency />, exact: true },
      { path: 'report', element: <Statistics/>, exact: true },
      { path: 'recommendations', element: <PatientRecommendation/>, exact: true },
      { path: 'health-resources', element: <HospitalList/>, exact: true },
      
    ],
    HealthCenter_admin: [
      { path: "dashboard", element: <DashboardHospital/>, exact: true },
      { path: 'Stock', element: <Stock />, exact: false },
      { path: 'Orders', element: <Orders/>, exact: true },
      { path: 'Technician', element: <Technician />, exact: true },
      { path: 'Notification', element: <Notification/>, exact: true },
      { path: 'Donation', element: <Donations/>, exact: true },
      { path: 'Chart', element: <Statistics/>, exact: true },
      { path: 'Collection', element: <BloodCollection/>, exact: true },
      { path: 'NewDonation', element: <NewDonation/>, exact: true },
      { path: 'Settings', element: <Settings />, exact: true },
      { path: 'Donor', element: <Donor />, exact: true },
    ],
    Citizen: [
      { path: "dashboard", element: <DashboardAuthority />, exact: true },
      { path: 'prediction', element: <Prediction/>, exact: true },
      { path: 'view-predictions', element: <Statistics/>, exact: true },
      { path: 'submit-data', element: <DataUpload />, exact: true },
      { path: 'establishment-recommendations', element: <Recommendation/>, exact: true },
      
    ],
    Admin: [
      { path: "dashboard", element: <DashboardMain />, exact: true },
      { path: 'Technician', element: <Technician />, exact: true },
      { path: 'Chart', element: <Statistics/>, exact: true },
      { path: 'Settings', element: <Settings />, exact: true },
      { path: 'Hospital', element: <Hospitals/>, exact: true },
      
    ],
  };

  function renderRoutes(){
    let role = userState?.user?.role.name;
    const routes = _roleBasedRoutes[role] || [];

    return routes.map(({ element, path, exact }, index) => (
      <Route key={index} element={element} path={path} exact={exact} />
    ));
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {
             <Route path="/" element={<Dashboard role={userState?.user?.role.name} />}>
              <Route index element={
                userState?.user?.role.name === 'Admin' ? <DashboardMain /> :
                userState?.user?.role.name === 'HealthCenter_admin' ? <DashboardHospital /> :
                userState?.user?.role.name === 'Local_Authority' ? <DashboardPatient /> :
                <DashboardAuthority />
              } />
             {renderRoutes()} 
            </Route>
          }

          <Route path="/auth" element={<AuthContainer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/Settings" element={<Settings/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
