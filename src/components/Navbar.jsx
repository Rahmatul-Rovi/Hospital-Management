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
    <div className="navbar bg-blue-600 text-white px-4 md:px-8 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-700 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-bold italic tracking-wider">CarePlus</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-semibold">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold leading-none">{user.displayName || "User"}</p>
              <p className="text-[10px] opacity-80">{user.email}</p>
            </div>

            {/* --- Updated Avatar with Dropdown --- */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring ring-white ring-offset-2">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="profile" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-white text-blue-900 rounded-box w-52 border border-gray-200">
                <li className="font-bold p-2 text-blue-600 border-b border-gray-100">{user.displayName || "User Profile"}</li>
                <li><Link to="/profile" className="hover:bg-blue-50 py-3">My Profile</Link></li>
                <li><Link to="/dashboard" className="hover:bg-blue-50 py-3">Dashboard</Link></li>
                <li className="mt-2 border-t border-gray-100">
                  <button onClick={handleLogOut} className="text-red-500 font-bold hover:bg-red-50">Logout</button>
                </li>
              </ul>
            </div>
            {/* ------------------------------------- */}

          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn btn-ghost text-white border-white hover:bg-white hover:text-blue-600 rounded-full px-5 btn-sm font-bold">
              Login
            </Link>
            <Link to="/register" className="btn bg-white text-blue-600 border-none hover:bg-yellow-400 hover:text-black rounded-full px-5 btn-sm font-bold shadow-md">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;