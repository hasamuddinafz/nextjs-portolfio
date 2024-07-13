import React from 'react';
import { cookies } from 'next/headers';

function Page() {
  // const cookieStore = cookies();
  // const token = cookieStore.get('token');

  // console.log('Cookies:', token); // This will log on the server

  return (
    <div>Dashboard</div>
  );
}

export default Page;
