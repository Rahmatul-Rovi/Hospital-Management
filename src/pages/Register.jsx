import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then(() => {
        alert("Registration Successful!");
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const handleGoogleSignIn = () => {
    googleLogin()
      .then(() => navigate("/"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <div className="card w-full max-w-md shadow-2xl bg-[#1d232a] p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-[#00d1b2] mb-8 italic">Create Account</h2>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold ml-1">Full Name</label>
            <input name="name" type="text" placeholder="Enter your name" className="input input-bordered w-full bg-[#2a323c] focus:border-[#00d1b2]" required />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold ml-1">Email</label>
            <input name="email" type="email" placeholder="Enter your email" className="input input-bordered w-full bg-[#2a323c] focus:border-[#00d1b2]" required />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold ml-1">Password</label>
            <input name="password" type="password" placeholder="Min 6 characters" className="input input-bordered w-full bg-[#2a323c] focus:border-[#00d1b2]" required />
          </div>

          <button type="submit" className="btn bg-[#00d1b2] hover:bg-[#00b89d] border-none rounded-xl text-black font-bold w-full mt-4 rounded-full text-lg shadow-lg transition-transform hover:scale-105">
            Register Now
          </button>
        </form>

        <div className="divider text-gray-500 my-6 text-xs uppercase font-bold">OR</div>

        {/* Google Button with Fixed Icon */}
        <button 
          onClick={handleGoogleSignIn}
          type="button" 
          className="btn btn-outline border-gray-600 text-white w-full rounded-full flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-300"
        >
          <img 
            className="w-5 h-5 rounded-xl" 
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" 
            alt="Google Logo" 
          />
          <span className="font-semibold ">Continue with Google</span>
        </button>

        <p className="text-center mt-6 text-gray-400">
          Already have an account? <Link to="/login" className="text-[#00d1b2] font-bold hover:underline ml-1">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;