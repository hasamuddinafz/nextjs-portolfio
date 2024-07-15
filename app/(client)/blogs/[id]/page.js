import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

async function getPost(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts?id=${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },});
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  const data = await res.json();
  return data;
}

const sanitizeHtml = (html) => {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ['img'] });
};

const BlogPost = async ({ params }) => {
  let post;
  try {
    post = await getPost(params.id);
  } catch (error) {
    console.error('Error fetching post:', error);
    return <div>Error loading post</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className='text-center text-3xl poppins-black bg-black text-white p-16'>Blog Detail</h2>
      <div className='max-w-screen-xl mx-auto'>
        <div className='flex flex-row justify-between'>
          <div className='post w-4/5'>
            <Image src={post.image} width={400} height={400} className="my-10 w-full" alt="Blog" />
            <h1 className='text-4xl poppins-bold mb-5'>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.description) }} />
          </div>
          <div className='advertisment'>
            <h1>Ads</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
