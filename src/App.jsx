import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdDashboard from './pages/AdDashboard';

import './App.css';
import i18n from './pages/i18n';

 import Login from './pages/login';
import EditprofileModel from './pages/EditprofileModel';
import NotificationModel from './pages/NotificationModel';
import Company_portal from './pages/Company_portal';
import Agent_Portal from './pages/Agent_Portal';


 


function App() {

  return (
          <div>
          
    {/* <AdDashboard/> */}
    <Dashboard/>
   {/* <Login/>  */}
   {/* <Company_portal/> */}
   {/* <Agent_Portal/> */}
            
    </div>
  );
}

export default App;
