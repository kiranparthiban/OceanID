import React, { useState } from "react";
import History from "./components/History";
import Delete from "./components/Delete";
import Upload from "./components/Upload";
import "./App.css";

const App = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const baseUrl = "http://127.0.0.1:8000/api";

  return (
    <div className="app">
      {/* Background Animation */}
      <div className="animated-background"></div>

      {/* History Sidebar */}
      <div className={`chat-history-panel ${showHistory ? "open" : ""}`}>
        <button
          className="close-chat-history"
          onClick={() => setShowHistory(false)}
        >
          &times;
        </button>
        <History baseUrl={baseUrl} />
      </div>

      {/* Top Bar */}
      <div className="top-bar">
        <button
          className="chat-history-toggle"
          onClick={() => setShowHistory(true)}
        >
          View History
        </button>
        <button
          className="delete-history-toggle"
          onClick={() => setShowDelete(!showDelete)}
        >
          Delete History
        </button>
      </div>

      {/* Delete History Popup */}
      {showDelete && (
        <div className="delete-history-container">
          <Delete baseUrl={baseUrl} />
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        <Upload baseUrl={baseUrl} />
      </div>
    </div>
  );
};

export default App;
