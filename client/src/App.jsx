import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Layout from './components/Layout'
import Login from './components/Login'
import Events from './components/Events'
import Dashboard from "./components/Dashboard"
import SignUp from "./components/SignUp";
import AddTickets from "./components/AddTickets";
import Tickets from "./components/Tickets";
import AddEvent from "./components/AddEvent";
import ManageEvents from "./components/admin/ManageEvents";
import ManageUsers from "./components/admin/ManageUsers";
import ProfileUser from "./components/ProfileUser.jsx";
import ProfileSuperUser from "./components/admin/ProfileSuperUser.jsx";
import DashboardSuper from "./components/admin/DashboardSuper";
import EventsDetail from "./components/EventsDetail";
import RegisteredConfirmation from "./components/RegisteredConfirmation.jsx";
import { AppProvider } from "./context/AppProvider.jsx";
import PurchaseTicket from "./components/PurchaseTickets";
import ManageTickets from "./components/admin/ManageTickets.jsx";
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
          <Route path="/my-home" element={<Layout><Home /></Layout>} />   
          <Route path="/my-dashboard" element={<Layout><Dashboard /></Layout>} />     
          <Route path="/confirmation" element={<Layout><RegisteredConfirmation/></Layout>} />
          <Route path="/events" element={<Layout><Events /></Layout>} />  
          <Route path="/event-detail/:id" element={<Layout><EventsDetail /></Layout>} />             
          <Route path="/tickets" element={<Layout><Tickets /></Layout>} />            
          <Route path="/profile" element={<Layout><ProfileUser /></Layout>} /> 
          <Route path="/purchase-tickets/:id" element={<Layout><PurchaseTicket /></Layout>}/>          
          {/* SUPER USER ROUTES */}
          <Route path="/superDashboard" element={<Layout><DashboardSuper /></Layout>} />
          <Route path="/manageusers"    element={<Layout><ManageUsers /></Layout>} />
          <Route path="/add-User" element={<Layout><AddUser /></Layout>} />
          <Route path="/modify-User/:id" element={<Layout><ModifyUser /></Layout>} />
          <Route path="/manage-tickets" element={<Layout><ManageTickets /></Layout>}/>
          <Route path="/addTickets"  element={<Layout><AddTickets /></Layout>} />          
          <Route path="/manage-events"  element={<Layout><ManageEvents /></Layout>} />
          <Route path="/my-addEvents"   element={<Layout><AddEvent /></Layout>} />
          <Route path="/modify-event/:id"   element={<Layout><ModifyEvent /></Layout>} />
          <Route path="/modify-ticket/:id" element={<Layout><ModifyTickets /></Layout>}/>
          <Route path="/profileSuper"   element={<Layout><ProfileSuperUser /></Layout>} />          
        </Routes>
      </AppProvider>
    
  )
}

export default App
