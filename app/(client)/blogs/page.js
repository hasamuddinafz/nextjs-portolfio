import react from 'react';
import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link'; // Use Link from Next.js for client-side navigation
import Image from 'next/image';
// import { baseURL } from '../Urls'; // Adjust the import path based on your project structure
async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/`, { method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data = await res.json();
  return data;
}
async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/`, { method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data = await res.json();
  return data;
}


export default async function Blogs() {
  const posts = await getPosts();
  const categories = await getCategories();
  // const [posts, setPosts] = useState([]);
  // // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [error, setError] = useState();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(5);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/api/posts/`);
  //       setPosts(response.data);
  //     } catch (error) {
  //       // Handle error
  //       console.error('Error fetching posts:', error.message);
  //       setError('Failed to fetch posts. Please try again later.');
  //     }
  //   };

  //   fetchPosts();

  //   const fetchCategories = async () => {
  //     try {
  //       const categoryResponse = await axios.get(`http://localhost:3000/api/categories/`);
  //       setCategories(categoryResponse.data);
  //     } catch (error) {
  //       // Handle error
  //       console.error('Error fetching categories:', error.message);
  //       setError('Failed to fetch categories. Please try again later.');
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  // const handleCategoryClick = async (categoryId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/api/posts/getPostByCategory?category=${categoryId}`);
  //     setPosts(response.data);
  //     setSelectedCategory(categoryId);
  //   } catch (error) {
  //     // Handle error
  //     console.error('Error fetching posts by category:', error.message);
  //     setError('Failed to fetch posts by category. Please try again later.');
  //   }
  // };

  // const htmlToPlainTextAndSubstring = (html, maxLength) => {
  //   const plainText = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  //   return plainText.substring(0, maxLength);
  // };
  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, '');

  };
  const sanitizeHtml = (html, maxLength) => {
    // Allow only <img> tags
    const plainText =  DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
    return plainText.substring(0, maxLength);
  };
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
                      {/* <button
                        className={`btn btn-sm btn-outline-dark ${selectedCategory === category._id ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category._id)}
                      > */}
                        {category.category}
                      {/* </button> */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-screen">
              {/* {error && <div className="alert alert-danger">{error}</div>} */}
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
                      <p className="text-dark">{sanitizeHtml(post.description, 150)}...</p>
                      <Link className='text-orange-500' target='_blank' href={`/blogs/${post._id}`}>
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {/* <nav>
                <ul className="pagination justify-content-start">
                  {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(number => (
                    <li key={number + 1} className="page-item">
                      <button onClick={() => paginate(number + 1)} className="page-link">
                        {number + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
