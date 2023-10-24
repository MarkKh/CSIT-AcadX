import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="flex flex-wrap justify-center items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="mr-4">
            © 2023 <a href="https://csit.nu.ac.th/" className="hover:underline">CSIT</a>. All Rights Reserved.
          </span>

          <div className="md:flex md:items-center md:justify-between">
            <Link to='/admin' rel="noopener noreferrer" target="_blank">
              <p className="mr-4 hover:underline">Admin Login</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
