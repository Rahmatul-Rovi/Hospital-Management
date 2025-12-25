import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-[#1d232a] rounded-2xl border border-gray-700 shadow-xl">
            <div className="flex flex-col items-center gap-6">
                {/* User Profile Picture */}
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="User" />
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome, {user?.displayName || "Guest"}!</h2>
                    <p className="text-gray-400 italic">Manage your healthcare appointments and profile here.</p>
                </div>

                {/* User Stats/Info Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-6">
                    <div className="bg-[#2a323c] p-4 rounded-xl border border-gray-600">
                        <p className="text-blue-400 text-sm font-bold uppercase">Email Address</p>
                        <p className="text-white mt-1">{user?.email}</p>
                    </div>
                    <div className="bg-[#2a323c] p-4 rounded-xl border border-gray-600">
                        <p className="text-blue-400 text-sm font-bold uppercase">Account Status</p>
                        <p className="text-green-400 mt-1 font-semibold">Verified Patient</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;