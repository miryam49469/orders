import { BrowserRouter, Route, Routes } from "react-router-dom"
import PendingOrders from "../pages/pendingOrders"
import UsersManagement from "../pages/usersManagement";
import CatalogManager from "../pages/catalogManager";
import Dashboard from "../pages/dashboard";
import LandingPage from "../pages/landingPage";
import Login from "../pages/login";
import SignUp from "../pages/SignUP/SIgnUp";
import NewOrder from "../pages/NewOrder/newOrder";

const Routing: React.FC = () => {



return (
<>
 <BrowserRouter>
   <Routes>
       <Route  path ='/' element={<Login/>}> </Route> 
       <Route  path ='/newOrder' element={<NewOrder/>}> </Route>
       <Route  path ='/landingPage' element={<LandingPage/>}></Route>
       <Route  path ='/pendingOrders' element={<PendingOrders />}> </Route>
       <Route  path ='/usersManagement' element={<UsersManagement/>}> </Route>
       <Route  path ='/CatalogManager' element={<CatalogManager/>}> </Route>
       <Route  path ='/Dashboard' element={<Dashboard/>}> </Route>
       
       <Route  path ='/pendingOrders' element={<PendingOrders/>}> </Route>

      <Route  path ='/signUp' element={<SignUp/>}> </Route>
    
   </Routes>
 </BrowserRouter>
</>
)
}
export default Routing;