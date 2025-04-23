import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Layout from './components/Layout'
import Login from './components/Login'
import Events from './components/Events'
import Dashboard from "./components/Dashboard"
import SignUp from "./components/SignUp";
import AddTickets from "./components/AddTickets";
import Tickets from "./components/Tickets";
import ProfileUser from "./components/ProfileUser.jsx";
import DashboardSuper from "./components/admin/DashboardSuper";
import EventsDetail from "./components/EventsDetail";
import RegisteredConfirmation from "./components/RegisteredConfirmation.jsx";
import { AppProvider } from "./context/AppProvider.jsx";
import PurchaseTicket from "./components/PurchaseTickets";
// ADMIN
import ManageTickets from "./components/admin/ManageTickets.jsx";
import AddUser from "./components/admin/AddUser.jsx"
import ModifyUser from './components/admin/ModifyUser.jsx'
import ModifyEvent from "./components/admin/ModifyEvent.jsx";
import ModifyTickets from "./components/admin/ModifyTickets.jsx";
import ManageEvents from "./components/admin/ManageEvents";
import ManageUsers from "./components/admin/ManageUsers";
import AddEvent from "./components/admin/AddEvent";
import VerifyAuthAdmin from './components/admin/verifyAuthAdmin.jsx';



function App() {

  return (
      <AppProvider>
        <Routes>
          {/* LANDING */}
          <Route path="/" element={<Layout><Home /></Layout>} />     
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path='/register' element={<Layout><SignUp /></Layout>} />  
          {/* REGULAR USER ROUTES */}       
          <Route path="/my-home" element={<Layout><Home /></Layout>} />   
          <Route path="/my-dashboard" element={<Layout><Dashboard /></Layout>} />     
          <Route path="/confirmation" element={<Layout><RegisteredConfirmation/></Layout>} />
          <Route path="/events" element={<Layout><Events /></Layout>} />  
          <Route path="/event-detail/:id" element={<Layout><EventsDetail /></Layout>} />             
          <Route path="/tickets" element={<Layout><Tickets /></Layout>} />            
          <Route path="/profile" element={<Layout><ProfileUser /></Layout>} /> 
          <Route path="/purchase-tickets/:id" element={<Layout><PurchaseTicket /></Layout>}/>          
          {/* SUPER USER ROUTES */}
          <Route path="/superDashboard" element={<Layout><VerifyAuthAdmin><DashboardSuper /></VerifyAuthAdmin></Layout>} />
          <Route path="/manageusers"    element={<Layout><VerifyAuthAdmin><ManageUsers /></VerifyAuthAdmin></Layout>} />
          <Route path="/add-User" element={<Layout><VerifyAuthAdmin><AddUser /></VerifyAuthAdmin></Layout>} />
          <Route path="/modify-User/:id" element={<Layout><VerifyAuthAdmin><ModifyUser /></VerifyAuthAdmin></Layout>} />
          <Route path="/manage-tickets" element={<Layout><VerifyAuthAdmin><ManageTickets /></VerifyAuthAdmin></Layout>}/>
          <Route path="/addTickets"  element={<Layout><VerifyAuthAdmin><AddTickets /></VerifyAuthAdmin></Layout>} />          
          <Route path="/manage-events"  element={<Layout><VerifyAuthAdmin><ManageEvents /></VerifyAuthAdmin></Layout>} />
          <Route path="/my-addEvents"   element={<Layout><VerifyAuthAdmin><AddEvent /></VerifyAuthAdmin></Layout>} />
          <Route path="/modify-event/:id"   element={<Layout><VerifyAuthAdmin><ModifyEvent /></VerifyAuthAdmin></Layout>} />
          <Route path="/modify-ticket/:id" element={<Layout><VerifyAuthAdmin><ModifyTickets /></VerifyAuthAdmin></Layout>}/>
          <Route path="/profile"   element={<Layout><VerifyAuthAdmin><ProfileUser /></VerifyAuthAdmin></Layout>} />          
        </Routes>
      </AppProvider>
    
  )
}

export default App
