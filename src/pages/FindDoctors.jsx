import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { db } from "../firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const FindDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [viewDoctor, setViewDoctor] = useState(null);
    const { user } = useContext(AuthContext);

    // --- Search & Filter States ---
    const [searchTerm, setSearchTerm] = useState("");
    const [maxFees, setMaxFees] = useState(3000);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get("category");

    useEffect(() => {
        fetch('/doctors.json')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);

                // --- Advanced Filtering Logic ---
                let result = data;

                // 1. Category Filter (URL theke)
                if (selectedCategory) {
                    const cleanURLCategory = selectedCategory.toLowerCase().trim();
                    result = result.filter(doc => {
                        const docSpec = doc.specialty.toLowerCase().replace(/\s+/g, '-').trim();
                        return docSpec === cleanURLCategory;
                    });
                }

                // 2. Search Term Filter (Name matching)
                // 2. Search Term Filter (Name OR Specialty matching)
                if (searchTerm) {
                    result = result.filter(doc =>
                        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                // 3. Price Filter (Fees matching)
                result = result.filter(doc => doc.fees <= maxFees);

                setFilteredDoctors(result);
            })
            .catch(err => {
                console.error("Data load hoyni:", err);
                setFilteredDoctors([]);
            });
    }, [selectedCategory, searchTerm, maxFees]); // Ei 3 ta change hoilei filter hobe

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
            await addDoc(collection(db, "appointments"), appointmentInfo);
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

            {/* --- Heading Section --- */}
            <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-blue-500 italic">
                    {selectedCategory ? `${selectedCategory.toUpperCase().replace('-', ' ')} Specialists` : "Available Specialists"}
                </h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* --- 🔎 SEARCH & FILTER BAR --- */}
            <div className="bg-[#1d232a] p-6 rounded-3xl border border-gray-700 mb-12 shadow-2xl flex flex-col md:flex-row gap-8 items-center justify-between">

                {/* Search Input */}
                <div className="w-full md:w-1/2">
                    <label className="label">
                        <span className="label-text text-gray-400 font-bold text-xs uppercase tracking-widest">Search Doctor Name</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or specialty (e.g. Cardiology)..."
                            className="input input-bordered w-full bg-[#12171d] text-white border-gray-600 focus:border-blue-500 rounded-xl pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute left-3 top-3 text-gray-500">🔍</span>
                    </div>
                </div>

                {/* Fees Range Filter */}
                <div className="w-full md:w-1/2">
                    <label className="label flex justify-between">
                        <span className="label-text text-gray-400 font-bold text-xs uppercase tracking-widest">Max Consultation Fee</span>
                        <span className="text-blue-400 font-bold">৳ {maxFees}</span>
                    </label>
                    <input
                        type="range"
                        min="600"
                        max="3000"
                        step="100"
                        value={maxFees}
                        onChange={(e) => setMaxFees(e.target.value)}
                        className="range range-info range-sm"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 mt-2 px-1">
                        <span>৳600</span>
                        <span>৳2000</span>
                        <span>৳3000</span>
                        <span>৳3000</span>
                    </div>
                </div>
            </div>

            {/* --- DOCTORS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map(doctor => (
                    <div key={doctor.id} className="card bg-[#1d232a] shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group">
                        <figure className="px-5 pt-5 overflow-hidden relative">
                            <img src={doctor.image} alt={doctor.name} className="rounded-xl h-60 w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-8 right-8 badge badge-primary bg-blue-600 border-none font-bold">৳ {doctor.fees}</div>
                        </figure>
                        <div className="card-body text-white">
                            <h2 className="card-title text-blue-400 font-bold text-2xl">{doctor.name}</h2>
                            <p className="text-gray-400 font-semibold uppercase text-xs tracking-widest">{doctor.specialty}</p>

                            <div className="mt-4 bg-black/20 p-3 rounded-lg">
                                <span className="text-sm text-gray-300 italic font-medium">Experience: {doctor.experience}</span>
                            </div>

                            <div className="card-actions mt-6 flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        setViewDoctor(doctor);
                                        document.getElementById('details_modal').showModal();
                                    }}
                                    className="btn btn-outline btn-info btn-sm w-full rounded-full lowercase italic font-normal hover:bg-info hover:text-white"
                                >
                                    View full details
                                </button>

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

            {/* --- EMPTY STATE --- */}
            {filteredDoctors.length === 0 && (
                <div className="text-center py-20 bg-[#1d232a] rounded-3xl border border-dashed border-gray-700">
                    <p className="text-5xl mb-4">🕵️‍♂️</p>
                    <p className="text-2xl text-gray-400 italic font-serif">No doctors found matching your criteria.</p>
                    <button onClick={() => { setSearchTerm(""); setMaxFees(3000) }} className="btn btn-link text-blue-500 mt-4">Reset Filters</button>
                </div>
            )}

            {/* --- 🩺 DOCTOR DETAILS MODAL --- */}
            <dialog id="details_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#1d232a] border border-gray-600 text-white max-w-2xl rounded-3xl p-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                            <img src={viewDoctor?.image} className="w-full h-64 object-cover rounded-2xl border-2 border-blue-500 shadow-xl" alt="" />
                        </div>
                        <div className="md:w-2/3 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-3xl text-blue-400 mb-1">{viewDoctor?.name}</h3>
                                <p className="text-gray-400 font-bold mb-4 uppercase text-xs tracking-[4px]">{viewDoctor?.specialty}</p>

                                <div className="space-y-4 text-sm">
                                    <div className="flex gap-2"><span className="text-blue-500 font-bold">🎓 Education:</span> <span className="text-gray-300">{viewDoctor?.education}</span></div>
                                    <div className="flex gap-2"><span className="text-blue-500 font-bold">🏥 Chamber:</span> <span className="text-gray-300">{viewDoctor?.chamber}</span></div>
                                    <div className="flex gap-2"><span className="text-blue-500 font-bold">⏰ Timing:</span> <span className="text-gray-300 font-mono">{viewDoctor?.timing}</span></div>
                                    <div className="flex gap-2"><span className="text-blue-500 font-bold">💰 Fee:</span> <span className="text-green-400 font-bold text-lg">৳ {viewDoctor?.fees}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-5 bg-blue-500/5 rounded-2xl border border-blue-500/20">
                        <h4 className="text-blue-400 font-bold mb-2">About Specialist</h4>
                        <p className="text-gray-400 italic text-sm leading-relaxed">"{viewDoctor?.description}"</p>
                    </div>

                    <div className="modal-action flex justify-between items-center mt-10">
                        <button onClick={() => document.getElementById('details_modal').close()} className="btn btn-ghost text-red-400 font-bold uppercase tracking-widest text-xs">Close</button>
                        <button
                            onClick={() => {
                                document.getElementById('details_modal').close();
                                setSelectedDoctor(viewDoctor);
                                document.getElementById('booking_modal').showModal();
                            }}
                            className="btn bg-blue-600 border-none text-white px-8 rounded-full font-bold shadow-lg shadow-blue-500/30"
                        >
                            Proceed to Booking
                        </button>
                    </div>
                </div>
            </dialog>

            {/* --- 📝 BOOKING MODAL --- */}
            <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#1d232a] border border-gray-700 rounded-[2rem] p-8">
                    <h3 className="font-bold text-3xl text-blue-400 mb-2 text-center italic">Confirm Booking</h3>
                    <p className="text-center text-gray-400 mb-6">Expert: <span className="text-yellow-400 font-bold">{selectedDoctor?.name}</span></p>

                    <form onSubmit={handleBooking} className="flex flex-col gap-5">
                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-300 font-bold">Patient Name</span></label>
                            <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered bg-[#2a323c] text-white rounded-xl border-gray-600" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-300 font-bold">Appointment Date</span></label>
                            <input name="date" type="date" className="input input-bordered bg-[#2a323c] text-white focus:border-blue-500 rounded-xl border-gray-600" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-300 font-bold">Phone Number</span></label>
                            <input name="phone" type="tel" placeholder="01XXXXXXXXX" className="input input-bordered bg-[#2a323c] text-white focus:border-blue-500 rounded-xl border-gray-600" required />
                        </div>
                        <div className="modal-action flex justify-between gap-4 mt-8">
                            <button type="button" onClick={() => document.getElementById('booking_modal').close()} className="btn btn-ghost text-red-400 font-bold">Cancel</button>
                            <button type="submit" className="btn bg-blue-600 border-none text-white px-10 rounded-full font-bold shadow-blue-500/50 shadow-lg">Confirm Now</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default FindDoctors;