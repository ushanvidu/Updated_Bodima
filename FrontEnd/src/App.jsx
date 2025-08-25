
import Navbar from "./Navbar/Navbar.jsx"
import Body from "./Body/Body.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./Signin/Signin.jsx";
import Rules from "./Rules/Rules.jsx";
import Contact from "./Contact /Contact.jsx";
import Rooms from "./Rooms/Rooms.jsx";
import User from "./User/User.jsx";
import Admin from "./Admin/Admin.jsx";




function App() {


  return (
      <>
    <div className="body">
      <Router>
    <Navbar/>



    <div className="cointainer">
      <Routes>
        <Route path="/" element={<Body/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/rules" element={<Rules/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/rooms" element={<Rooms/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/admin" element={<Admin/>}></Route>
      </Routes>
      </div>
      </Router>





    </div>





    </>
  )
}

export default App
