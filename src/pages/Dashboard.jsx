import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { db } from "../firebase/firebase.config";
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [myAppointments, setMyAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppoint, setSelectedAppoint] = useState(null); // Reviewer jonno select kora

    // --- 1. Delete (Cancel) Function ---
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this appointment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#3b82f6",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, "appointments", id));
                    setMyAppointments(myAppointments.filter(app => app.id !== id));
                    Swal.fire("Cancelled!", "Your appointment has been removed.", "success");
                } catch (error) {
                    Swal.fire("Error", "Could not cancel. Try again.", "error");
                }
            }
        });
    };

    // --- 2. Submit Review Function ---
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const rating = e.target.rating.value;
        const feedback = e.target.feedback.value;

        try {
            const appointRef = doc(db, "appointments", selectedAppoint.id);
            await updateDoc(appointRef, {
                rating: rating,
                feedback: feedback,
                status: "Reviewed" // Status update jate double review na hoy
            });

            Swal.fire("Success!", "Thank you for your feedback!", "success");
            document.getElementById('review_modal').close();
            
            // UI Update (Refresh charai)
            setMyAppointments(myAppointments.map(app => 
                app.id === selectedAppoint.id ? { ...app, status: "Reviewed" } : app
            ));
        } catch (error) {
            Swal.fire("Error", "Feedback save hoyni!", "error");
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
                    console.error("Error fetching: ", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchAppointments();
    }, [user?.email]);

    if (loading) return <div className="flex justify-center items-center h-screen text-white text-2xl animate-pulse">Loading Appointments...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen">
            <h2 className="text-4xl font-black text-blue-500 mb-10 italic tracking-tight">User Dashboard</h2>
            
            <div className="bg-[#1d232a] border border-gray-800 rounded-[2rem] p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-white">Appointments List</h3>
                    <div className="badge badge-info badge-outline px-4 py-3 font-bold">{myAppointments.length} Bookings</div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-2">
                        <thead className="text-gray-500 uppercase text-xs tracking-widest">
                            <tr>
                                <th>#</th>
                                <th>Doctor Info</th>
                                <th>Date</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 font-medium">
                            {myAppointments.map((appointment, index) => (
                                <tr key={appointment.id} className="bg-[#161b22] hover:bg-gray-800 transition-all">
                                    <td className="rounded-l-2xl font-bold text-blue-500">{index + 1}</td>
                                    <td>
                                        <div className="font-bold text-white">{appointment.doctorName}</div>
                                        <div className="text-xs text-gray-500 uppercase">{appointment.specialty || "Specialist"}</div>
                                    </td>
                                    <td>{appointment.appointmentDate}</td>
                                    <td>{appointment.phoneNumber}</td>
                                    <td>
                                        <span className={`badge py-3 px-4 rounded-lg font-bold border-none ${
                                            appointment.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                                            appointment.status === 'Reviewed' ? 'bg-purple-500/10 text-purple-500' :
                                            'bg-green-500/10 text-green-500'
                                        }`}>
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="rounded-r-2xl text-center">
                                        <div className="flex justify-center gap-3">
                                            {/* Status logic: Completed hole Review button, Reviewed hole nothing, Pending hole Cancel */}
                                            {appointment.status === "Completed" ? (
                                                <button 
                                                    onClick={() => {
                                                        setSelectedAppoint(appointment);
                                                        document.getElementById('review_modal').showModal();
                                                    }}
                                                    className="btn btn-sm bg-blue-600 hover:bg-blue-700 border-none text-white rounded-full px-6"
                                                >
                                                    Give Review
                                                </button>
                                            ) : appointment.status === "Reviewed" ? (
                                                <span className="text-xs italic text-gray-500">Feedback Submitted</span>
                                            ) : (
                                                <button 
                                                    onClick={() => handleDelete(appointment.id)}
                                                    className="btn btn-sm btn-outline btn-error rounded-full px-6 hover:shadow-lg hover:shadow-red-500/20"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {myAppointments.length === 0 && (
                        <div className="text-center py-24 bg-black/20 rounded-3xl border border-dashed border-gray-800">
                            <p className="text-gray-600 text-xl italic">You haven't booked any specialists yet.</p>
                            <button className="btn btn-link text-blue-500 mt-2">Find a doctor now</button>
                        </div>
                    )}
                </div>
            </div>

            {/* --- ⭐ STAR REVIEW MODAL --- */}
            <dialog id="review_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#1d232a] border border-gray-700 rounded-3xl p-8">
                    <h3 className="font-bold text-3xl text-blue-400 text-center italic font-serif">Rate Experience</h3>
                    <p className="text-center py-4 text-gray-400 font-medium">
                        Share your feedback for <br/>
                        <span className="text-white text-lg font-bold"> {selectedAppoint?.doctorName} </span>
                    </p>
                    
                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                        {/* Interactive Star Rating */}
                        <div className="rating rating-lg flex justify-center gap-2">
                            <input type="radio" name="rating" value="1" className="mask mask-star-2 bg-yellow-400" />
                            <input type="radio" name="rating" value="2" className="mask mask-star-2 bg-yellow-400" />
                            <input type="radio" name="rating" value="3" className="mask mask-star-2 bg-yellow-400" />
                            <input type="radio" name="rating" value="4" className="mask mask-star-2 bg-yellow-400" />
                            <input type="radio" name="rating" value="5" className="mask mask-star-2 bg-yellow-400" defaultChecked />
                        </div>
                        
                        <textarea 
                            name="feedback" 
                            className="textarea textarea-bordered w-full h-32 bg-black/30 border-gray-600 focus:border-blue-500 text-white rounded-2xl" 
                            placeholder="Write about the doctor's service and behavior..." 
                            required
                        ></textarea>

                        <div className="modal-action flex justify-between">
                            <button type="button" onClick={() => document.getElementById('review_modal').close()} className="btn btn-ghost text-red-500 font-bold">Discard</button>
                            <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 border-none text-white px-10 rounded-full font-bold shadow-lg shadow-blue-600/30">Submit Review</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Dashboard;