import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto p-6">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;