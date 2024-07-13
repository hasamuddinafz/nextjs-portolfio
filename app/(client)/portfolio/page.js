'use client'
import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import Image from 'next/image'
import Link from 'next/link'

function Portfolio() {
  return (
    <div>
      <div className='bg-gif'>
        <div className='max-w-screen-xl mx-auto p-5 text-white py-10'>
          <div className='flex flex-col-reverse sm:flex-row justify-around items-center py-5'>
            <div className='text-center sm:text-left *:container *:mx-auto'>
              <span className='poppins-bold'>👋 Hi I am Hasamuddin AFZALI</span>
              <h1 className='poppins-extra-black text-orange-600 my-5 text-5xl'>
                <Typewriter className="" words={['Fullstack Web Developer', 'Graphic Designer']} loop={Infinity} cursor cursorStyle='_' typeSpeed={150} deleteSpeed={100} delaySpeed={1000} />
              </h1>
              <p className='text-light block my-10 w-2/3'>
                Hello! I&lsquo;m Hasamuddin Afzali, a passionate computer engineer, full-stack web developer, and graphic designer based in Karabuk, Turkey. With a keen eye for detail and a love for creative problem-solving, I thrive in the dynamic intersection of technology and design.
              </p>
              <Link href='/contact' className='bg-orange-500 px-4 py-3 hover:bg-orange-600 my-10'>
              Contact Me
              </Link>
            </div>
            <div className='my-5 py-5 sm:py-0 sm:my-0'>
              <Image src='/images/portfolio.jpg' width={700} height={700} alt="Portfolio Image" className='img-hero img-fluid' />
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-screen-xl mx-auto p-4'>
        <div className='flex flex-col sm:flex-row justify-around items-center py-10 my-10'>
          <div className=''>
            <Image src='/images/about.png' width={400} height={400} alt="Web Illustration" className='img-fluid' />
          </div>
          <div className='text-center sm:text-left my-5 sm:my-0 md:w-2/4 '>
            <h2 className='poppins-bold'>About Me</h2>
            <p className='block my-10'>
              Hello! I&lsquo;m Hasamuddin Afzali, a passionate computer engineer, full-stack web developer, and graphic designer based in Karabuk, Turkey. With a keen eye for detail and a love for creative problem-solving, I thrive in the dynamic intersection of technology and design.
            </p>
            <Link href="/images/CV.pdf" className='bg-orange-500 px-5 py-3 hover:bg-orange-600 text-white poppins-bold' download="CV.pdf">
            Download CV
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
