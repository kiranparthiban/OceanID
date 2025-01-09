import React, { useState } from "react";

const Upload = ({ baseUrl }) => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) {
      alert("Please choose a file first.");
      return;
    }

    setStatus("Uploading...");
    setResponse("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${baseUrl}/upload/`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (res.ok) {
        setStatus("Upload successful!");
        setResponse(JSON.stringify(result, null, 2));
      } else {
        setStatus("Error occurred during upload.");
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      setStatus("Error occurred during upload.");
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="generate-image-container">
      <div className="generated-image-box">
        {file ? (
          <img src={URL.createObjectURL(file)} alt="Selected" />
        ) : (
          <p className="placeholder-text">Choose an image to upload</p>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="prompt-bar"
      />
      <button onClick={uploadImage} className="generate-button">
        Upload and Classify
      </button>
      {/* Status Message */}
      {status && <div className="status-message">{status}</div>}
      {response && <pre className="response-text">{response}</pre>}
    </div>
  );
};

export default Upload;
