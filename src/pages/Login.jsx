import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate, useLocation } from "react-router-dom"; 

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); 

  const from = location.state || "/";
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then((result) => {
        console.log("Logged In:", result.user);
        navigate(from, { replace: true }); 
      })
      .catch((error) => {
        alert("Invalid email or password!");
        console.error(error.message);
      });
  };

  // Google Login Handler
  const handleGoogleSignIn = () => {
    googleLogin()
      .then((result) => {
        console.log("Google Login Success:", result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <div className="card w-full max-w-sm shadow-2xl bg-[#1d232a] p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-8 italic">Welcome Back</h2>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold ml-1 text-sm md:text-base">Email Address</label>
            <input 
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              className="input input-bordered w-full bg-[#2a323c] focus:border-blue-500 transition-all text-white" 
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold ml-1 text-sm md:text-base">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              className="input input-bordered w-full bg-[#2a323c] focus:border-blue-500 transition-all text-white" 
              required 
            />
          </div>

          <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 border-none rounded-xl text-white font-bold w-full mt-4 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
            Login
          </button>
        </form>

        <div className="divider text-gray-500 my-6 text-xs uppercase font-bold">OR</div>

        <button 
          onClick={handleGoogleSignIn}
          type="button" 
          className="btn btn-outline border-gray-600 text-white w-full rounded-full flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-300"
        >
          <img 
            className="w-5 h-5" 
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" 
            alt="Google Logo" 
          />
          <span className="font-semibold">Continue with Google</span>
        </button>

        <p className="text-center mt-6 text-gray-400">
          New here? <Link to="/register" className="text-blue-500 font-bold hover:underline ml-1">Register Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;