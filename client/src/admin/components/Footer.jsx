import React from 'react';
import { GithubIcon } from '../icons'

function Footer() {
    return (
        <footer>
            <div className="mx-auto p-2 md:py-5">
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 flex items-center justify-center">
                   <GithubIcon className="w-5 h-5 mr-1" aria-hidden="true" />
                    <a href="https://github.com/MarkKh" className="hover:underline">Made by Mark Kh</a>
                </span>

            </div>
        </footer>
    );
}

export default Footer;
