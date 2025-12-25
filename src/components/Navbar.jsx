import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); 

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/appointments">Find Doctors</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-blue-600 text-white px-4 md:px-8 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-700 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-bold italic">CarePlus</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-semibold">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-4">
       
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold leading-none">{user.displayName || "User"}</p>
              <p className="text-[10px] opacity-80">{user.email}</p>
            </div>
            
            {/* show User Profile Picture  */}
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="profile" />
              </div>
            </div>

           <button 
  onClick={handleLogOut} 
  className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 border border-red-500/50 hover:border-red-500 text-red-500 hover:text-white px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 shadow-md hover:shadow-red-500/20 active:scale-95"
>
  {/* Logout Icon */}
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={2} 
    stroke="currentColor" 
    className="w-4 h-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
  Logout
</button>
          </div>
        ) : (
          /* Show the user mail  */
          <Link to="/login" className="btn bg-white text-blue-600 border-none hover:bg-gray-200 rounded-full px-6 font-bold">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;