// app/posts/page.js

import React from 'react';

// Fetch posts server-side
async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/`, { method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data = await res.json();
  return data;
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className='max-w-screen-xl mx-auto'>
      <h1 className='text-3xl'>Posts</h1>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
