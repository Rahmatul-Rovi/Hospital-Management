import { Link } from "react-router-dom";

const Navbar = () => {
  const navLinks = (
    <>
      <li><Link className="hover:text-yellow-400" to="/">Home</Link></li>
      <li><Link className="hover:text-yellow-400" to="/appointments">Find Doctors</Link></li>
      <li><Link className="hover:text-yellow-400" to="/dashboard">Dashboard</Link></li>
    </>
  );

  return (
    <div className="navbar bg-blue-700 text-white shadow-xl sticky top-0 z-50 px-4 md:px-12">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-800 rounded-box w-52 text-white">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="text-xl md:text-2xl font-extrabold tracking-tight">
          Care<span className="text-yellow-400">Plus</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold gap-2">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-2 md:gap-4">
        {/* Register Button - Halka and Clean Design */}
       <Link 
    to="/register" 
    className="btn btn-sm md:btn-md btn-outline border-white text-white hover:bg-white hover:text-blue-700 font-bold px-6 shadow-md transition-all duration-300 transform hover:scale-105 rounded-full hidden sm:flex items-center gap-2"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
    </svg>
    Register
  </Link>

        {/* Login Button - Standout Design */}
        <Link 
          to="/login" 
          className="btn btn-sm md:btn-md bg-yellow-400 hover:bg-yellow-500 border-none text-blue-900 font-bold px-6 shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;