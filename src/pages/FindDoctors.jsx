import { useEffect, useState } from "react";

const FindDoctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('doctors.json')
            .then(res => res.json())
            .then(data => setDoctors(data));
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-4xl font-bold text-center text-blue-600 mb-10">Available Specialists</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {doctors.map(doctor => (
                    <div key={doctor.id} className="card bg-base-100 shadow-xl border border-gray-200 hover:shadow-2xl transition-all">
                        <figure className="px-5 pt-5">
                            <img src={doctor.image} alt={doctor.name} className="rounded-xl h-60 w-full object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-blue-600 font-bold">{doctor.name}</h2>
                            <p className="text-gray-500 font-semibold">{doctor.specialty}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="badge badge-outline p-3">Exp: {doctor.experience}</span>
                                <span className="text-lg font-bold text-green-600">৳ {doctor.fees}</span>
                            </div>
                            <div className="card-actions mt-4">
                                <button className="btn btn-primary w-full rounded-full">Book Appointment</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FindDoctors;