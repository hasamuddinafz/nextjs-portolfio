'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

function Category() {
  const [parentCategory, setParentCategory] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`/api/categories/`, { withCredentials: true })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    try {
      await axios.post(`/api/categories`, { parentCategory, category }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Refresh categories after adding a new one
      axios.get(`/api/categories/`, { withCredentials: true })
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    } catch (error) {
      console.error('Failed', error.response.data);
    }
  };

  const handleDelete = async(categoryId) => {
    try {
      const token = sessionStorage.getItem('token');

      await axios.delete(`/api/categories/${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCategories(categories.filter(category => category._id !== categoryId));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="p-3 text-white bg-gray-800 rounded-lg">All Categories</h3>
        <div className="flex justify-between py-3">
          <div className="flex-grow">
            <input type="email" className="form-control w-full p-2 border rounded" placeholder="Search By Category" />
          </div>
          <div className="ml-4">
            <button className="btn btn-warning w-full text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i className="bi bi-plus-circle-fill"></i> Add Category
            </button>
          </div>
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Insert Category</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="category" className="block text-gray-700">Category Name</label>
                    <input type="text" className="form-control block w-full p-2 border rounded" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="parentCategory" className="block text-gray-700">Parent Category</label>
                    <select className="form-select block w-full p-2 border rounded" id="parentCategory" value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
                      <option value="">Select parent category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Add Category</button>
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
                <th className="px-4 py-2">Category Name</th>
                <th className="px-4 py-2">Parent Category</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{category._id}</td>
                  <td className="border px-4 py-2">{category.category}</td>
                  <td className="border px-4 py-2">{category.parentCategoryName}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleDelete(category._id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded mr-2"><i className="bi bi-trash3-fill"></i>Delete</button>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"><i className="bi bi-pencil-square"></i>Edit</button>
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

export default Category;
