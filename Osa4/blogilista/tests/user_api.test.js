const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'tester',
        name: 'Tim Tester',
        password: 'testing',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
})

test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'root',
        password: 'newRoot'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('creation fails with proper statuscode and message if inproper user is given', async () => {
    const usersAtStart = await helper.usersInDb()

    const incorrectUsers = [
        {
            name: 'nope',
            password: 'nopenope'
        },
        {
            name: 'nope',
            username: 'nopenope'
        },
        {
            username: 'no',
            password: 'nopenope'
        },
        {
            username: 'nope',
            password: 'no'
        },
        {
            username: 'no',
            password: 'no'
        },
        {}
    ]

    for (let newUser of incorrectUsers) {
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username and password should have at least 3 characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }
})

afterAll(() => {
    mongoose.connection.close()
})