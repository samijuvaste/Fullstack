const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const { title, author, url, likes } = request.body

    if (!url || !title) {
        return response.status(400).json({ error: 'url or title is missing' })
    }else if (!request.token || !request.user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog({
        title,
        author,
        url,
        likes,
        user: request.user._id
    })

    const savedBlog = await blog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    if (!request.token || !request.user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    
    if (blog.user._id.toString() !== request.user._id.toString()) {
        return response.status(401).json({ error: 'blog is added by another user' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })
    
    response.status(204).json(updatedBlog)
})

module.exports = blogsRouter