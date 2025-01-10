import React from 'react'
import Hero from '../components/Home/Hero'

const Home = () => {
  return (
    <div style={{
        display: "flex",
        backgroundColor: "#18181b", // Zinc 900 in Tailwind
        color: "white",
        padding: "32px 40px", // py-8 and px-10
     }}
      >
        <Hero />
      </div>
  )
}

export default Home