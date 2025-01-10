import React from "react";
import logoimage from "C:\\Users\\Nikhil Kumar Nayak\\Desktop\\E-book_MERN_app\\Client\\src\\assets\\LegalReads_logo-removebg-preview.png";

const Navbar = () => {
  const links = [

    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "Resources",
      link: "/resources",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#27272a", // Zinc 800 in Tailwind
        color: "white",
        padding: "8px 16px", // py-2 and px-4
        alignItems: "center", // Align items vertically
        justifyContent: "space-between", // Spread items horizontally
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center", // Align logo and text vertically
        }}
      >
        <img
          src={logoimage}
          alt="logo"
          style={{
            width: "60px",
            height: "auto",
            marginRight: "10px",
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

      {/* Navigation Links and Buttons Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center", // Align links and buttons vertically
          gap: "20px", // Space between the links and buttons
        }}
      >
        {/* Navigation Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px", // Space between navigation links
          }}
        >
          {links.map((link) => (
            <a
              key={link.title}
              href={link.link}
              style={{
                color: "white",
                textDecoration: "none",
                transition: "all 0.3s ease", // Smooth hover effect
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#3B82F6"; // Hover color (blue-500)
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white"; // Original color
              }}
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px", // Space between buttons
          }}
        >
          <button
            style={{
              backgroundColor: "#27272a", // Zinc-800
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid blue",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#FFFFFF"; // Change background to white on hover
              e.target.style.color = "#000000"; // Change text to black on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#27272a"; // Revert background
              e.target.style.color = "#FFFFFF"; // Revert text color
            }}
          >
            LogIn
          </button>

        
        </div>
      </div>
    </div>
  );
};

export default Navbar;
