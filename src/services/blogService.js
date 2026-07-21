import { api } from './api'

export const blogService = {
  getAll: (params = '') => api.get(`/blogs${params}`),
  getById: (id) => api.get(`/blogs/${id}`),
  getMyBlogs: () => api.get('/blogs/my/posts'),
  create: (payload) => api.post('/blogs', payload),
  update: (id, payload) => api.put(`/blogs/${id}`, payload),
  delete: (id) => api.delete(`/blogs/${id}`),
}