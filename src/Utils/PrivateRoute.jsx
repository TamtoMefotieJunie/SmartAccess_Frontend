import { Dashboard as DashboardIcon, Equalizer, Biotech, Settings as SettingsIcon, WalletOutlined, LocalHospital,
     AddLocationAlt, CloudUpload, Analytics, Person,ManageAccounts, Science, Group, 
     EmergencyShare,
     ReportOffRounded,
     ReportProblem} from '@mui/icons-material';

export const userLinks = [
    {
        key: "Citizen", 
        links: [
            { path: "dashboard", label: "Dashboard", icon: <DashboardIcon />, exact: true },
            { path: "emergency", label: "Emergency", icon: <EmergencyShare />, exact: false }, 
            { path: "my-requests", label: "My Requests", icon: <WalletOutlined />, exact: false }, 
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
            { path: "capacity-management", label: "Capacity & Status", icon: <Equalizer />, exact: false }, 
            { path: "patient-referrals", label: "Patient Referrals", icon: <Group />, exact: false }, 
            
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
            { path: "user-management", label: "Patient", icon: <ManageAccounts />, exact: false }, 
            { path: "hospitals", label: "Hospital", icon: <LocalHospital />, exact: false },
            { path: "Authority", label: "Local Authorities", icon: <SettingsIcon />, exact: false }, 
            { path: "ai-model-management", label: "AI Models", icon: <Biotech />, exact: false },
            { path: "data-review", label: "Data Review", icon: <CloudUpload />, exact: false }, 
            { path: "reports-analytics", label: "Reports & Analytics", icon: <Analytics />, exact: false }, 
        ]
    }
];