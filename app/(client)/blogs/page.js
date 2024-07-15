import react from 'react';

import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link'; // Use Link from Next.js for client-side navigation
import Image from 'next/image';
// import { baseURL } from '../Urls'; // Adjust the import path based on your project structure
async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      const errorText = await res.text(); // Read error response body as text
      console.error('Fetch error:', res.status, errorText);
      throw new Error('Failed to fetch posts');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('An error occurred while fetching posts:', error);
    throw error;
  }
}

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      const errorText = await res.text(); // Read error response body as text
      console.error('Fetch error:', res.status, errorText);
      throw new Error('Failed to fetch categories');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('An error occurred while fetching categories:', error);
    throw error;
  }
}


export default async function Blogs() {
  let posts = [];
  let categories = [];

  try {
    posts = await getPosts();
    categories = await getCategories();
    JSON.stringify(posts);

  } catch (error) {
    console.error('Failed to fetch data:', error);
    // Handle or log the error appropriately
  }

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, '');

  };
  const sanitizeHtml = (html, maxLength) => {
    const plainText =  DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
    return plainText.substring(0, maxLength);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <header className="text-center text-black bg-light py-10">
        <div className="container">
          <h1 className="poppins-bold text-5xl py-5">My<span className="orange-color"> Blogs </span> </h1>
          <hr />
        </div>
      </header>

      <div className="bg-light py-5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row-reverse">

            <div className="md:py-5 p-4 md:w-2/4">
              <div className="bg-gray-50 border p-4">
                <h3 className="py-5 text-3xl poppins-bold">Categories</h3>
                <hr />
                <ul className="my-4">
                  {categories.map(category => (
                    <li key={category._id} className="my-2 bg-white border p-3">

                        {category.category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-screen">
              {posts.map(post => (
                <div key={post._id} className="bg-gray-50 border m-4 md:my-4">
                  <div className="flex flex-col md:flex-row justify-center items-center p-4 md:p-4">
                    <div>
                      <Image src={`${post.image}`} width={400} height={400} className="card-img-top img-fluid w-full h-full" alt="Blog" />
                    </div>
                    <div className='md:p-4 md:w-3/4 py-4 px-2'>
                      <Link href={`/blog/${post._id}`}>
                          <h4 className="text-2xl font-bold">{post.title}</h4>
                      </Link>
                      <p className="text-gray-600">{new Date(post.createdAt).toISOString().split('T')[0]} | <span className="font-bold text-danger"> {post.category.category} </span></p>
                      <div className="text-dark"dangerouslySetInnerHTML={{__html: sanitizeHtml(post.description, 150)}} />...
                      <Link className='text-orange-500' target='_blank' href={`/blogs/${post._id}`}>
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
