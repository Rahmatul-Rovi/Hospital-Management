import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="space-y-24 mb-20 animate-fadeIn">
      {/* 1. Hero Section - With Animation */}
      <div className="hero min-h-[85vh] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white shadow-2xl mt-5">
        <div className="hero-content flex-col lg:flex-row-reverse p-10 gap-12 max-w-7xl">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src="https://img.freepik.com/free-photo/doctors-day-handsome-smiling-doctor-white-lab-coat-glasses-with-stethoscope-pointing-finger-left_140725-162883.jpg" 
              className="max-w-sm rounded-2xl shadow-2xl border-4 border-white/10 relative" 
              alt="Doctor"
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Compassionate Care <br /> 
              <span className="text-yellow-400 drop-shadow-lg">Near You.</span>
            </h1>
            <p className="py-6 text-xl opacity-90 max-w-lg leading-relaxed">
              Expert medical advice and health management at your fingertips. 
              Book world-class specialists in just a few clicks.
            </p>
            <div className="flex gap-5 justify-center lg:justify-start">
              <Link to="/appointments" className="btn btn-warning btn-lg shadow-xl px-10 rounded-full hover:scale-105 transition-all border-none font-bold">Make Appointment</Link>
              <button className="btn btn-outline btn-lg text-white rounded-full px-10 hover:bg-white hover:text-blue-700 transition-all border-2">Our Services</button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Stats Section - Overlapping look */}
      <div className="relative -mt-32 z-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 stats shadow-2xl bg-white rounded-3xl overflow-hidden max-w-5xl mx-auto py-8">
          <div className="stat place-items-center p-8">
            <div className="stat-title text-gray-500 font-semibold uppercase tracking-wider">Expert Doctors</div>
            <div className="stat-value text-blue-600 text-5xl">50+</div>
            <div className="stat-desc font-medium">Qualified Specialists</div>
          </div>
          
          <div className="stat place-items-center border-y md:border-y-0 md:border-x p-8">
            <div className="stat-title text-gray-500 font-semibold uppercase tracking-wider">Happy Patients</div>
            <div className="stat-value text-green-500 text-5xl">10k+</div>
            <div className="stat-desc font-medium">Verified Reviews</div>
          </div>
          
          <div className="stat place-items-center p-8">
            <div className="stat-title text-gray-500 font-semibold uppercase tracking-wider">Emergency Rooms</div>
            <div className="stat-value text-red-500 text-5xl">24/7</div>
            <div className="stat-desc font-medium">Instant Support</div>
          </div>
        </div>
      </div>

      {/* 3. Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 italic">Why Choose CarePlus?</h2>
          <div className="w-24 h-2 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: "Top Specialists", desc: "Consult with highly experienced medical professionals.", icon: "👨‍⚕️", color: "bg-blue-100" },
            { title: "24/7 Service", desc: "Emergency medical support available around the clock.", icon: "⏰", color: "bg-red-100" },
            { title: "Modern Tech", desc: "Equipped with the latest healthcare diagnostic tools.", icon: "🔬", color: "bg-green-100" },
            { title: "Safe & Secure", desc: "Your medical data and privacy are our top priority.", icon: "🛡️", color: "bg-purple-100" }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Mini Doctor Section - Highlighting some specialists */}
      <section className="bg-blue-50 py-20 rounded-[3rem]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">Meet Our Best <br />Medical Team</h2>
            <p className="py-6 text-gray-600 text-lg">
              Our doctors are not just experts; they are pioneers in their fields. 
              Get world-class treatment without leaving your city.
            </p>
            <Link to="/appointments" className="btn btn-primary rounded-full px-8 shadow-lg">Browse All Doctors</Link>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4 mt-8">
               <img src="https://i.ibb.co/L5B7Pzh/doc1.jpg" className="rounded-2xl shadow-lg border-2 border-white" alt="doc" />
               <img src="https://i.ibb.co/fnd3n0Z/doc2.jpg" className="rounded-2xl shadow-lg border-2 border-white" alt="doc" />
            </div>
            <div className="space-y-4">
               <img src="https://i.ibb.co/r7vHk2y/doc3.jpg" className="rounded-2xl shadow-lg border-2 border-white" alt="doc" />
               <div className="h-40 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-center p-4">
                  <p className="font-bold text-lg">Join 10k+ Happy Patients!</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call to Action */}
      <div className="bg-blue-600 rounded-3xl p-10 md:p-20 text-center text-white max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to prioritize your health?</h2>
        <p className="text-xl mb-10 opacity-80">Book your first appointment today and get 20% off on your first visit.</p>
        <Link to="/appointments" className="btn btn-warning btn-wide btn-lg rounded-full font-bold shadow-xl border-none">Book Now</Link>
      </div>
    </div>
  );
};

export default Home;