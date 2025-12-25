import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1d232a] text-gray-300 py-10 border-t border-gray-700 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-extrabold text-white">
            Care<span className="text-blue-500">Plus</span> HMS
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            Providing world-class healthcare management solutions. Your health is our top priority.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/appointments" className="hover:text-blue-400">Find Doctors</Link></li>
            <li><Link to="/login" className="hover:text-blue-400">Patient Portal</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Emergency Care</li>
            <li>Dental Services</li>
            <li>Neurology</li>
            <li>Cardiology</li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">Contact Us</h3>
          <p className="text-sm text-gray-400">123 Health Street, Dhaka, Bangladesh</p>
          <p className="text-sm text-gray-400 mt-2">Email: support@careplus.com</p>
          <p className="text-sm text-gray-400">Phone: +880 123 456 789</p>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} CarePlus Hospital. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;