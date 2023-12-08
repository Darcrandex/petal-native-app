/**
 * @name Dashboard
 * @description
 * @author darcrand
 */

import { NavLink, Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <>
      <section className='flex h-screen'>
        <aside className='w-60 border-r'>
          <nav className='flex flex-col space-y-2'>
            <NavLink to='cate'>Categories</NavLink>
            <NavLink to='post'>Posts</NavLink>
          </nav>
        </aside>

        <section className='flex-1 flex flex-col'>
          <header></header>

          <main className='flex-1 overflow-auto'>
            <Outlet />
          </main>
        </section>
      </section>
    </>
  )
}
