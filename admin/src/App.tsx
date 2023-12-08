/**
 * @name App
 * @description
 * @author darcrand
 */

import { Suspense, lazy } from 'react'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Root from './pages/Root'

const Login = lazy(() => import('./pages/Login'))
const Categories = lazy(() => import('./pages/Categories'))
const Posts = lazy(() => import('./pages/Posts'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Navigate to='/dashboard' />} />
      <Route path='dashboard' element={<Dashboard />}>
        <Route path='cate' element={<Categories />} />
        <Route path='post' element={<Posts />} />
      </Route>

      <Route path='login' element={<Login />} />
    </Route>
  )
)

export default function App() {
  return (
    <>
      <Suspense fallback={<div className='my-12 text-center text-gray-500'>loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}
