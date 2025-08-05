import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllBlogs from './pages/AllBlogs.jsx'
import AddBlog from './pages/AddBlog.jsx'
import EditBlog from './pages/EditBlog.jsx'
import ShowBlog from './pages/ShowBlog.jsx'

const routes = createBrowserRouter([{
    path: "/",
    element: <AllBlogs/>
  },
  {
    path: "/add",
    element: <AddBlog/>
  },
    {
    path: "/edit/:id",
    element: <EditBlog/>
  },
     {
    path: "/show",
    element: <ShowBlog/>
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {routes} />
  </StrictMode>,
)
