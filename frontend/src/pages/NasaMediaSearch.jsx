import { useState } from "react";
import axios from "axios";
import Navbar from '../components/Navbar'

function NasaMediaSearch() {
  const [query, setQuery] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeAsset, setActiveAsset] = useState(null);

  const searchMedia = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/nasa/search?q=${query}&media_type=${mediaType}`);
      setResults(res.data.collection.items || []);
    } catch {
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchAsset = async (nasa_id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/nasa/asset/${nasa_id}`);
      setActiveAsset({ nasa_id, files: res.data.collection.items });
    } catch {
      alert("Could not fetch asset");
    }
  };

  return (
    <>
    <Navbar />
    <div className="bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">🔎 NASA Media Search</h2>
        <form onSubmit={searchMedia} className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search by keyword (e.g. Mars, Earth, Moon)"
            className="flex-1 border p-2 rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="border p-2 rounded" value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Search</button>
        </form>
      </div>

      {/* Results */}
      {loading && <p className="text-center mt-6">Loading...</p>}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {results.map((item, i) => {
            const data = item.data[0];
            const thumb = item.links?.[0]?.href || "";
            return (
              <div
                key={i}
                className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:scale-105 transition"
                onClick={() => fetchAsset(data.nasa_id)}
              >
                <img src={thumb} alt={data.title} className="w-full h-56 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.date_created?.split("T")[0]}</p>
                  <p className="text-sm mt-2 text-gray-700 line-clamp-3">{data.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Asset Files */}
      {activeAsset && (
        <div className="fixed inset-0 bg-transparent bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-3xl w-full p-6 rounded-lg relative max-h-[90vh] overflow-y-auto">
            <button className="absolute top-2 right-4 text-2xl" onClick={() => setActiveAsset(null)}>
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">📦 Asset: {activeAsset.nasa_id}</h2>
            <ul className="space-y-2">
              {activeAsset.files.map((file, i) => (
                <li key={i} className="text-blue-600 underline break-words">
                  <a href={file.href} target="_blank" rel="noreferrer">{file.href}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  </>
  );
}

export default NasaMediaSearch;
