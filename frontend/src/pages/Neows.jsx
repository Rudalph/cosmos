// src/components/AsteroidForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Neows = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResults(null);
    setError('');
    try {
      const res = await axios.get('http://localhost:5000/api/asteroids', {
        params: { start_date: startDate, end_date: endDate }
      });
      setResults(res.data.near_earth_objects);
    } catch (err) {
      setError('Error fetching data from NASA API');
    }
  };

  const openModal = (asteroid) => {
    setSelectedAsteroid(asteroid);
  };

  const closeModal = () => {
    setSelectedAsteroid(null);
  };

  return (
  <>
  <Navbar />
  
    <div className="p-6 max-w-6xl mx-auto font-sans">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-md mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">🌠 NASA NEO Asteroid Search</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
            className="border p-2 rounded w-full sm:w-1/3"
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
            className="border p-2 rounded w-full sm:w-1/3"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Search
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {results && (
        <div>
          {Object.entries(results).map(([date, asteroids]) => (
            <div key={date} className="mb-10">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">📅 Date: {date}</h3>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {asteroids.map((asteroid) => (
                  <div
                    key={asteroid.id}
                    className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
                    onClick={() => openModal(asteroid)}
                  >
                    <h4 className="text-lg font-bold mb-2">{asteroid.name}</h4>
                    <p><strong>Hazardous:</strong> {asteroid.is_potentially_hazardous_asteroid ? 'Yes 🚨' : 'No ✅'}</p>
                    <p><strong>Estimated Diameter (min):</strong> {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3)} km</p>
                    <p><strong>Approach Velocity:</strong> {parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2)} km/h</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedAsteroid && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative shadow-lg">
            <button onClick={closeModal} className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl">&times;</button>
            <h2 className="text-2xl font-bold mb-2">{selectedAsteroid.name}</h2>
            <p><strong>NASA JPL URL:</strong> <a href={selectedAsteroid.nasa_jpl_url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View</a></p>
            <p><strong>Hazardous:</strong> {selectedAsteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
            <p><strong>Estimated Diameter (max):</strong> {selectedAsteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)} km</p>
            <p><strong>Miss Distance:</strong> {parseFloat(selectedAsteroid.close_approach_data[0].miss_distance.kilometers).toFixed(2)} km</p>
            <p><strong>Orbiting Body:</strong> {selectedAsteroid.close_approach_data[0].orbiting_body}</p>
            <p><strong>Relative Velocity:</strong> {parseFloat(selectedAsteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2)} km/h</p>
          </div>
        </div>
      )}
    </div>
</>
  );
};

export default Neows;
