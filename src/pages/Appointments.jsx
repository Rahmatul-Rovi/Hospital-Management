const Appointments = () => {
  const doctors = [
    { id: 1, name: "Dr. Sarah Khan", expert: "Cardiologist", image: "https://i.ibb.co/L8N7p7v/doctor1.jpg" },
    { id: 2, name: "Dr. Ahmed Ullah", expert: "Neurologist", image: "https://i.ibb.co/7XjNf8x/doctor2.jpg" },
    { id: 3, name: "Dr. Maria Gomez", expert: "Pediatrician", image: "https://i.ibb.co/yq6MvS3/doctor3.jpg" },
  ];

  return (
    <div className="py-10">
      <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
        Our Specialized <span className="text-yellow-500">Doctors</span>
      </h2>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="card bg-base-100 shadow-2xl hover:shadow-blue-200 transition-all border border-gray-100">
            <figure className="px-6 pt-6">
              <img src={doctor.image || "https://via.placeholder.com/150"} alt="doctor" className="rounded-xl h-52 w-full object-cover" />
            </figure>
            <div className="card-body items-center text-center">
              <div className="badge badge-secondary mb-2">{doctor.expert}</div>
              <h2 className="card-title text-2xl font-bold">{doctor.name}</h2>
              <p className="text-gray-500">Available: Sat - Thu (10am - 4pm)</p>
              <div className="card-actions mt-4 w-full">
                <button className="btn btn-primary btn-block rounded-lg font-bold">Book Appointment</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;