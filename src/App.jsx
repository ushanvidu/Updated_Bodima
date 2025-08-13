import './App.css'
import Navbar from "./Navbar/Navbar.jsx"
import Body from "./Body/Body.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./Signin/Signin.jsx";
import Rules from "./Rules/Rules.jsx";
import Contact from "./Contact /Contact.jsx";
import Rooms from "./Rooms/Rooms.jsx";




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
      </Routes>
      </div>
      </Router>





    </div>





    </>
  )
}

export default App
