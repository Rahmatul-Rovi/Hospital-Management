const Home = () => {
  return (
    <div className="space-y-12 mb-20">
      {/* Hero Section */}
      <div className="hero min-h-[70vh] rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-2xl">
        <div className="hero-content flex-col lg:flex-row-reverse p-10 gap-10">
          <img 
            src="https://img.freepik.com/free-photo/doctors-day-handsome-smiling-doctor-white-lab-coat-glasses-with-stethoscope-pointing-finger-left_140725-162883.jpg" 
            className="max-w-sm rounded-lg shadow-2xl border-4 border-white/20 hidden md:block" 
            alt="Doctor"
          />
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Compassionate Care <br /> 
              <span className="text-yellow-400">Near You.</span>
            </h1>
            <p className="py-6 text-lg opacity-90 max-w-lg">
              Expert medical advice and health management at your fingertips. 
              Connect with top-rated specialists today.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <button className="btn btn-warning btn-lg shadow-lg">Make Appointment</button>
              <button className="btn btn-outline btn-lg text-white">Our Services</button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Site-er credibility baranor jonno */}
      <div className="flex justify-center">
        <div className="stats shadow-xl bg-white border border-gray-100 w-full md:w-3/4 py-4">
          <div className="stat place-items-center">
            <div className="stat-title text-gray-500">Expert Doctors</div>
            <div className="stat-value text-blue-600">50+</div>
            <div className="stat-desc">Qualified Specialists</div>
          </div>
          
          <div className="stat place-items-center border-x">
            <div className="stat-title text-gray-500">Happy Patients</div>
            <div className="stat-value text-green-500">10k+</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
          
          <div className="stat place-items-center">
            <div className="stat-title text-gray-500">Emergency Rooms</div>
            <div className="stat-value text-red-500">24/7</div>
            <div className="stat-desc">Service Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;