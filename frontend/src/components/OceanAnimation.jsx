import React from "react";
import "./OceanAnimation.css"; // Ensure the styles are imported from a separate CSS file

const OceanAnimation = () => {
  return (
    <div className="ocean">
      <div className="bubbles">
        {[...Array(8)].map((_, i) => (
          <span key={i}></span> // Dynamically create the bubble spans
        ))}
      </div>
      <div className="fish">
        {/* Eyes */}
        <span></span>
        <span></span>
        {/* Mouth */}
        <span></span>
        {/* Bubbles */}
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default OceanAnimation;
