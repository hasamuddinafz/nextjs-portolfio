'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 py-5">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <div className="logo flex items-center">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" width={50} height={50} alt="Logo" />
            <h1 className="px-3 md:text-2xl text-orange-500">
              <span className="poppins-extra-black">Hasamuddin</span>.com
            </h1>
          </Link>
        </div>
        <div className="hidden md:flex nav-items poppins-bold text-gray-600">
          <ul className="flex">
            <li className="p-3">
              <Link href="/">Home</Link>
            </li>
            <li className="p-3">
              <Link href="/blogs">Blog</Link>
            </li>
            <li className="p-3">
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li className="p-3">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col items-center mt-4 poppins-bold text-gray-600">
            <li className="p-3">
              <Link href="/">Home</Link>
            </li>
            <li className="p-3">
              <Link href="/blogs">Blog</Link>
            </li>
            <li className="p-3">
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li className="p-3">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
