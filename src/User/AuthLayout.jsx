import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import bg from '../assets/bgg.jpg'


const AuthLayout = () => {

  const accessToken = localStorage.getItem("access");
  const nav = useNavigate()

  useEffect(() => {
    if (accessToken){
      nav('/index')
    }
  }, [])
  
  return (
    <div>
      <div className="py-40 h-screen  " style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className=" bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm   max-sm:mt-16">
                <div className=" p-8 ">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center"></h2>
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                    <a href="#" className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                        
                    </a>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                        <a href="#" className="text-xs text-center text-gray-500 uppercase">login with email</a>
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                    </div>
                    <Outlet />
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthLayout