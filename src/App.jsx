import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './View/Dashboard';
import DashboardMain from './Components/DashboardMain';
import DashboardPatient from './Components/DashboardPatient';
import DashboardAuthority from './Components/DashboardAuthority';
import DashboardHospital from './Components/DashboardHospital';
import Stock from './View/Stock';
import Orders from './View/Orders';
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
import Authentication from './View/Authentication';
import Register from './View/Register';
import { Provider } from 'react-redux';
import { useAuth } from './Utils/AuthProvider';

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
    Citizen: [
      { path: "dashboard", element: <DashboardRight />, exact: true },
      { path: 'Technician', element: <Technician />, exact: true },
      { path: 'Chart', element: <Statistics/>, exact: true },
      { path: 'Settings', element: <Settings />, exact: true },
      { path: 'Hospital', element: <Hospitals/>, exact: true },
      
    ],
    HealthCenter_admin: [
      { path: "dashboard", element: <DashboardRight />, exact: true },
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
    Local_Authority: [
      { path: "dashboard", element: <DashboardRight />, exact: true },
      { path: 'Technician', element: <Technician />, exact: true },
      { path: 'Chart', element: <Statistics/>, exact: true },
      { path: 'Settings', element: <Settings />, exact: true },
      { path: 'Hospital', element: <Hospitals/>, exact: true },
      
    ],
    Admin: [
      { path: "dashboard", element: <DashboardRight />, exact: true },
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
                userState?.user?.role.name === 'Local_Authority' ? <DashboardAuthority /> :
                <DashboardPatient />
              } />
             {renderRoutes()} 
            </Route>
          }

          <Route path="/auth" element={<AuthContainer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
