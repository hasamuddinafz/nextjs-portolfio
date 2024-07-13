'use client'

import { useEffect, useState } from "react";

import Link from 'next/link';
import axios from 'axios';

// async function getposts(){
//     const response = await fetch(`${process.env.domain}/api/posts/`, {
//         method: 'GET'
//     });
//     if(!response.ok){
//         throw new Error("failed to fetch API data");
//     }
//     return response.json();
//     // console.log(response.json());
// }

 function Post() {
    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     const getPosts = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3000/api/posts/`, {
    //                 method: 'GET'
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch posts');
    //             }
    //             const postData = await response.json();
    //             setPosts(postData); // Update state with fetched data
    //             console.log(posts);
    //         } catch (error) {
    //             console.error('Error fetching posts:', error);
    //         }
    //     };

    //     getPosts(); // Call the function to fetch posts

    // }, []); 
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch(`/api/posts`, { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };
        getPosts();

        const getCategories = async () => {
            try {
                const response = await fetch(`/api/categories`, { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };
        getCategories();
    }, []); // Removed [blogs] from dependency array to avoid infinite loop

    const handleDelete = async (postId) => {
        try {
          await axios.delete(`/api/posts?id=${postId}`);
          // Assuming setBlogs updates your state or list of posts after deletion
          setBlogs(blogs.filter(blog => blog._id !== postId));
        } catch (error) {
          console.error('Failed to delete post', error);
        }
      };

    return (
        <div className="p-4">
            <h1></h1>
            <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="p-3 text-white bg-gray-800 rounded-lg">All posts</h3>
                <div className="flex flex-wrap py-4">
                    <div className="w-full md:w p-2">
                        <form>
                            <div className="flex items-center mb-4">
                                <label className="mr-2">Search By Category</label>
                                <select className="p-2 border rounded" id="inputGroupSelect01">
                                    <option defaultValue>Choose...</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>{category.category}</option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-1/3 p-2">
                        <input type="text" className="p-2 border w-full rounded" placeholder="Search here" />
                    </div>
                    <div className="w-full md:w-1/6 p-2">
                            <Link href='/admin/addblog' className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded block text-center">Add Post</Link>
                    </div>
                </div>
                <table className="w-full text-left table-auto">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog._id} className="bg-gray-100 border-b">
                                <td className="px-4 py-2">{blog._id}</td>
                                <td className="px-4 py-2">{blog.title}</td>
                                <td className="px-4 py-2">{blog.category.category}</td>
                                <td className="px-4 py-2 flex">
                                <button onClick={() => handleDelete(blog._id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded mr-2">Delete</button>
                                    <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Post;
