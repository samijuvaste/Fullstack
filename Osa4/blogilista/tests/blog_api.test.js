const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('root', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const response = await api
        .post('/api/login')
        .send({
            username: 'root',
            password: 'root'
        })
    const token = response.body.token

    await Blog.deleteMany({})
    
    for (let blog of helper.initialBlogs) {
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
    }
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog objects to have property "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('blogs can be added', async () => {
    const newBlog = {
        title: 'Some example blog',
        author: 'Tim Tester',
        url: 'test',
        likes: 1
    }

    const response = await api
        .post('/api/login')
        .send({
            username: 'root',
            password: 'root'
        })
    const token = response.body.token

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd.map(blog => blog.title))
        .toContain('Some example blog')
})

test('likes default should be zero', async () => {
    const newBlog = {
        title: 'Some example blog',
        author: 'Tim Tester',
        url: 'test'
    }

    const response = await api
        .post('/api/login')
        .send({
            username: 'root',
            password: 'root'
        })
    const token = response.body.token

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
})

test('adding blog without title or url should result status 400', async () => {
    let newBlogs = [
        {
            author: 'Tim Tester',
            url: 'test',
            likes: 1
        },
        {
            title: 'Some example blog',
            author: 'Tim Tester',
            likes: 1
        },
        {
            author: 'Tim Tester',
            likes: 1
        }
    ]

    const response = await api
        .post('/api/login')
        .send({
            username: 'root',
            password: 'root'
        })
    const token = response.body.token

    for (let blog of newBlogs) {
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(400)
    }
})

test('deleting a blog should be possible', async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[1]

    const response = await api
        .post('/api/login')
        .send({
            username: 'root',
            password: 'root'
        })
    const token = response.body.token

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogsAtEnd.map(b => b.title)).not.toContain(blogToDelete.title)
})

test('deleting without token should result status 401', async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[1]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(blogsAtEnd.map(b => b.title)).toContain(blogToDelete.title)
})

test('modifying a blog should be possible', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[1]

    blogToModify.likes = 100

    await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(blogToModify)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(blogsAtEnd[1].likes).toBe(100)
})

afterAll(() => {
    mongoose.connection.close()
})