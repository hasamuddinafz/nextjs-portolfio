'use client'
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Contact() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/contacts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ fullname: '', email: '', phone: '', subject: '', message: '' });
        setError(null);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('There was an error with your submission. Please try again later.');
    }
  };
  

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className='max-w-screen-xl mx-auto p-5'>
        <section className="mt-10">
          <div className="container">
            <div className="block">
              <div className="">
                <h3 className="text-4xl poppins-bold text-secondary text-uppercase">Contact</h3>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="flex flex-col md:flex-row  justify-between gy-4 gy-md-5 gy-lg-0 align-items-md-center">
              <div className="md:w-2/4 my-10">
                <div className="border overflow-hidden">
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-4 gy-xl-5 p-xl-5 p-4 md:p-10">
                      <div className="col-12">
                        <label htmlFor="fullname" className="form-label">
                          Full Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="border-2 border-gray-300 rounded py-2 px-2 my-3 w-full block"
                          id="fullname"
                          name="fullname"
                          required
                          value={formData.fullname}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12 my-5 col-md-6">
                        <label htmlFor="email" className="form-label">
                          Email <span className="text-red-600">*</span>
                        </label>
                        <div className="input-group">
                          <input
                            type="email"
                            className="border-2 border-gray-300 rounded py-2 px-2 my-3 w-full block"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <div className="input-group">
                          <input
                            type="tel"
                            className="border-2 border-gray-300 rounded py-2 px-2 my-3 w-full block"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 my-5">
                        <label htmlFor="subject" className="form-label">
                          Subject <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="border-2 border-gray-300 rounded py-2 px-2 my-3 w-full block"
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12 my-5">
                        <label htmlFor="message" className="form-label">
                          Message <span className="text-red-600">*</span>
                        </label>
                        <textarea
                          className="border-2 border-gray-300 rounded py-2 px-2 my-3 w-full block"
                          id="message"
                          name="message"
                          rows="3"
                          required
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="col-12 my-5">
                        <div className="d-grid">
                          <button className="bg-orange-500 w-full rounded px-5 py-2 text-white poppins-bold hover:bg-orange-600" type="submit">
                            Send Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="md:w-2/4 md:m-10 md:px-10 p-4">
                <div className="row justify-content-xl-center">
                  <div className="col-12 col-xl-11">
                    <div className="mb-10 mb-md-5">
                      <div className="mb-3 text-orange-500 md:text-5xl text-4xl"><i className="bi bi-geo-fill"></i></div>
                      <div>
                        <h4 className="mb-2 md:text-3xl text-2xl poppins-bold">Office</h4>
                        <p className="mb-2">Please visit us to have a discussion.</p>
                        <hr className="w-50 mb-3 border-dark-subtle" />
                        <address className="m-0 text-secondary">Karabuk, Turkey</address>
                      </div>
                    </div>
                    <div className="row mb-sm-4 mb-md-5">
                      <div className="col-12 col-sm-6">
                        <div className="mb-10 mb-sm-0">
                          <div className="mb-3 text-orange-500 md:text-5xl text-4xl"><i className="bi bi-telephone-outbound"></i></div>
                          <div>
                            <h4 className="mb-2 md:text-3xl text-2xl poppins-bold">Phone</h4>
                            <p className="mb-2">Please speak with us directly.</p>
                            <hr className="w-75 mb-3 border-dark-subtle" />
                            <p className="mb-0">
                              <a className="poppins-bold text-gray-600 text-decoration-none" href="tel:+905415654560">+90 541 565 45 60</a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="mb-10 mb-sm-0">
                          <div className="mb-3 text-orange-500 md:text-5xl text-4xl"><i className="bi bi-envelope-at"></i></div>
                          <div>
                            <h4 className="mb-2 md:text-3xl text-2xl poppins-bold">Email</h4>
                            <p className="mb-2">Please write to us directly.</p>
                            <hr className="w-75 mb-3 border-dark-subtle" />
                            <p className="mb-0">
                              <a className="poppins-bold text-gray-600 text-decoration-none" href="mailto:hasamuddin.afz@gmail.com">hasamuddin.afz@gmail.com</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mb10'>
                      <div className="mb-4 text-orange-500 md:text-5xl text-4xl"><i className="bi bi-alarm"></i></div>
                      <div>
                        <h4 className="mb-2 md:text-3xl text-2xl poppins-bold">Opening Hours</h4>
                        <p className="mb-2">Explore our business opening hours.</p>
                        <hr className="w-50 mb-3 border-dark-subtle" />
                        <div className="flex mb-1">
                          <p className="text-gray-600 poppins-extra-bold mb-0 me-5">Mon - Fri</p>
                          <p className="text-gray-600 mb-0">9am - 5pm</p>
                        </div>
                        <div className="flex">
                          <p className="text-gray-600 poppins-extra-bold mb-0 me-5">Sat - Sun</p>
                          <p className="text-gray-600 mb-0">Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
