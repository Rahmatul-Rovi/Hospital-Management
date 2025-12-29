import { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  // Smooth scroll logic
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 80,
      behavior: "smooth",
      
    });
  };

  const protectedPath = user ? "/appointments" : "/register";
  const dashboardPath = user ? "/dashboard" : "/register";

  return (
    <div className="space-y-28 mb-20 animate-fadeIn overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <div className="hero min-h-[85vh] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white shadow-2xl mt-5">
        <div className="hero-content flex-col lg:flex-row-reverse p-10 gap-12 max-w-7xl">
          <div className="relative group lg:w-1/2">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src="https://img.freepik.com/free-photo/doctors-day-handsome-smiling-doctor-white-lab-coat-glasses-with-stethoscope-pointing-finger-left_140725-162883.jpg" 
              className="w-full rounded-2xl shadow-2xl border-4 border-white/10 relative" 
              alt="Doctor"
            />
          </div>
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Compassionate Care <br /> 
              <span className="text-yellow-400 drop-shadow-lg text-6xl italic">Near You.</span>
            </h1>
            <p className="py-6 text-xl opacity-90 max-w-lg leading-relaxed mx-auto lg:mx-0">
              Expert medical advice and health management at your fingertips. 
              Book world-class specialists in just a few clicks.
            </p>
            <div className="flex gap-5 justify-center lg:justify-start">
              <Link to={protectedPath} className="btn btn-warning btn-lg shadow-xl px-10 rounded-xl hover:scale-105 transition-all border-none font-bold">
                Make Appointment
              </Link>
              <button 
                onClick={() => scrollToSection(servicesRef)}
                className="btn btn-outline btn-lg text-white rounded-xl px-10 hover:bg-white hover:text-blue-700 transition-all border-2"
              >
                Our Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Stats Section */}
      <div className="relative -mt-40 z-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 stats shadow-2xl bg-white rounded-3xl overflow-hidden max-w-5xl mx-auto py-8">
          <div className="stat place-items-center p-8">
            <div className="stat-title text-gray-500 font-semibold uppercase tracking-wider text-xs">Expert Doctors</div>
            <div className="stat-value text-blue-600 text-5xl">50+</div>
            <div className="stat-desc font-medium text-gray-500">Qualified Specialists</div>
          </div>
          <div className="stat place-items-center border-y md:border-y-0 md:border-x p-8">
            <div className="stat-title text-gray-500 font-semibold uppercase tracking-wider text-xs">Happy Patients</div>
            <div className="stat-value text-green-500 text-5xl">10k+</div>
            <div className="stat-desc font-medium text-gray-500">Verified Reviews</div>
          </div>
          <div className="stat place-items-center p-8">
            <div className="stat-title text-gray-500 font-semibold uppercase tracking-wider text-xs">Emergency Rooms</div>
            <div className="stat-value text-red-500 text-5xl">24/7</div>
            <div className="stat-desc font-medium text-gray-500">Instant Support</div>
          </div>
        </div>
      </div>

      {/* 3. About Us Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
           <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
           <img src="https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg" className="rounded-[2rem] shadow-2xl relative" alt="About Us" />
        </div>
        <div>
          <h4 className="text-blue-600 font-bold tracking-widest uppercase mb-2">About CarePlus</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">We Provide The Best Medical Services For You</h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">CarePlus combines world-class technology with compassionate care. We ensure every patient gets a specialized treatment plan with our expert team.</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-gray-700 font-medium">
            <li className="flex items-center gap-3"><span className="text-blue-500 font-bold">★</span> Facilities</li>
            <li className="flex items-center gap-3"><span className="text-blue-500 font-bold">★</span> Expert Team</li>
            <li className="flex items-center gap-3"><span className="text-blue-500 font-bold">★</span> 24/7 Support</li>
            <li className="flex items-center gap-3"><span className="text-blue-500 font-bold">★</span> Online Booking</li>
          </ul>
          <Link to={dashboardPath} className="btn btn-primary  px-10 shadow-lg border-none">View My Dashboard</Link>
        </div>
      </section>

      {/* 4. Services Section */}
     <section ref={servicesRef} className="bg-blue-50/50 py-24 rounded-[4rem]">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 italic">Our Medical Services</h2>
      <div className="w-24 h-2 bg-blue-500 mx-auto mt-4 rounded-full"></div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: "Cardiology", desc: "Expert cardiac care for your healthy heart.", icon: "❤️", category: "cardiology" },
        { title: "Neurology", desc: "Advanced treatment for brain and nerves.", icon: "🧠", category: "neurology" },
        { title: "Dental Care", desc: "Modern technology for your perfect smile.", icon: "🦷", category: "dental" },
        { title: "Pediatrics", desc: "Specialized healthcare for your children.", icon: "👶", category: "pediatrics" },
        { title: "Orthopedics", desc: "Expert bone and joint surgery solutions.", icon: "🦴", category: "orthopedics" },
        { title: "Eye Care", desc: "Comprehensive eye exams and surgeries.", icon: "👁️", category: "eye-care" }
      ].map((service, idx) => (
        <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-blue-400 shadow-md hover:shadow-2xl transition-all group">
          <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
          <p className="text-gray-500 leading-relaxed mb-6">{service.desc}</p>
          

<Link 
  to={`/appointments?category=${service.title.toLowerCase().replace(/\s+/g, '-')}`} 
  className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1 transition-all hover:gap-2"
>
  Explore More <span>→</span>
</Link>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* 5. Contact Section */}
     <section ref={contactRef} className="max-w-7xl mx-auto px-6">
  <div className="bg-[#1d232a] rounded-[3rem] p-10 md:p-16 shadow-2xl flex flex-col lg:flex-row gap-12">
    <div className="lg:w-1/2 text-white">
      <h2 className="text-4xl font-bold mb-6">Need Help? <br/><span className="text-blue-400 font-black italic">Contact Us</span></h2>
      <div className="space-y-6 opacity-80 mt-10">
        <p>📍 123 Health Street, Dhaka, BD</p>
        <p>📞 +880 123 456 789</p>
        <p>✉️ support@careplus.com</p>
      </div>
    </div>
    
    <div className="lg:w-1/2 bg-white/5 backdrop-blur-md rounded-[2rem] p-8 border border-white/10">
      <form onSubmit={(e) => { e.preventDefault(); alert('Message Sent Successfully!'); e.target.reset(); }} className="space-y-4">
        
        <input 
          type="text" 
          placeholder="Your Name" 
          className="input input-bordered w-full rounded-xl bg-white/10 text-white" 
          required 
        />
        
        <input 
          type="email" 
          placeholder="Email" 
          className="input input-bordered w-full rounded-xl bg-white/10 text-white" 
          required 
        />
        
        <textarea 
          placeholder="Message" 
          className="textarea textarea-bordered w-full rounded-xl bg-white/10 text-white h-24" 
          required
        ></textarea>
        
        <button type="submit" className="btn btn-warning w-full rounded-xl font-bold border-none shadow-lg hover:shadow-yellow-500/20">
          Send Message
        </button>
        
      </form>
    </div>
  </div>
</section>

      {/* 6. Call to Action */}
      <div className="bg-blue-600 rounded-3xl p-10 md:p-20 text-center text-white max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 italic">Ready to prioritize your health?</h2>
        <p className="text-xl mb-10 opacity-80">Book your first appointment today and get 20% off.</p>
        <Link to={protectedPath} className="btn btn-warning btn-wide btn-lg rounded-xl font-bold shadow-xl border-none">Book Now</Link>
      </div>
    </div>
  );
};

export default Home;