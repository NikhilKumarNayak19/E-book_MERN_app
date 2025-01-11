import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import{ FaArrowRightFromBracket }   from 'react-icons/fa'
import { useDispatch,useSelector } from 'react-redux'
import { authActions } from '../../redux/actions/auth.actions'
import { use } from 'react'

const Sidebar = () => {
   const dispatch = useDispatch()
   const history = useNavigate()
   const role = useSelector((state) => state.auth.role)
  return (
    <div className="bg -zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-auto lg:h-[100%]">
        <div className="flex items-center flex-col justify-center">
        {""}
        <img src={} className="h-[12vh]" />
        <p className = "nt-3 text-xl text-zinc-100 font-semibold">
            {data.username}
        </p>
        <p className="text-zinc-100 font-semibold text-sm">
            {data.email}
        </p>
        <div className="w-full mt-4-h-[1px] bg-zinc-500 hidden lg:block"></div>
        </div>
    {role === "user" && (
        <div className="flex flex-col items-center justify-center hidden lg:flex">
            <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
            >
                Settings
            </Link>
          </div>
    )}
          <button className = bg-zinc-900 w-3/6 lg:w-full wt-4 lg:mt-0 text-white font-semibold flex item-center justify-center py-2-rounded hover:bg-white hover:text-zinc-800" 
          onClick={() => {
            dispatch(authActions.logout());
            dispatch(authActions.chaneRole("user");
            localStorage.clear("id");
            localStorage.clear("token");
            localStorage.clear("role");
            history("/");
          }}
          >
              Log Out<FaArrowRightFromBracket className="ms-4" />
              </button>    
              div>      

  )
}

export default Sidebar