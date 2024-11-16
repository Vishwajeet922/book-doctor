import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaCalendarCheck, FaHospital, FaSearch } from 'react-icons/fa';

const Home = () => {
  const [masterData, setMasterData] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/master');
      const data = await response.json();
      setMasterData(data);
    } catch (error) {
      console.error('Error fetching master data:', error);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedSpeciality) params.append('speciality', selectedSpeciality);
    if (selectedClass) params.append('class', selectedClass);
    navigate(`/doctors?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Your Health, Our Priority</h1>
          <p className="text-xl mb-8">Book appointments with top specialists in just a few clicks</p>

          {/* Search Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                className="p-3 border rounded-md text-gray-700"
                value={selectedSpeciality}
                onChange={(e) => setSelectedSpeciality(e.target.value)}
              >
                <option value="">Select Speciality</option>
                {masterData?.speciality?.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>

              <select
                className="p-3 border rounded-md text-gray-700"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Booking Class</option>
                {masterData?.bookingClass?.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>

              <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                <FaSearch /> Find Doctors
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <FaUserMd className="text-5xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
            <p className="text-gray-600">Access to {masterData?.speciality?.length} specialities</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <FaCalendarCheck className="text-5xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">Book appointments in various classes including emergency care</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <FaHospital className="text-5xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality Care</h3>
            <p className="text-gray-600">Premium healthcare services at your convenience</p>
          </div>
        </div>
      </div>

      {/* Specialities Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Specialities</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {masterData?.speciality?.map((spec) => (
              <div
                key={spec}
                className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedSpeciality(spec);
                  handleSearch();
                }}
              >
                <p className="text-gray-800">{spec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;