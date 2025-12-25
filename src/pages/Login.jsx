import { Link } from "react-router-dom";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log("Login Attempt:", email, password);
    // Pore ekhane Firebase use korbo
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <div className="card w-full max-w-sm shadow-2xl bg-[#1d232a] p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-8 italic">Welcome Back</h2>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold ml-1 text-sm md:text-base">Email Address</label>
            <input 
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              className="input input-bordered w-full bg-[#2a323c] focus:border-blue-500 transition-all" 
              required 
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold ml-1 text-sm md:text-base">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              className="input input-bordered w-full bg-[#2a323c] focus:border-blue-500 transition-all" 
              required 
            />
          </div>

          {/* Login Button - Matching the theme */}
          <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 border-none text-white font-bold w-full mt-4 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          New here? <Link to="/register" className="text-blue-500 font-bold hover:underline">Register Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;