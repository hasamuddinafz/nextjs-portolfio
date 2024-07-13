'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false
});

function AddPost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const editor = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/`, { withCredentials: true });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        title,
        description,
        image,
        category,
        tags
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/`, postData);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Failed', error.response.data);
      } else {
        console.error('Error', error.message);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="p-3 text-white bg-gray-800 rounded-lg">Add Post</h3>
        <div className="p-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="block text-gray-700">Post Title</label>
              <input
                type="text"
                className="form-control block w-full p-2 border rounded"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="block text-gray-700">Header Image</label>
              <input
                type="text"
                className="form-control block w-full p-2 border rounded"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700" htmlFor="category">Category</label>
              <select
                className="form-select block w-full p-2 border rounded"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value='choose'>Choose...</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>{category.category}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="block text-gray-700">Tags</label>
              <input
                type="text"
                className="form-control block w-full p-2 border rounded"
                id="tags"
                placeholder="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <JoditEditor
              ref={editor}
              value={description}
              tabIndex={1}
              onBlur={newContent => setDescription(newContent)}
              onChange={newContent => {}}
              config={{
                uploader: {
                  insertImageAsBase64URI: true,
                }
              }}
            />
            <div className="flex justify-between">
              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Add Post</button>
              <button type="button" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Show All Posts</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
