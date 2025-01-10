import React from 'react';

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#27272a", // Zinc 800 in Tailwind
        color: "white",
        padding: "16px", // Add padding for spacing
        alignItems: "center", // Align items vertically
        justifyContent: "center", // Center items horizontally
        height: "100px", // Adjust height if needed
      }}
    >
      <h1
        style={{
          fontSize: "1rem", // Adjust font size for better fit
          fontWeight: 600,
          textAlign: "center", // Center text alignment
        }}
      >
        &copy; 2024 LegalReads. All Rights Reserved
      </h1>
    </div>
  );
};

export default Footer;
