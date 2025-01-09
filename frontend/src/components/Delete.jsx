import React, { useState } from "react";

const Delete = ({ baseUrl }) => {
  const [imageId, setImageId] = useState("");
  const [response, setResponse] = useState("");

  const deleteHistory = async () => {
    if (!imageId) {
      alert("Please enter an Image ID.");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/history/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_id: imageId }),
      });
      const result = await res.json();

      setResponse(
        res.ok ? `Message: ${result.message}` : `Error: ${result.error}`
      );
    } catch (err) {
      setResponse(`Error: ${err.message}`);
    }
  };

  return (
    <div className="delete-history-popup">
      <input
        type="number"
        placeholder="Enter Image ID"
        value={imageId}
        onChange={(e) => setImageId(e.target.value)}
        className="delete-history-input"
      />
      <button onClick={deleteHistory} className="delete-button">
        Delete
      </button>
      <p>{response}</p>
    </div>
  );
};

export default Delete;
