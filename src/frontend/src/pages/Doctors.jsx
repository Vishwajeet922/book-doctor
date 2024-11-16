import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaGraduationCap, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import { API_DOCTORS_URL } from '../utils/contants';

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Filter states
  const [priceRange, setPriceRange] = useState(500);
  const [minExperience, setMinExperience] = useState(0);
  const [selectedQualification, setSelectedQualification] = useState('');

  const speciality = searchParams.get('speciality');

  useEffect(() => {
    fetchDoctors();
  }, [searchParams]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${API_DOCTORS_URL}`);
      const data = await response.json();
      console.log(data);
      setDoctors(data);
      setFilteredDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = doctors;

    // Speciality filter from URL params
    if (speciality) {
      filtered = filtered.filter(doctor =>
        doctor.speciality.toLowerCase() === speciality.toLowerCase()
      );
    }

    // Price filter
    filtered = filtered.filter(doctor => doctor.price <= priceRange);

    // Experience filter
    filtered = filtered.filter(doctor => parseInt(doctor.experience) >= minExperience);

    // Qualification filter
    if (selectedQualification) {
      filtered = filtered.filter(doctor =>
        doctor.qualification.includes(selectedQualification)
      );
    }

    setFilteredDoctors(filtered);
  }, [priceRange, minExperience, selectedQualification, doctors, speciality]);

  // Get unique qualifications
  const qualifications = [...new Set(doctors.flatMap(doc =>
    doc.qualification.split(',').map(q => q.trim())
  ))];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Filter Section */}
      <div className="max-w-7xl mx-auto mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Price (${priceRange})
            </label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Experience Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Experience ({minExperience} years)
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={minExperience}
              onChange={(e) => setMinExperience(e.target.value)}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Qualification Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qualification
            </label>
            <select
              value={selectedQualification}
              onChange={(e) => setSelectedQualification(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Qualifications</option>
              {qualifications.map(qual => (
                <option key={qual} value={qual}>{qual}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
                  <p className="text-white/90">{doctor.speciality}</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaGraduationCap />
                  <span>{doctor.qualification}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaBriefcase />
                  <span>{doctor.experience} years experience</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaMoneyBillWave />
                  <span>${doctor.price} per consultation</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <FaMapMarkerAlt />
                  <span>{doctor.address}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {doctor.description}
                </p>

                <button
                  onClick={() => navigate(`/doctor/${doctor.id}`)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;