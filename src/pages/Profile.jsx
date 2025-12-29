import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2"; 

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile(user, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully!",
          icon: "success",
          confirmButtonColor: "#2563eb",
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-blue-50">
        
        {/* Left Side: Display */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 p-12 text-white flex flex-col items-center justify-center text-center">
          <div className="avatar mb-6">
            <div className="w-32 h-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-4 shadow-2xl">
              <img src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="profile" />
            </div>
          </div>
          <h2 className="text-3xl font-bold">{user?.displayName || "User Name"}</h2>
          <p className="opacity-80 mt-2">{user?.email}</p>
          <div className="mt-8 px-6 py-2 bg-white/20 rounded-full text-sm font-semibold tracking-wide">
            Verified Patient
          </div>
        </div>

        {/* Right Side: Update Form */}
        <div className="md:w-1/2 p-10 md:p-16">
          <h3 className="text-2xl font-black text-gray-800 mb-8">Edit Your Profile</h3>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-bold text-gray-600">Full Name</span></label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-blue-500 transition-all" 
                placeholder="Enter your name"
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-bold text-gray-600">Photo URL</span></label>
              <input 
                type="text" 
                value={photo} 
                onChange={(e) => setPhoto(e.target.value)}
                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-blue-500 transition-all" 
                placeholder="Image link here"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full rounded-xl font-bold text-lg shadow-lg border-none hover:scale-[1.02] transition-transform">
              Save Changes
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;