import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <a href="https://csit.nu.ac.th/" className="hover:underline">CSIT</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <Link to='/'>
            <li>
              <p className="mr-4 hover:underline md:mr-6 ">About</p>
            </li>
          </Link>
          <Link to='/admin' rel="noopener noreferrer" target="_blank">
            <li>
              <p className="mr-4 hover:underline md:mr-6">Login admin</p>
            </li>
          </Link>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
