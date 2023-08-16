import React, { useState } from 'react';

const Navbar = () => {
  const [activeButton, setActiveButton] = useState('home');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleNav = () => {
    const navbar = document.getElementById('navbar-default');
    navbar.classList.toggle('hidden');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
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
              <a
                href="#"
                className={`block py-2 pl-3 pr-4 rounded ${
                  activeButton === 'home'
                    ? 'text-white bg-purple-700 md:bg-transparent md:text-purple-700 md:p-0 dark:text-white md:dark:text-purple-500'
                    : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }`}
                onClick={() => handleButtonClick('home')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block py-2 pl-3 pr-4 rounded ${
                  activeButton === 'reports'
                    ? 'text-white bg-purple-700 md:bg-transparent md:text-purple-700 md:p-0 dark:text-white md:dark:text-purple-500'
                    : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }`}
                onClick={() => handleButtonClick('reports')}
              >
                Reports
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block py-2 pl-3 pr-4 rounded ${
                  activeButton === 'coop'
                    ? 'text-white bg-purple-700 md:bg-transparent md:text-purple-700 md:p-0 dark:text-white md:dark:text-purple-500'
                    : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }`}
                onClick={() => handleButtonClick('coop')}
              >
                Coop
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
