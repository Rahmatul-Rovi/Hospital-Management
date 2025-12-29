import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const BookingPage = () => {
    const { id } = useParams(); // Doctors ID from URL 
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Doctors List from Doctor ID 
    // Database here from Real project
    const [bookingDate, setBookingDate] = useState("");
    const [phone, setPhone] = useState("");

    const handleConfirm = (e) => {
        e.preventDefault();
        
        const appointmentInfo = {
            doctorId: id,
            patientName: user?.displayName,
            patientEmail: user?.email,
            date: bookingDate,
            phone: phone,
            status: "Pending"
        };

        console.log("Saving Appointment:", appointmentInfo);
        
        // Eikhane Firebase ba API diye save korsi
        Swal.fire({
            title: "Success!",
            text: "Your Appointment is Booked!",
            icon: "success"
        });
        navigate("/dashboard"); // Save hoye gele dashboard-e niye jabe
    };

    return (
        <div className="min-h-screen py-20 bg-blue-50">
            <div className="max-w-xl mx-auto bg-white p-10 rounded-[3rem] shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Confirm Appointment</h2>
                
                <form onSubmit={handleConfirm} className="space-y-5">
                    <div className="form-control">
                        <label className="label font-bold">Patient Name</label>
                        <input type="text" value={user?.displayName} readOnly className="input input-bordered bg-gray-100" />
                    </div>
                    
                    <div className="form-control">
                        <label className="label font-bold">Appointment Date</label>
                        <input 
                            type="date" 
                            required 
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="input input-bordered focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">Phone Number</label>
                        <input 
                            type="tel" 
                            placeholder="017XXXXXXXX" 
                            required 
                            onChange={(e) => setPhone(e.target.value)}
                            className="input input-bordered" 
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full rounded-full text-lg mt-5">
                        Confirm Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;