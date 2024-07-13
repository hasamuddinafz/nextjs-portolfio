'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/contacts`, { withCredentials: true });
        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getContacts();
  }, []);

  const handleDelete = async (contactId) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`localhost/api/contacts/${contactId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setContacts(contacts.filter(contact => contact._id !== contactId));
    } catch (error) {
      console.error('Failed to delete contact', error);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="p-3 text-white bg-gray-800 rounded-lg">All Users</h3>
        <div className="flex justify-between py-3">
          <div className="flex-grow">
            <input type="email" className="form-control w-full p-2 border rounded" placeholder="Search By email" />
          </div>
          <div className="ml-4">
            <button className="btn btn-warning w-full text-white" data-bs-toggle="modal" data-bs-target="#userModel">
              <i className="bi bi-plus-circle-fill"></i> Add User
            </button>
          </div>
        </div>

        <div className="modal fade" id="userModel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input type="text" className="form-control block w-full p-2 border rounded" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" className="form-control block w-full p-2 border rounded" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password" className="form-control block w-full p-2 border rounded" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Add User</button>
                  </div>
                </form> */}
              </div>
            </div>
          </div>
        </div>

        <div className="p-3">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts && contacts.map((contact, index) => (
                <tr key={contact._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{contact.fullname}</td>
                  <td className="border px-4 py-2">{contact.email}</td>
                  <td className="border px-4 py-2">{contact.message}</td>
                  <td className="border px-4 py-2">
                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(contact._id)}>
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
