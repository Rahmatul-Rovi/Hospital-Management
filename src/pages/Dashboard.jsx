import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { db } from "../firebase/firebase.config";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [myAppointments, setMyAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Delete (Cancel) Function ---
    const handleDelete = async (id) => {
        const proceed = window.confirm("Are you sure you want to cancel this appointment?");
        if (proceed) {
            try {
                // 1. Firebase Firestore theke delete hobe
                await deleteDoc(doc(db, "appointments", id));
                
                // 2. UI thekeo remove hobe (Refresh charai)
                const remaining = myAppointments.filter(app => app.id !== id);
                setMyAppointments(remaining);
                
                alert("Appointment Cancelled Successfully!");
            } catch (error) {
                console.error("Error deleting: ", error);
                alert("Could not cancel appointment. Try again.");
            }
        }
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            if (user?.email) {
                try {
                    const q = query(
                        collection(db, "appointments"),
                        where("patientEmail", "==", user.email)
                    );

                    const querySnapshot = await getDocs(q);
                    const data = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    
                    setMyAppointments(data);
                } catch (error) {
                    console.error("Error fetching appointments: ", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchAppointments();
    }, [user?.email]);

    if (loading) return <div className="text-center mt-20 text-white font-bold text-xl">Loading Appointments...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen">
            <h2 className="text-3xl font-bold text-blue-500 mb-6 italic text-center md:text-left">User Dashboard</h2>
            
            <div className="bg-[#1d232a] border border-gray-700 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">My Appointments: {myAppointments.length}</h3>
                
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Header */}
                        <thead className="text-blue-400 border-b border-gray-700">
                            <tr>
                                <th>#</th>
                                <th>Doctor Name</th>
                                <th>Date</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th className="text-center">Action</th> {/* Naya Action Column */}
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 font-medium">
                            {myAppointments.map((appointment, index) => (
                                <tr key={appointment.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-all">
                                    <th>{index + 1}</th>
                                    <td>{appointment.doctorName}</td>
                                    <td>{appointment.appointmentDate}</td>
                                    <td>{appointment.phoneNumber}</td>
                                    <td>
                                        <span className="badge badge-info bg-blue-600/20 text-blue-400 border-blue-400">
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button 
                                            onClick={() => handleDelete(appointment.id)}
                                            className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500 hover:text-white rounded-full border border-red-500 px-4 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {myAppointments.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No appointments found.</p>
                            <p className="text-blue-500 font-bold cursor-pointer hover:underline">Book a specialist now!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;