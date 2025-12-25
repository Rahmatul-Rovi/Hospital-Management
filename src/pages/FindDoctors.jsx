import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { db } from "../firebase/firebase.config"; // Firestore db import
import { collection, addDoc } from "firebase/firestore"; // Firebase functions

const FindDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null); // Doctor select korar jonno state
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('doctors.json')
            .then(res => res.json())
            .then(data => setDoctors(data));
    }, []);

    // --- Database-e data pathanor function ---
    const handleBooking = async (e) => {
        e.preventDefault();
        const form = e.target;
        const date = form.date.value;
        const phone = form.phone.value;

        const appointmentInfo = {
            patientName: user?.displayName || "Anonymous",
            patientEmail: user?.email,
            doctorId: selectedDoctor?.id,
            doctorName: selectedDoctor?.name,
            specialty: selectedDoctor?.specialty,
            appointmentDate: date,
            phoneNumber: phone,
            status: "Pending", // Default status
            bookedAt: new Date()
        };

        try {
            // "appointments" name-e collection-e data jabe
            const docRef = await addDoc(collection(db, "appointments"), appointmentInfo);
            alert(`Appointment Successful! ID: ${docRef.id}`);
            form.reset();
            document.getElementById('booking_modal').close(); // Modal bondho koro
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Database-e data pathate somossa hoyeche!");
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-4xl font-bold text-center text-blue-600 mb-10 italic">Available Specialists</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {doctors.map(doctor => (
                    <div key={doctor.id} className="card bg-[#1d232a] shadow-xl border border-gray-700 hover:border-blue-500 transition-all">
                        <figure className="px-5 pt-5">
                            <img src={doctor.image} alt={doctor.name} className="rounded-xl h-60 w-full object-cover" />
                        </figure>
                        <div className="card-body text-white">
                            <h2 className="card-title text-blue-400 font-bold">{doctor.name}</h2>
                            <p className="text-gray-400 font-semibold">{doctor.specialty}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="badge badge-outline text-gray-300">Exp: {doctor.experience}</span>
                                <span className="text-lg font-bold text-green-500">৳ {doctor.fees}</span>
                            </div>
                            <div className="card-actions mt-4">
                                <button 
                                    onClick={() => {
                                        setSelectedDoctor(doctor); // Doctor select koro
                                        document.getElementById('booking_modal').showModal();
                                    }} 
                                    className="btn bg-blue-600 hover:bg-blue-700 border-none text-white w-full rounded-full"
                                >
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- BOOKING MODAL --- */}
            <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#1d232a] border border-gray-700">
                    <h3 className="font-bold text-2xl text-blue-400 mb-2 text-center italic">Appointment Form</h3>
                    <p className="text-center text-gray-400 mb-4">Booking for: <span className="text-green-500 font-bold">{selectedDoctor?.name}</span></p>
                    
                    {/* onSubmit function add kora hoyeche */}
                    <form onSubmit={handleBooking} className="flex flex-col gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-300">Patient Name</span></label>
                            <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered bg-[#2a323c] text-white" />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-300">Select Date</span></label>
                            <input name="date" type="date" className="input input-bordered bg-[#2a323c] text-white focus:border-blue-500" required />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-300">Phone Number</span></label>
                            <input name="phone" type="tel" placeholder="017XXXXXXXX" className="input input-bordered bg-[#2a323c] text-white focus:border-blue-500" required />
                        </div>

                        <div className="modal-action flex justify-between">
                            <button type="button" onClick={() => document.getElementById('booking_modal').close()} className="btn btn-ghost text-red-500">Close</button>
                            {/* Type ekhon submit */}
                            <button type="submit" className="btn bg-blue-600 border-none text-white px-8 rounded-full">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default FindDoctors;