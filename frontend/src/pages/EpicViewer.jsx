import React, { useState } from 'react';

const EpicViewer = () => {
  const [date, setDate] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImages([]);
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/epic?date=${date}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setImages(data);
    } catch (err) {
      setError('Failed to fetch EPIC imagery.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="relative px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-xl">
              <span className="text-3xl">🌍</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 tracking-tight">
              NASA EPIC
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore Earth from space with NASA's Earth Polychromatic Imaging Camera
            </p>
            
            {/* Search Form */}
            <div onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-lg"
                />
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all disabled:opacity-50 font-medium shadow-lg"
                >
                  {loading ? '...' : 'Explore'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 shadow-sm">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Fetching Earth imagery...</p>
            </div>
          )}

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((img) => {
              const imgUrl = `https://epic.gsfc.nasa.gov/archive/natural/${img.date.split(' ')[0].replaceAll('-', '/')}/png/${img.image}.png?api_key=22RqS4n17JEOTTXGovheHtE0zQgQHJhDBISiCidQ`;
              return (
                <div 
                  key={img.identifier} 
                  className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 shadow-lg"
                  onClick={() => setSelectedImage({ ...img, imgUrl })}
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={imgUrl} 
                      alt={img.caption} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                      {img.caption.slice(0, 50)}...
                    </h3>
                    <p className="text-sm text-gray-500">{img.date}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto border border-gray-200 shadow-2xl">
            <div className="relative">
              <button 
                onClick={() => setSelectedImage(null)} 
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all shadow-lg"
              >
                ×
              </button>
              <div className="p-6">
                <img 
                  src={selectedImage.imgUrl} 
                  alt="Full view" 
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-lg" 
                />
              </div>
            </div>
            <div className="px-6 pb-6 text-gray-800">
              <h3 className="text-2xl font-bold mb-3">{selectedImage.caption}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p><span className="text-blue-600 font-medium">Date:</span> {selectedImage.date}</p>
                  <p><span className="text-blue-600 font-medium">Latitude:</span> {selectedImage.centroid_coordinates.lat}°</p>
                  <p><span className="text-blue-600 font-medium">Longitude:</span> {selectedImage.centroid_coordinates.lon}°</p>
                </div>
                <div className="space-y-2">
                  <p><span className="text-blue-600 font-medium">Sun X:</span> {selectedImage.sun_j2000_position.x.toFixed(2)}</p>
                  <p><span className="text-blue-600 font-medium">Sun Y:</span> {selectedImage.sun_j2000_position.y.toFixed(2)}</p>
                  <p><span className="text-blue-600 font-medium">Moon X:</span> {selectedImage.lunar_j2000_position.x.toFixed(2)}</p>
                  <p><span className="text-blue-600 font-medium">Moon Y:</span> {selectedImage.lunar_j2000_position.y.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpicViewer;