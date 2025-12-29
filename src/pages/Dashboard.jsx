import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { db } from "../firebase/firebase.config";
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [myAppointments, setMyAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppoint, setSelectedAppoint] = useState(null);

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

    // --- 2. Submit Review Function (Fixed Logic) ---
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const rating = e.target.rating.value;
        const feedback = e.target.feedback.value;

        try {
            const appointRef = doc(db, "appointments", selectedAppoint.id);
            await updateDoc(appointRef, {
                rating: rating,
                feedback: feedback,
                status: "Reviewed" 
            });

            Swal.fire("Success!", "Thank you for your feedback!", "success");
            document.getElementById('review_modal').close();
            
            // ✨ EKHANE FIX KORA HOYECHE: 
            // Review submit hole list theke oi appointment-ta remove hoye jabe
            setMyAppointments(prevAppointments => prevAppointments.filter(app => app.id !== selectedAppoint.id));

        } catch (error) {
            console.error("Review Error:", error);
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
                    
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); 

                    const data = querySnapshot.docs.map(docSnap => {
                        const appointData = docSnap.data();
                        const id = docSnap.id;
                        
                        const appointDate = new Date(appointData.appointmentDate);
                        appointDate.setHours(0, 0, 0, 0);

                        let currentStatus = appointData.status;
                        if (appointDate < today && currentStatus === "Pending") {
                            currentStatus = "Completed";
                            updateDoc(doc(db, "appointments", id), { status: "Completed" });
                        }

                        return { id, ...appointData, status: currentStatus };
                    });

                    // ✨ LOGIN ER SOMOY-O JATE REVIEWED GULO NA DEKHAY:
                    const visibleAppointments = data.filter(app => app.status !== "Reviewed");
                    setMyAppointments(visibleAppointments);

                } catch (error) {
                    console.error("Error fetching: ", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchAppointments();
    }, [user?.email]);

    if (loading) return <div className="flex justify-center items-center h-screen text-blue-500 text-2xl animate-pulse font-black italic">Loading Dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen animate-fadeIn">
            <h2 className="text-5xl font-black text-center text-blue-500 mb-10 italic tracking-tighter">My <span className="text-blue-500">Appointments</span></h2>
            
            <div className="bg-[#111827] border border-white/5 rounded-[3rem] p-8 shadow-3xl backdrop-blur-3xl">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-bold text-gray-400">Active Bookings</h3>
                    <div className="bg-blue-600/10 text-blue-500 px-6 py-2 rounded-full font-black text-sm border border-blue-500/20">{myAppointments.length} Found</div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-3">
                        <thead className="text-gray-600 uppercase text-xs tracking-[0.2em]">
                            <tr>
                                <th className="bg-transparent">Doctor</th>
                                <th className="bg-transparent">Date</th>
                                <th className="bg-transparent">Status</th>
                                <th className="bg-transparent text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            {myAppointments.map((appointment) => (
                                <tr key={appointment.id} className="bg-white/5 hover:bg-white/10 transition-all group">
                                    <td className="rounded-l-[2rem] p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black">
                                                {appointment.doctorName?.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-black text-white text-lg">{appointment.doctorName}</div>
                                                <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{appointment.specialty || "Generalist"}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-bold text-gray-400">{appointment.appointmentDate}</td>
                                    <td>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${
                                            appointment.status === 'Pending' ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/5' : 
                                            'border-green-500/50 text-green-500 bg-green-500/5'
                                        }`}>
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="rounded-r-[2rem] text-center">
                                        {appointment.status === "Completed" ? (
                                            <button 
                                                onClick={() => {
                                                    setSelectedAppoint(appointment);
                                                    document.getElementById('review_modal').showModal();
                                                }}
                                                className="btn btn-sm bg-blue-600 hover:bg-blue-700 border-none text-white rounded-xl px-6 font-black"
                                            >
                                                Rate Doctor
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleDelete(appointment.id)}
                                                className="btn btn-sm btn-ghost text-red-500 hover:bg-red-500/10 rounded-xl px-6 font-bold"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {myAppointments.length === 0 && (
                        <div className="text-center py-20 text-gray-600 italic">No active appointments to show.</div>
                    )}
                </div>
            </div>

            <dialog id="review_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box bg-[#111827] border border-white/10 rounded-[3rem] p-10">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4">⭐</div>
                        <h3 className="font-black text-3xl text-white italic">Rate Your Experience</h3>
                        <p className="text-gray-500 mt-2 font-medium">How was your session with <br/> <span className="text-blue-400">{selectedAppoint?.doctorName}</span>?</p>
                    </div>
                    
                    <form onSubmit={handleReviewSubmit} className="space-y-8">
                        <div className="rating rating-lg flex justify-center gap-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <input key={star} type="radio" name="rating" value={star} className="mask mask-star-2 bg-yellow-400" defaultChecked={star === 5} />
                            ))}
                        </div>
                        
                        <textarea 
                            name="feedback" 
                            className="textarea bg-white/5 border-white/10 w-full h-32 rounded-[1.5rem] focus:border-blue-500 text-white p-6 placeholder:text-gray-700" 
                            placeholder="Tell us about the service..." 
                            required
                        ></textarea>

                        <div className="flex gap-4">
                            <button type="button" onClick={() => document.getElementById('review_modal').close()} className="btn flex-1 bg-white/5 hover:bg-white/10 border-none text-gray-400 rounded-2xl h-16 font-black">Cancel</button>
                            <button type="submit" className="btn flex-1 bg-blue-600 hover:bg-blue-700 border-none text-white rounded-2xl h-16 font-black shadow-xl shadow-blue-600/20">Submit</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Dashboard;