/**
 * @name Dashboard
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { NavLink, Outlet } from 'react-router-dom'

const navs = [
  { to: 'cate', label: 'Categories' },
  { to: 'post', label: 'Posts' },
]

export default function Dashboard() {
  return (
    <>
      <section className='flex h-screen'>
        <aside className='w-60 border-r'>
          <nav className='flex flex-col space-y-2'>
            {navs.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cls('px-4 py-2 transition-all', isActive ? 'bg-blue-400 text-white' : 'hover:bg-gray-100')
                }
              >
                {label}
              </NavLink>
            ))}
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
