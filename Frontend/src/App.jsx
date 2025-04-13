// import "./assets/css/adminlte.css"
// import "./assets/css/adminlte.min.css"
import { UserSidebar } from './components/layouts/UserSidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import { LogIn } from './components/common/LogIn'
import { SignUp } from './components/common/SignUp'
import { UserDashboard } from './components/user/UserDashboard'
import { UserProfile } from './components/user/UserProfile'
import { AdminSidebar } from './components/layouts/AdminSidebar'
import { AdminDashboard } from './components/admin/AdminDashboard'
// import { AddGarage } from './components/admin/AddGarage'
import { GarageOwnerSidebar } from './components/layouts/GarageOwnerSidebar'
import { GarageOwnerDashboard } from './components/garageowner/GarageOwnerDashboard'
import axios from 'axios'
import { useEffect } from 'react'
import { AddGarage } from './components/garageowner/AddGarage' 
import PrivateRoutes from './hooks/PrivateRoutes'
import LandingPage from './components/common/LandingPage'
import { AddGarage2 } from './components/garageowner/AddGarage2'
import { ViewMyGarages } from './components/garageowner/ViewMyGarages'
import { UpdateMyGarage } from './components/garageowner/UpdateMyGarage'
import { GarageList } from './components/admin/GarageList'
import { Services } from './components/admin/Services'
import { AddServices } from './components/garageowner/AddServices'
import { ResetPassword } from './components/common/ResetPassword'
import { AvailableServices } from './components/garageowner/AvailableServices'
import { UpdateServices } from './components/garageowner/UpdateServices'
import { OurServices } from './components/user/OurServices'
import { UserProvider } from './components/common/UserContext'
import { AboutUs } from './components/common/AboutUs'
import { GarageOwnerProfile } from './components/garageowner/GarageOwnerProfile'
import { ForgotPassword } from './components/common/ForgotPassword'
import { ContactUs } from './components/common/ContactUs'
import ScrollToTop from './components/common/ScrollToTop'
import { ComServices } from './components/common/ComServices'
import { AddVehicle } from './components/user/AddVehicle'
import { ViewMyVehicle } from './components/user/ViewMyVehicle'
import { BookAppointment } from './components/user/BookAppointment'
import { MyAppointments } from './components/user/MyAppointments'
import { Appointments } from './components/garageowner/Appointments'
import { AdminProfile } from './components/admin/AdminProfile'
import { OurGarages } from './components/user/OurGarages'
import { GarageDetails } from './components/user/GarageDetails'
import { GarageServices } from './components/garageowner/GarageServices'
import { Unauthorized } from './components/common/Unauthorized'
import ProtectedRoute from './hooks/ProtectedRoute'
import Invoice from './components/user/Invoice'
import UserPayments from './components/user/UserPayments'
import UsersPayments from './components/admin/UsersPayments'
import { GarageUserPayments } from './components/garageowner/GarageUserPayments'
import { RegisteredUsers } from './components/admin/RegisteredUsers'
import { AddReview } from './components/user/AddReview'





function App() { 

    axios.defaults.baseURL = "http://localhost:3000";

    const location = useLocation();

    useEffect(() => {
      if(location.pathname === "/login" || location.pathname === "/signup"){
        document.body.className = ""; //Remove the anwanted class for login and signup
      } else {
        document.body.className = "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded"; 
      }
      
    }, [location.pathname])
    


  return (
    
      
        <div className={ location.pathname === "/login" || location.pathname === "/signup"?"": "app-wrapper"}>
           <ScrollToTop/>
           <UserProvider>
          <Routes>
            <Route path='/login' element={<LogIn/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/resetpassword/:token' element={<ResetPassword/>}></Route>
            <Route path='/aboutus' element={<AboutUs/>}></Route>
            <Route path='/contactus' element={<ContactUs/>}></Route>
            <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
            <Route path='/services' element={<ComServices/>}></Route>
            <Route path='/unauthorized' element={<Unauthorized/>}></Route>
            

            
            <Route path="" element={<PrivateRoutes/>}>


            <Route path='/admin' element={<ProtectedRoute allowedRoles={["admin"]}>
            <AdminSidebar/></ProtectedRoute>}>
              <Route path='' element={<AdminDashboard/>}></Route>
              <Route path='garagelist' element={<GarageList/>}></Route>
              <Route path='services' element={<Services/>}></Route>
              <Route path='profile' element={<AdminProfile/>}></Route>
              <Route path='userspayments' element={<UsersPayments/>}></Route>
              <Route path='registeredusers' element={<RegisteredUsers/>}></Route>
            </Route>


            <Route path='/garageowner' element={<ProtectedRoute allowedRoles={['garageowner']}><GarageOwnerSidebar/></ProtectedRoute>}>
              <Route path='' element={<GarageOwnerDashboard/>}></Route>
              {/* <Route path='addgarage' element={<AddGarage/>}></Route> */}
              <Route path='addgarage' element={<AddGarage2/>}></Route>
              <Route path='mygarages' element={<ViewMyGarages/>}></Route>
              <Route path='updategarage/:id' element={<UpdateMyGarage/>} ></Route>
              <Route path='addservices' element={<AddServices/>}></Route>
              <Route path='availableservices' element={<AvailableServices/>}></Route>
              <Route path='updateservice/:id' element={<UpdateServices/>}></Route>
              <Route path='profile' element={<GarageOwnerProfile/>}></Route>
              <Route path='appointments' element={<Appointments/>}></Route>
              <Route path='garageservices' element={<GarageServices/>}></Route>
              <Route path='garageuserpayments' element={<GarageUserPayments/>}></Route>
            </Route>
  
  
            <Route path='/user' element={<ProtectedRoute allowedRoles={['user']}><UserSidebar/></ProtectedRoute>}>
              <Route path='' element={<UserDashboard/>}></Route>
              <Route path='profile' element={<UserProfile/>}></Route>
              <Route path='services' element={<OurServices/>}></Route>
              <Route path='addvehicle' element={<AddVehicle/>}></Route>
              <Route path='myvehicles' element={<ViewMyVehicle/>}></Route>
              <Route path='bookappointment' element={<BookAppointment/>}></Route>
              <Route path='myappointments' element={<MyAppointments/>}></Route>
              <Route path='garages' element={<OurGarages/>}></Route>
              <Route path='garagedetail/:id' element={<GarageDetails/>}></Route>
              <Route path='invoice/:id' element={<Invoice/>}></Route>
              <Route path='userpayments' element={<UserPayments/>}></Route>
              <Route path='addreview/:garageId' element={<AddReview/>}></Route>
            </Route>


            </Route>

          </Routes>
            </UserProvider>
            

        </div>
    
  )
}

export default App
