import { Dashboard as DashboardIcon, Equalizer, Biotech, Settings as SettingsIcon,LocalHospital,
     AddLocationAlt, CloudUpload, Analytics, Person, Science, Group,EmergencyShare,ReportProblem,MedicalServices} from '@mui/icons-material';

export const userLinks = [
    {
        key: "Citizen", 
        links: [
            { path: "dashboard", label: "Dashboard", icon: <DashboardIcon />, exact: true },
            { path: "emergency", label: "Emergency", icon: <EmergencyShare />, exact: false }, 
            { path: "health-resources", label: "Health Centers", icon: <LocalHospital />, exact: false }, 
            { path: "recommendations", label: "Recommendation", icon: <Person />, exact: false }, 
            { path: "report", label: "My reports", icon: <ReportProblem />, exact: false }, 
        ]
    },
    {
        key: "HealthCenter_admin", 
        links: [
            { path: "dashboard", label: "Dashboard", icon: <DashboardIcon />, exact: true },
            { path: "my-hospital-profile", label: "Hospital Profile", icon: <LocalHospital />, exact: false }, 
            { path: "medical-personel", label: "Doctors", icon: <Group />, exact: false },
            { path: "appointments", label: "Appointment", icon: <MedicalServices/> , exact: false },
        ]
    },
    {
        key: "Local_Authority", 
        links: [
            { path: "dashboard", label: "Dashboard", icon: <DashboardIcon />, exact: true },
            { path: "prediction", label: "Prediction", icon: <Science />, exact: false }, 
            { path: "view-predictions", label: "View Predictions", icon: <Analytics />, exact: false }, 
            { path: "submit-data", label: "Local Data", icon: <CloudUpload />, exact: false }, 
            { path: "establishment-recommendations", label: "New Facilities", icon: <AddLocationAlt />, exact: false },
        ]
    },
    {
        key: "Admin", 
        links: [
            { path: "dashboard", label: "Dashboard", icon: <DashboardIcon />, exact: true },
            { path: "Hospitals", label: "Hospital", icon: <LocalHospital />, exact: false },
            { path: "Authority", label: "Local Authorities", icon: <SettingsIcon />, exact: false }, 
            { path: "ai-model-management", label: "AI Models", icon: <Biotech />, exact: false },
            { path: "data-review", label: "Data Review", icon: <CloudUpload />, exact: false }, 
        ]
    }
];