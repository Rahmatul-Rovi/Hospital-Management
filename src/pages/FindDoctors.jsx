import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom"; // Filter-er jonno lagbe
import { AuthContext } from "../providers/AuthProvider";
import { db } from "../firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2"; // Professional alert-er jonno

const FindDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Filtered list-er jonno state
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const { user } = useContext(AuthContext);

    // URL theke category dhorar jonno
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get("category");

    useEffect(() => {
    // public folder theke load hobe
    fetch('/doctors.json') 
        .then(res => res.json())
        .then(data => {
            setDoctors(data);
            
            if (selectedCategory) {
                // URL-er category (e.g. cardiology) ke clean koro
                const cleanURLCategory = selectedCategory.toLowerCase().trim();

                const filtered = data.filter(doc => {
                    // JSON-er specialty keo clean koro match koranor jonno
                    const docSpec = doc.specialty.toLowerCase().replace(/\s+/g, '-').trim();
                    return docSpec === cleanURLCategory;
                });
                
                setFilteredDoctors(filtered);
            } else {
                setFilteredDoctors(data);
            }
        })
        .catch(err => {
            console.error("Data load hoyni:", err);
            setFilteredDoctors([]);
        });
}, [selectedCategory]);

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
            status: "Pending",
            bookedAt: new Date()
        };

        try {
            const docRef = await addDoc(collection(db, "appointments"), appointmentInfo);
            
            // SweetAlert use korle beshi premium lage
            Swal.fire({
                title: "Success!",
                text: "Appointment Booked Successfully!",
                icon: "success",
                confirmButtonColor: "#2563eb"
            });

            form.reset();
            document.getElementById('booking_modal').close();
        } catch (error) {
            console.error("Error adding document: ", error);
            Swal.fire("Error", "Could not save booking!", "error");
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-blue-500 italic">
                    {selectedCategory ? `${selectedCategory.toUpperCase()} Specialists` : "Available Specialists"}
                </h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
            </div>
            
            {/* Displaying Filtered Doctors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map(doctor => (
                    <div key={doctor.id} className="card bg-[#1d232a] shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group">
                        <figure className="px-5 pt-5 overflow-hidden">
                            <img src={doctor.image} alt={doctor.name} className="rounded-xl h-60 w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </figure>
                        <div className="card-body text-white">
                            <h2 className="card-title text-blue-400 font-bold text-2xl">{doctor.name}</h2>
                            <p className="text-gray-400 font-semibold uppercase text-xs tracking-widest">{doctor.specialty}</p>
                            
                            <div className="flex justify-between items-center mt-4 bg-black/20 p-3 rounded-lg">
                                <span className="text-sm text-gray-300 italic">Experience: {doctor.experience}</span>
                                <span className="text-xl font-black text-green-500">৳ {doctor.fees}</span>
                            </div>

                            <div className="card-actions mt-6">
                                <button 
                                    onClick={() => {
                                        setSelectedDoctor(doctor);
                                        document.getElementById('booking_modal').showModal();
                                    }} 
                                    className="btn bg-blue-600 hover:bg-blue-700 border-none text-white w-full rounded-full font-bold shadow-lg"
                                >
                                    Book Appointment Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredDoctors.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-500 italic">No doctors found in this category.</p>
                </div>
            )}

            {/* --- BOOKING MODAL --- */}
            <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#1d232a] border border-gray-700 rounded-[2rem]">
                    <h3 className="font-bold text-3xl text-blue-400 mb-2 text-center italic font-serif">Confirm Booking</h3>
                    <p className="text-center text-gray-400 mb-6">Expert: <span className="text-yellow-400 font-bold">{selectedDoctor?.name}</span></p>
                    
                    <form onSubmit={handleBooking} className="flex flex-col gap-5">
                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-300 font-bold">Patient Name</span></label>
                            <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered bg-[#2a323c] text-white rounded-xl" />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-300 font-bold">Appointment Date</span></label>
                            <input name="date" type="date" className="input input-bordered bg-[#2a323c] text-white focus:border-blue-500 rounded-xl" required />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-300 font-bold">Phone Number</span></label>
                            <input name="phone" type="tel" placeholder="01XXXXXXXXX" className="input input-bordered bg-[#2a323c] text-white focus:border-blue-500 rounded-xl" required />
                        </div>

                        <div className="modal-action flex justify-between gap-4 mt-8">
                            <button type="button" onClick={() => document.getElementById('booking_modal').close()} className="btn btn-ghost text-red-400 font-bold">Cancel</button>
                            <button type="submit" className="btn bg-blue-600 border-none text-white px-10 rounded-full font-bold shadow-blue-500/50 shadow-lg">
                                Confirm Now
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default FindDoctors;