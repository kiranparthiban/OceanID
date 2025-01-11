import React, { useState } from "react";
import Upload from "./components/Upload";
import History from "./components/History";
import DeleteHistory from "./components/DeleteHistory";
import OceanAnimation from "./components/OceanAnimation";
import "./App.css";

const App = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [historyTrigger, setHistoryTrigger] = useState(0); // Trigger for refreshing history

  const handleUploadSuccess = () => {
    setHistoryTrigger((prev) => prev + 1); // Increment trigger to refresh history
  };

  return (
    <div className="app">
      {/* Ocean Animation */}
      <OceanAnimation />

      {/* Top Buttons */}
      <div className="top-buttons">
        <button
          className="view-history-button"
          onClick={() => setShowHistory(true)}
        >
          View Classification History
        </button>
        <button
          className="delete-history-button"
          onClick={() => setShowDelete(!showDelete)}
        >
          {showDelete ? "Close Delete" : "Delete History"}
        </button>
      </div>

      {/* Sliding Sidebar */}
      <div className={`history-sidebar ${showHistory ? "open" : ""}`}>
        <button
          className="close-sidebar-button"
          onClick={() => setShowHistory(false)}
        >
          &times;
        </button>
        <History refreshTrigger={historyTrigger} />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Upload onSuccess={handleUploadSuccess} />
        {showDelete && <DeleteHistory />}
      </div>
    </div>
  );
};

export default App;
