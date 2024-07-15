import Image from "next/image";
import Link from "next/link";
import DOMPurify from 'isomorphic-dompurify'
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
      console.error('Error fetching posts:', error);
      throw error; // Propagate the error
  }
}



const sanitizeHtml = (html, maxLength) => {
  const plainText =  DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  return plainText.substring(0, maxLength);
};
export default async function Home() {
  const posts = await getPosts();
  return (
    <main>
      <div className="bg-black bg-gif">
        <div className="max-w-screen-xl mx-auto py-12 px-4">
          <div className="flex flex-col-reverse md:flex-row md:text-left justify-between items-center text-center py-5 my-10">
            <div className="md:w-1/2">
              <div className="poppins-light text-white">
                <span className="text-orange-500 poppins-bold block mb-2">Welcome to Hasamuddin.com</span>
                <span className="text-gray-100 py-2 mb-2 text-1xl md:text-4xl">Establish a connection with the <span className="orange-color">world</span></span>
                <span className="text-gray-100 py-2 mb-2 poppins-bold block text-3xl md:text-5xl"> Explore <span className="text-orange-500">Creativity</span> </span>
                <span className="text-gray-100 py-2 mb-2 poppins-bold block text-3xl md:text-5xl">& Evolve Together</span>
              </div>
              <Link href="/portfolio" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-10 rounded-full inline-block">My Portfolio</Link>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <Image
                src="/images/hero-back.png"
                width={300}
                height={300}
                alt="hero-section-image"
                className="w-2/3 md:w-96"
              />
            </div>
          </div>
        </div>
      </div>
      <section className="services py-10 bg-gray-100">
        <div className="max-w-screen-xl mx-auto py-10 px-5">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-semibold">Services</h1>
            <p className="text-secondary mb-5">As a full-stack developer and graphic designer, I offer a range of services tailored to meet your needs. From website design to graphic design, I provide comprehensive solutions to enhance your online presence.</p>
            <hr className="w-1/2 mx-auto mb-5 border-dark-subtle" />
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="overflow-hidden bg-white shadow rounded-lg p-6">
              <i className="bi bi-command text-primary text-3xl mb-4"></i>
              <h4 className="text-xl font-bold mb-3">Website Design</h4>
              <p className="text-secondary">As a full-stack developer, I create stunning websites that are tailored to your business needs. From simple portfolios to complex e-commerce platforms, I bring your vision to life.</p>
            </div>
            <div className="overflow-hidden bg-white shadow rounded-lg p-6">
              <i className="bi bi-laptop text-primary text-3xl mb-4"></i>
              <h4 className="text-xl font-bold mb-3">Graphic Design</h4>
              <p className="text-secondary">As a graphic designer, I create visually appealing designs that communicate your brand&lsquo;s message effectively. From logos to marketing materials, I ensure your brand stands out from the crowd.</p>
            </div>
            <div className="overflow-hidden bg-white shadow rounded-lg p-6">
              <i className="bi bi-telephone-inbound text-primary text-3xl mb-4"></i>
              <h4 className="text-xl font-bold mb-3">24/7 Support</h4>
              <p className="text-secondary">I provide round-the-clock support to ensure your projects run smoothly. Whether you need technical assistance or have questions about your design, I&lsquo;m here to help you every step of the way.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="blogs py-10 my-10 bg-white px-5">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-semibold">Blogs</h1>
            <p className="text-secondary mb-5">Our Recent Blogs</p>
            <hr className="w-1/2 mx-auto mb-5 border-dark-subtle" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map(post => (
              <div key={post._id} className="overflow-hidden bg-white shadow rounded-lg">
                <Image src={post.image} alt="Blog" width={400} height={400} className="w-full" />
                <div className="p-4">
                  <h5 className="poppins-bold text-2xl mb-2">{post.title}</h5>
                  <span className="text-gray-600 poppins-bold mb-2"> <i className="bi bi-person-fill"></i> Hasamuddin Afzali</span>
                  <p className="text-gray-500 mb-2"> <i className="bi bi-clock"></i> {new Date(post.createdAt).toISOString().split('T')[0]} | <i className="bi bi-tags"></i> {post.category.category}</p>
                  <div className="text-dark"dangerouslySetInnerHTML={{__html: sanitizeHtml(post.description, 150)}} />...

                  <Link className="text-orange-500 poppins-bold" href={`/blogs/${post._id}`}>Read more</Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/blogs" className="bg-black block text-white p-3 rounded hover:bg-gray-800"> Show All Blogs </Link>
          </div>
        </div>
      </section>
      
    </main>
  );
}
