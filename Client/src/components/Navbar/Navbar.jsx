import React from 'react';
import logoimage from 'C:\\Users\\Nikhil Kumar Nayak\\Desktop\\E-book_MERN_app\\Client\\src\\assets\\LegalReads_logo-removebg-preview.png';
// Adjusted path

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#27272a", // Zinc 800 in Tailwind is #27272a
        color: "white",
        padding: "8px 16px", // py-2 (8px top/bottom) and px-4 (16px left/right)
        alignItems: "center", // Corresponds to items-center in Tailwind CSS
        justifyContent: "space-between", // Corresponds to justify-between in Tailwind CSS
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center", // Corresponds to items-center in Tailwind CSS
        }}
      >
        <img
          src={logoimage} // Use the imported variable here
          alt="logo"
          style={{
            width: "60px", // Adjusted width
            height: "auto", // Maintain aspect ratio
            marginRight: "10px", // Space between the image and text
          }}
        />
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
          }}
        >
          LegalReads
        </h1>
      </div>
      <div>links</div>
    </div>
  );
};

export default Navbar;
