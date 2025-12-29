import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar></Navbar>
      
      <div className="container mx-auto p-6">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;