const Dashboard = () => {
  return (
    <div className="p-10 bg-white rounded-3xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6">User Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-blue-700">Total Bookings</h3>
          <p className="text-4xl font-extrabold">12</p>
        </div>
        <div className="bg-green-100 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-green-700">Prescriptions</h3>
          <p className="text-4xl font-extrabold">05</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-purple-700">Payments</h3>
          <p className="text-4xl font-extrabold">$240</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;