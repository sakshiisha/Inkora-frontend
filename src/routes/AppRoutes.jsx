import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'

import Home from '../pages/Home/Home'
import Explore from '../pages/Explore/Explore'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'
import BlogDetails from '../pages/Blog/BlogDetails'
import WriteBlog from '../pages/Blog/WriteBlog'
import Profile from '../pages/Profile/Profile'
import Dashboard from '../pages/Dashboard/Dashboard'
import NotFound from '../pages/NotFound'
import ProtectedRoute from '../components/common/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/write" element={<ProtectedRoute><WriteBlog /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}