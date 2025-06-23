import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"

function APODForm() {
  const [queryType, setQueryType] = useState("date");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState("");
  const [thumbs, setThumbs] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    //https://cosmos-iuck.onrender.com
    // http://localhost:5000/
    let url = "https://cosmos-iuck.onrender.com/api/apod?";
    const params = [];

    if (queryType === "date" && date) params.push(`date=${date}`);
    else if (queryType === "range") {
      if (startDate) params.push(`start_date=${startDate}`);
      if (endDate) params.push(`end_date=${endDate}`);
    } else if (queryType === "count" && count) params.push(`count=${count}`);
    if (thumbs) params.push("thumbs=true");

    try {
      const res = await axios.get(url + params.join("&"));
      setResults(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item) => setModalData(item);
  const closeModal = () => setModalData(null);

  return (
    <>
     <Navbar />
    
    <div className=" bg-gray-50 py-10 px-4">
      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">🚀 NASA APOD Explorer</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            {["date", "range", "count"].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input type="radio" checked={queryType === type} onChange={() => setQueryType(type)} />
                {type}
              </label>
            ))}
          </div>

          {queryType === "date" && (
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          )}
          {queryType === "range" && (
            <div className="flex gap-2">
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full border p-2 rounded" />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border p-2 rounded" />
            </div>
          )}
          {queryType === "count" && (
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter count"
              required
            />
          )}

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={thumbs} onChange={() => setThumbs(!thumbs)} />
            Include thumbnails
          </label>

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            Fetch APOD
          </button>
        </form>
      </div>

      {/* Skeleton Loaders */}
      {loading && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-80" />
          ))}
        </div>
      )}

      {/* Cards */}
      {!loading && results.length > 0 && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-[1.02] transition"
              onClick={() => openModal(item)}
            >
              <img
                src={item.media_type === "image" ? item.url : item.thumbnail_url || ""}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{item.date}</p>
                <p className="mt-2 text-sm text-gray-800 line-clamp-3">{item.explanation.slice(0, 120)}...</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-transparent bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl p-6 rounded-xl relative shadow-xl max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-2 right-3 text-gray-500 text-xl font-bold hover:text-red-500">×</button>
            <h2 className="text-2xl font-bold mb-2">{modalData.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{modalData.date}</p>
            {modalData.media_type === "image" ? (
              <img src={modalData.hdurl || modalData.url} alt={modalData.title} className="rounded mb-4" />
            ) : (
              <iframe
                src={modalData.url}
                title={modalData.title}
                className="w-full aspect-video rounded mb-4"
                allowFullScreen
              ></iframe>
            )}
            <p className="text-gray-800 text-sm whitespace-pre-line">{modalData.explanation}</p>
            {modalData.hdurl && (
              <a href={modalData.hdurl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-indigo-600 underline">
                View HD Image
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  </>
  );
}

export default APODForm;
