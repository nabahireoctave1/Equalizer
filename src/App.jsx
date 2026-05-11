import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css';
import Setting from './pages/Settings';
import Adminsetting from './pages/adminsetting';
import Agents_company_portal from './pages/agents_company_portal';
import Billing from './pages/Billing';
import Display from './pages/Display';
import About from './pages/about';
import Notification from './pages/Notification';







function App() {
  return (
          <div>
            <Dashboard/>
            {/* <Billing/> */}
            {/* <About/> */}
            {/* <Display/> */}
            {/* <Adminsetting/> */}
            {/* <Agents_company_portal/> */}
            {/* <Notification/> */}
            
    </div>
  );
}

export default App;
