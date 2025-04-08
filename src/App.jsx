import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/app-layout'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth'
import Link from './pages/Link'
import RedirectLink from './pages/RedirectLink'
import Dashboard from './pages/Dashboard'

const router=createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<LandingPage/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"/auth",
        element:<Auth/>
      },
      {
        path:"/link/:id",
        element:<Link/>
      },
      {
        path:"/:id",
        element:<RedirectLink/>
      }
    ]
  }
])

function App() {

  return (
   <RouterProvider router={router}/>
  )
}

export default App
