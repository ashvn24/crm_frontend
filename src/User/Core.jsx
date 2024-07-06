import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Core = () => {

    const nav = useNavigate()

    useEffect(() => {
    const access = localStorage.getItem('access')
    if (access==null){
        toast.error('login first')
        nav('/')
    }
    }, [])
    
  return (
    <div>
      <Navbar />
      <div className="bg-[#F2F7FF]">
        <Hero />
      </div>
    </div>
  );
};

export default Core;
