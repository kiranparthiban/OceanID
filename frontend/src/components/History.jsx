import React, { useEffect, useState } from "react";

const History = ({ baseUrl }) => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${baseUrl}/history/`);
        const data = await res.json();

        if (res.ok) {
          setHistory(data);
        } else {
          setError(data.error || "Failed to fetch history");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchHistory();
  }, [baseUrl]);

  return (
    <div className="fetch-history-container">
      <h2>History</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="history-list">
        {history.map((item) => (
          <div key={item.image_id} className="history-item">
            <img
              src={item.image_url}
              alt={`History ${item.image_id}`}
              className="history-image"
            />
            <div className="history-info">
              <p><strong>ID:</strong> {item.image_id}</p>
              <p><strong>Data:</strong> {item.species_data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
