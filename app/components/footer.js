import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <div className="bg-gray-800 py-10 text-white">
      <footer className="max-w-screen-xl mx-auto px-4">
        <div className="footer-content flex flex-col md:flex-row justify-between items-center">
          <div className="logo mb-6 md:mb-6">
            <Link href="/" className="flex items-center justify-center md:justify-start">
              <Image src="/images/logo.png" width={50} height={50} alt="Logo" />
              <h1 className="px-3 text-lg">Hasamuddin.com</h1>
            </Link>
            <span className="block text-gray-400 mt-2 text-center md:text-left">
              Establish a connection with the <span className="text-orange-500">world</span>
            </span>
          </div>
          <div className="subscribe-input w-full md:w-auto">
            {/* <form className="w-full max-w-sm mx-auto md:mx-0">
              <div className="flex flex-col md:flex-row items-center border-b border-orange-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none mb-4 md:mb-0"
                  type="text"
                  placeholder="Email here"
                  aria-label="Email"
                />
                <button
                  className="flex-shrink-0 bg-orange-500 hover:bg-orange-700 border-orange-500 hover:border-orange-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="button"
                >
                  Subscribe
                </button>
              </div>
            </form> */}
          </div>
        </div>
        <hr />
        <p className="text-center py-5 text-gray-400">
          <span className="text-orange-500">Hasamuddin.com</span> All rights reserved © 2024
        </p>
      </footer>
    </div>
  );
}

export default Footer;
