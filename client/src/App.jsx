import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Layout from './components/Layout'
import Login from './components/Login'
import LayoutSigned from './components/LayoutSigned'
import LayoutSuperUser from './components/LayoutSuperUser'
import Events from './components/Events'
import Dashboard from "./components/Dashboard"
import SignUp from "./components/SignUp";
import AddTickets from "./components/AddTickets";
import Tickets from "./components/Tickets";
import AddEvent from "./components/AddEvent";
import ManageEvents from "./components/ManageEvents";
import ManageUsers from "./components/ManageUsers";
import ProfileUser from "./components/ProfileUser.jsx";
import ProfileSuperUser from "./components/ProfileSuperUser.jsx";
import DashboardSuper from "./components/DashboardSuper";
import EventsDetail from "./components/EventsDetail";
import RegisteredConfirmation from "./components/RegisteredConfirmation.jsx";
import { AppProvider } from "./AppProvider";
import PurchaseTicket from "./components/PurchaseTickets";
import ManageTickets from "./components/ManageTickets";
import './components/css/main-shared.css';
import AddUser from "./components/AddUser.jsx"
import ModifyUser from './components/ModifyUser.jsx'
import ModifyEvent from "./components/ModifyEvent.jsx";
import ModifyTickets from "./components/ModifyTickets.jsx";


function App() {

  return (
      <AppProvider>
        <Routes>
          {/* LANDING */}
          <Route path="/" element={<Layout><Home /></Layout>} />     
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path='/register' element={<Layout><SignUp /></Layout>} />  
          {/* REGULAR USER ROUTES */}       
          <Route path="/my-home" element={<LayoutSigned><Home /></LayoutSigned>} />   
          <Route path="/my-dashboard" element={<LayoutSigned><Dashboard /></LayoutSigned>} />     
          <Route path="/confirmation" element={<Layout><RegisteredConfirmation/></Layout>} />
          <Route path="/events" element={<LayoutSigned><Events /></LayoutSigned>} />  
          <Route path="/event-detail/:id" element={<LayoutSigned><EventsDetail /></LayoutSigned>} />             
          <Route path="/tickets" element={<LayoutSigned><Tickets /></LayoutSigned>} />            
          <Route path="/profile" element={<LayoutSigned><ProfileUser /></LayoutSigned>} /> 
          <Route path="/purchase-tickets/:id" element={<LayoutSigned><PurchaseTicket /></LayoutSigned>}/>          
          {/* SUPER USER ROUTES */}
          <Route path="/superDashboard" element={<LayoutSuperUser><DashboardSuper /></LayoutSuperUser>} />
          <Route path="/manageusers"    element={<LayoutSuperUser><ManageUsers /></LayoutSuperUser>} />
          <Route path="/add-User" element={<LayoutSuperUser><AddUser /></LayoutSuperUser>} />
          <Route path="/modify-User/:id" element={<LayoutSuperUser><ModifyUser /></LayoutSuperUser>} />
          <Route path="/manage-tickets" element={<LayoutSuperUser><ManageTickets /></LayoutSuperUser>}/>
          <Route path="/addTickets"  element={<LayoutSuperUser><AddTickets /></LayoutSuperUser>} />          
          <Route path="/manage-events"  element={<LayoutSuperUser><ManageEvents /></LayoutSuperUser>} />
          <Route path="/my-addEvents"   element={<LayoutSuperUser><AddEvent /></LayoutSuperUser>} />
          <Route path="/modify-event/:id"   element={<LayoutSuperUser><ModifyEvent /></LayoutSuperUser>} />
          <Route path="/modify-ticket/:id" element={<LayoutSuperUser><ModifyTickets /></LayoutSuperUser>}/>
          <Route path="/profileSuper"   element={<LayoutSuperUser><ProfileSuperUser /></LayoutSuperUser>} />          
        </Routes>
      </AppProvider>
    
  )
}

export default App
