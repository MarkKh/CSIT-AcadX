import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoApp from '../assets/Logo-App.png';
import { HeartIcon } from "../../admin/icons";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    const navbar = document.getElementById('navbar-default');
    navbar.classList.toggle('hidden');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="" className="flex items-center">
          <img src={LogoApp} className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AcadX</span>
        </a>
        <button
          onClick={toggleNav}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`hidden w-full md:flex md:w-auto ${isDropdownOpen ? 'block' : 'hidden'}`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/index"
                className={`block py-2 pl-3 pr-4 rounded ${location.pathname === '/index'
                  ? 'text-white bg-purple-700 md:bg-transparent md:text-purple-700 md:p-0 dark:text-white md:dark:text-purple-500'
                  : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/reports"
                className={`block py-2 pl-3 pr-4 rounded ${location.pathname === '/reports'
                  ? 'text-white bg-purple-700 md:bg-transparent md:text-purple-700 md:p-0 dark:text-white md:dark:text-purple-500'
                  : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  }`}
              >
                Reports
              </Link>
            </li>
            <li>
              <Link
                to="/coop"
                className={`block py-2 pl-3 pr-4 rounded ${location.pathname === '/coop'
                  ? 'text-white bg-purple-700 md:bg-transparent md:text-purple-700 md:p-0 dark:text-white md:dark:text-purple-500'
                  : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover-bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  }`}
              >
                Coop
              </Link>
            </li>
            <li>
              <Link
                to="/like"
                className={`block py-2 pl-3 pr-4 rounded ${location.pathname === '/like'
                  ? 'text-white bg-purple-700 md:bg-transparent md:text-purple-700 md:p-0 dark:text-white md:dark:text-purple-500'
                  : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  }`}
              >
                Like
                <HeartIcon
                  className="w-6 h-6 inline-block ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
