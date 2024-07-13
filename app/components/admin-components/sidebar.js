import Link from 'next/link'
import React from 'react'

function Sidebar() {
  return (
    <div className='bg-black p-5 w-72 text-white h-screen'>
        <h1 className='text-orange-500 poppins-extra-bold'>Admin Panel</h1>
        <span className='text-gray-400'>Hasamuddin.com</span>
        <hr className='my-5'/>
        <div className=''>
          <ul>
            <li className='bg-gray-800 hover:bg-slate-500 rounded-sm'><Link className='p-2 my-2 block' href="/admin/blogs">Blogs</Link></li>
            <li className='bg-gray-800 hover:bg-slate-500 rounded-sm'><Link className='p-2 my-2 block' href="/admin/users">Users</Link></li>
            <li className='bg-gray-800 hover:bg-slate-500 rounded-sm'><Link className='p-2 my-2 block' href="/admin/categories">Categories</Link></li>
            <li className='bg-gray-800 hover:bg-slate-500 rounded-sm'><Link className='p-2 my-2 block' href="/admin/contacts">Contacts</Link></li>
            <li className='bg-gray-800 hover:bg-slate-500 rounded-sm'><Link className='p-2 my-2 block' href="/admin/signout">Signout</Link></li>
          </ul>
        </div>
    </div>
  )
}

export default Sidebar