import React, { useState } from 'react';
import { FaBars, FaTimes, FaDesktop, FaTable, FaTh, FaClipboard, FaDatabase, FaCogs, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isRegisterAssetOpen, setRegisterAssetOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleRegister = () => setRegisterOpen(!isRegisterOpen);
  const toggleRegisterAsset = () => setRegisterAssetOpen(!isRegisterAssetOpen);

  return (
    <div className="flex">
      <div className={`fixed top-0 left-0 w-72 h-full bg-purple-300 text-white transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <FaTimes className="text-2xl cursor-pointer" onClick={toggleSidebar} />
        </div>  
        <div className="mt-10 text-xl flex flex-col gap-1">
        <Link to={"/"}><div className="px-4 py-4 hover:bg-purple-500 cursor-pointer"><FaDesktop className="inline-block mr-2" />Dashboard</div></Link>
        <Link to={"/register"}><div className="px-4 py-4 hover:bg-purple-500 cursor-pointer"><FaTable className="inline-block mr-2" />Register</div></Link>
        <Link to={"/search"}><div className="px-4 py-4 hover:bg-purple-500 cursor-pointer"><FaTh className="inline-block mr-2" />Search</div></Link>
        <Link to={"/mutation"}><div className="px-4 py-4 hover:bg-purple-500 cursor-pointer"><FaClipboard className="inline-block mr-2" />Mutation</div></Link>
        <Link to={"/records"}> <div className="px-4 py-4 hover:bg-purple-500 cursor-pointer"><FaDatabase className="inline-block mr-2" />Records</div></Link>
        <Link to={"/vendorlist"}><div className="px-4 py-4 hover:bg-purple-500 cursor-pointer"><FaDatabase className="inline-block mr-2" />Vendor List</div></Link>
        </div>
      </div>

      <div className="flex-grow">
        <div className="p-4">
          <FaBars className="text-2xl cursor-pointer" onClick={toggleSidebar} />
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
