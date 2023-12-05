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
          <NavLink to='cate'>Categories</NavLink>
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
