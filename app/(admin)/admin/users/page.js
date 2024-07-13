'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`/api/users`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(`/api/users`, { name, email, password });
      console.log(response);
    } catch (error) {
      console.error('Failed', error.response.data);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/users?id=${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Failed to delete user', error);
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
                <form onSubmit={handleSubmit}>
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
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((user, index) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user._id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleDelete(user._id)}>
                      <i className="bi bi-trash3-fill"></i> Delete
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
                      <i className="bi bi-pencil-square"></i> Edit
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

export default Users;
