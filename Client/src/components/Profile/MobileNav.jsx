import React from 'react'
import { Link } from 'react-router-dom'

const MobileNav = () => {
  return (
    <div className= "full flex lg:hidden  items-center justify-between at-4" >
    <Link
     to="/profile"
     className="text-zinc-100 font -semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
     >Downloads
     </Link>
     <Link 
        to="/Profile/Recently Read"
        className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
    >Recently Read
    </Link>
    <Link
        to="/Profile/Settings"
        className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
        >Settings
        </Link>
        </div>
  )
}

export default MobileNav 