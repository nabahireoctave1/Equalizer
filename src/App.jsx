import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdDashboard from './pages/AdDashboard';

import './App.css';
import Agents_company_portal from './pages/Agents_company_portal'


 import Login from './pages/login';
import EditprofileModel from './pages/EditprofileModel';
import NotificationModel from './pages/NotificationModel';




function App() {

  return (
          <div>
          
    <AdDashboard/>
    {/* <Dashboard/> */}
   {/* <Login/>  */}
            
    </div>
  );
}

export default App;
