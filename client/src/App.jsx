import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import SignUp from "./pages/SignUp/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CheckBMI from "./pages/CheckBMI/CheckBMI";
import DashProfile from "./pages/DashProfile/DashProfile";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import PrivateManger from "./pages/PrivateManager/PrivateManger";

import Feed from "./pages/Feedback/Feedback";
import Getfeed from "./pages/GetFeedback/GetFeedback";
import Feedup from "./pages/FeedUpdata/FeedUpdata";
import Form from "./pages/Form/Form";
import Notifi from "./pages/Notification/Notification";
import ViewNotifi from "./pages/ViewNotifi/ViewNotifi";
import Dashbord from "./pages/Dashbord/Dashbord";
import Viewuser from "./pages/ViewUser/ViewUser";
import Viewuserall from "./pages/Viewallfeedback/Viewallfeedback";


import Home1 from "./pages/Home1";



import CreatePost from "./pages/ItmeCreate";
import ItemDetails from "./pages/ItemDetails";
import Order from "./pages/Order";
import Updateitem from "./pages/Updateitem";
import ViewItems from "./pages/ViewItems";
import Profil from "./components/Profile";
import Form1 from "./pages/Form";



import Register from "./pages/Register/SignUp";

import ViewEmploye from "./pages/ViewEmployee/ViewEmploye";
import UdpdateEmloye from "./pages/UpdateEmployee/updateEmploye";
import Attend from "./pages/Attend/Attend";
import Absent from "./pages/LeaveManage/Absent";
import Emp from "./pages/Employee/Employee";
import View from "./pages/EmployeAbsview/EmployeAbsview";
import Dash from "./components/DashProfile";



import AddPackage from "./pages/AddPackage/AddPackage";
import AddProPackage from "./pages/AddProPackage/AddProPackage";
import Addrequest from "./pages/Addrequest/Addrequest"
import Addtask from "./pages/Addtask/Addtask";
import Displaytask from "./pages/Displaytask/Displaytask";
import DisplayRequest from "./pages/Displayrequest/displayrequest";
import DisplayAppointment from "./pages/DisplayAppointment/DisplayAppointment";
import DisplayRequestsh from "./pages/DisplaySchedule/DisplaySchedule";
import RequestDisplay from "./pages/RequestDisplay/RequestDisplay";

import TrainerRequest from "./pages/TrainerRequest/TrainerRequest";
import Workoutpage from "./pages/Workoutpages/Workoutpage";  

import Addworkoutplan from "./pages/oneday/Addworkoutplan";
import TwodayWorkout from "./pages/TwodayWorkout/TwodayWorkout";
import Threedayworkoutplan from "./pages/Threedayworkout/Threedayworkoutplan";
import UpdateWorkout from "./pages/UpdateWorkoutplan/Updateworkout";
import SheduleRequest from "./pages/SheduleRequest/SheduleRequest"; 
import Display from "./pages/Trainerprofile/Trainerpro"
import SelectPackage from "./pages/SelectPackage/SelectPackage";
import UserProPackage from "./pages/UserProPackage/UserProPackage";
import UserPackage from "./pages/UserPackage/UserPackage";


import AddAppointment from "./pages/AddAppointment/AddAppointment";
import OneUpdate from "./pages/OnedayUpdate/OnedayUpdate";
import TwoUpdate from "./pages/TwodayUpdate/TwodayUpdate";
import ThreeUpdate from "./pages/ThreedayUpdate/ThreedayUpdate";
import DisplayReportT from "./pages/DisplayReportT/DisplayReportT";

import UpdateAppointment from "./pages/UpdateAppointment/UpdateAppointment";
import UpdatePackage from "./pages/UpdatePackage/UpdatePackage";
import UpdateProPackage from "./pages/UpdateProPackage/UpdateProPackage";
import UpdateRequest from "./pages/Updaterequest/Updaterequest";

import Updatetask from "./pages/UpdateTask/UpdateTask";
import UserDash from "./pages/UserDash/UserDash";
import ViewOrders from "./pages/ViewOrders/ViewOrders";
import ViewPackage from "./pages/viewPackage/ViewPackage";
import ViewProPackage from "./pages/ViewProPackage/ViewProPackage";
import ViewProOrders from "./pages/ViewProOrders/ViewProOrders";
import AddSchedule from "./pages/AddSchedule/AddSchedule";
import DisScheTrainer from "./pages/DisScheTrainer/DisScheTrainer";

import Report from "./pages/TrainerReport/TrainersReport";



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashbord" element={<Dashbord/>} />
        <Route path="/emp" element={<Emp />} />
        <Route path="/empview" element={<View />} />
        <Route path='/addSchedule' element={<AddSchedule/>}/>
        <Route path='/Report' element={<Report/>}/>

        <Route element={<PrivateRoute />}>
         
        <Route path="/feed" element={<Feed/>} />
        <Route path="/Feedpage" element={<Getfeed />} />
        <Route path="/update-warehous/:feedId" element={<Feedup />} />
        <Route path="/form" element={<Form/>} />
        <Route path="/viewnotifi" element={<ViewNotifi/>} />
        <Route path="/checkbmi" element={<CheckBMI/>} />
        <Route path="/dashprofil" element={<DashProfile/>} />
        <Route path='/Trainers' element={<Display/>}/>
        <Route path='/packages' element={<SelectPackage/>}/>
        <Route path='/viewpkg' element={<ViewPackage />} />
        <Route path='/promotion' element={<UserProPackage/>}/>
        <Route path='/standard' element={<UserPackage/>}/>
        <Route path='/order' element={<ViewOrders/>}/>
        <Route path='/proorder' element={<ViewProOrders/>}/>
        <Route path='/addapoint' element={<AddAppointment />}/>


        </Route>


        <Route element={<PrivateManger />}>
      
        <Route path="/notification" element={<Notifi/>} />
        <Route path="/viewuser" element={<Viewuser/>} />
        <Route path="/viewuserall" element={<Viewuserall/>} />
        <Route path='/add' element={<AddPackage />} />
        <Route path='/addpro' element={<AddProPackage />} />
        <Route path='/req' element={<Addrequest />}/>
        <Route path='/task' element={<Addtask />}/>
        <Route path='/viewtask' element={<Displaytask/>}/>
        <Route path='/viewreq' element={<DisplayRequest />}/>
        <Route path='/appoint' element={<DisplayAppointment />}/>
        <Route path='/scheduledisplay' element={<DisplayRequestsh/>}/>
        <Route path='/TrainerRequest' element={<TrainerRequest/>}/>
        <Route path='/wpage' element={<Workoutpage/>}/>
        <Route path='/addworkout' element={<Addworkoutplan/>}/>
        <Route path='/threeadd' element={<Threedayworkoutplan/>}/>
        <Route path='/UpdateWorkout' element={<UpdateWorkout/>}/>
        <Route path='/Shedule' element={<SheduleRequest/>}/> 
        <Route path='/Trainers' element={<Display/>}/>
        <Route path='/packages' element={<SelectPackage/>}/>
        <Route path='/promotion' element={<UserProPackage/>}/>
        <Route path='/standard' element={<UserPackage/>}/>
        <Route path='/addapoint' element={<AddAppointment />}/>
        <Route path='/update/oneday/:id' element={<OneUpdate/>}/>
        <Route path='/update/twoday/:id' element={<TwoUpdate/>}/>
        <Route path='/update/threeday/:id' element={<ThreeUpdate/>}/>
        <Route path='/update/:id' element={<UpdateAppointment />}/> 
        <Route path='/updatepkg/:id' element={<UpdatePackage />} />
        <Route path='/updatepropkg/:id' element={<UpdateProPackage />} />
        <Route path='/updatereq/:id' element={<UpdateRequest/>}/>  
        <Route path='/updatetsk/:id' element={<Updatetask/>}/>
        <Route path='/user' element={<UserDash />} />
        <Route path='/order' element={<ViewOrders/>}/>
        <Route path='/viewpkg' element={<ViewPackage />} />
        <Route path='/viewpro' element={<ViewProPackage/>} />
        <Route path='/proorder' element={<ViewProOrders/>}/>
        <Route path='/twoadd' element={<TwodayWorkout/>}/>
        <Route path="/create-post" element={<CreatePost />} /> 
        <Route path="/view" element={<ViewItems />} />
        <Route path="/updateitem/:itemId" element={<Updateitem />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/addForm" element={<Form1 />} />
        <Route path="/viewemp" element={<ViewEmploye />} />
        <Route path="/update-emp/:EploId" element={<UdpdateEmloye />} />
        <Route path="/absent" element={<Absent />} />
        <Route path="/profile" element={<Dash />} />
        <Route path="/emp" element={<Emp />} />
        <Route path="/empview" element={<View />} />
        <Route path="/requestdisplay" element={<RequestDisplay />} />
        <Route path="/displaySchedule" element={<DisScheTrainer />} />
        <Route path="/DisplayReportT" element={<DisplayReportT />} />

        
        </Route>
        
        
      </Routes>
      



      {/* items */}
     
      <Routes>
        <Route path="/h" element={<Home1 />} />
       
        <Route path="/item/:itemId" element={<ItemDetails />} />

        <Route element={<PrivateRoute />}>
          
          <Route path="/order1" element={<Order />} />
          

        </Route>

   
      </Routes>
       
        {/* employee */}

    
      <Routes>
        <Route path="/register" element={<Register />} />
       
        <Route path="/attend" element={<Attend />} />
       


        <Route element={<PrivateRoute />}>
       
         
        </Route>

  
      </Routes>


      <Footer />




    </BrowserRouter>
  );
}
