import { Link } from "react-router-dom";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log("User Data:", { name, email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <div className="card w-full max-w-md shadow-2xl bg-[#1d232a] p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-[#00d1b2] mb-8 italic">Create Account</h2>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          {/* Full Name Field */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold ml-1">Full Name</label>
            <input 
              name="name" 
              type="text" 
              placeholder="Enter your name" 
              className="input input-bordered w-full bg-[#2a323c] focus:border-[#00d1b2]" 
              required 
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold ml-1">Email</label>
            <input 
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              className="input input-bordered w-full bg-[#2a323c] focus:border-[#00d1b2]" 
              required 
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold ml-1">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              className="input input-bordered w-full bg-[#2a323c] focus:border-[#00d1b2]" 
              required 
            />
          </div>

          <button type="submit" className="btn bg-[#00d1b2] hover:bg-[#00b89d] border-none text-black font-bold w-full mt-4 rounded-full text-lg shadow-lg">
            Register Now
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already have an account? <Link to="/login" className="text-[#00d1b2] font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;