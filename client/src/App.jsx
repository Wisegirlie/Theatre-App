import { Routes, Route } from "react-router-dom";

// Context
import { AppProvider } from "./context/AppProvider.jsx";
// Login and SignUp
import SignUp from "./components/login/SignUp";
import Login from './components/login/Login'
// Layout and Shared
import Layout from './components/layout/Layout.jsx'
import Home from "./components/Home"
import ProfileUser from "./components/ProfileUser.jsx";
// --- Events ---
import EventsDetail from "./components/EventsDetail";
// --- Tickets ---
import Tickets from "./components/Tickets";
import TicketPurchase from "./components/ticketPurchase";

// ===================================
//              ADMIN  
// ===================================

// ---- Auth ----
import VerifyAuthAdmin from './components/admin/verifyAuthAdmin.jsx';
import VerifyAuthUser from './components/admin/verifyAuthUser.jsx';
// ---- Events ----
import ModifyEvent from "./components/admin/EventModify.jsx";
import ManageEvents from "./components/admin/EventsManage";
import AddEvent from "./components/admin/EventAdd";
// ---- Tickets ----
import ManageTickets from "./components/admin/TicketsManage.jsx";
import ModifyTickets from "./components/admin/TicketsModify.jsx";
import AddTickets from "./components/admin/TicketsAdd.jsx";
// ---- Users ----
import ManageUsers from "./components/admin/UsersManage.jsx";
import ModifyUser from './components/admin/UserModify.jsx'
import AddUser from "./components/admin/userAdd.jsx"



function App() {

  return (
      <AppProvider>
        <Routes>
          {/* ==========  Root / Shared  =========== */}
          <Route path="/" element={<Layout><Home /></Layout>} />     
          {/* ==========  Login / Register  =========== */}          
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path='/register' element={<Layout><SignUp /></Layout>} />  
          {/* ==========  Regular User Routes  =========== */}  
          <Route path="/my-home" element={<Layout><Home /></Layout>} />  
          <Route path="/events" element={<Layout><Home /></Layout>} />  
          <Route path="/event-detail/:id" element={<Layout><EventsDetail /></Layout>} />             
          <Route path="/my-tickets" element={<Layout><VerifyAuthUser><Tickets /></VerifyAuthUser></Layout>} />            
          <Route path="/purchase-tickets/:id" element={<Layout><VerifyAuthUser><TicketPurchase /></VerifyAuthUser></Layout>}/>  
          {/* =======  User profile  ======= */}  
          <Route path="/profile" element={<Layout><VerifyAuthUser><ProfileUser /></VerifyAuthUser></Layout>} /> 
                  
          {/* ===================================
                        ADMIN ROUTES
              =================================== */}

          {/* =======  Admin Events Module  ======= */}   
          <Route path="/manage-events"  element={<Layout><VerifyAuthAdmin><ManageEvents /></VerifyAuthAdmin></Layout>} />
          <Route path="/add-event"   element={<Layout><VerifyAuthAdmin><AddEvent /></VerifyAuthAdmin></Layout>} />
          <Route path="/modify-event/:id"   element={<Layout><VerifyAuthAdmin><ModifyEvent /></VerifyAuthAdmin></Layout>} />       
          {/* =======  Admin User Module  ======= */}  
          <Route path="/manage-users"    element={<Layout><VerifyAuthAdmin><ManageUsers /></VerifyAuthAdmin></Layout>} />
          <Route path="/add-User" element={<Layout><VerifyAuthAdmin><AddUser /></VerifyAuthAdmin></Layout>} />
          <Route path="/modify-User/:id" element={<Layout><VerifyAuthAdmin><ModifyUser /></VerifyAuthAdmin></Layout>} />
          {/* =======  Admin Ticket Module  ======= */}  
          <Route path="/manage-tickets" element={<Layout><VerifyAuthAdmin><ManageTickets /></VerifyAuthAdmin></Layout>}/>
          <Route path="/modify-ticket/:id" element={<Layout><VerifyAuthAdmin><ModifyTickets /></VerifyAuthAdmin></Layout>}/>
          <Route path="/add-ticket"  element={<Layout><VerifyAuthAdmin><AddTickets /></VerifyAuthAdmin></Layout>} />     
          {/* =======  Admin Profile  ======= */}  
          <Route path="/profile"   element={<Layout><VerifyAuthAdmin><ProfileUser /></VerifyAuthAdmin></Layout>} /> 
        </Routes>
      </AppProvider>
    
  )
}

export default App
