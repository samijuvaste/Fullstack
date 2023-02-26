import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [note, setNote] = useState(null)
    const [noteClass, setNoteClass] = useState('success')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const blogFormRef = useRef()

    const notificate = (msg, msgClass) => {
        setNoteClass(msgClass)
        setNote(msg)
        setTimeout(() => {
            setNote(null)
        }, 3000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
        } catch (exception) {
            notificate('wrong username or password', 'error')
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        blogService.setToken(null)
    }

    const handleCreation = async (blogObject) => {
        const savedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(savedBlog))
        blogFormRef.current.toggleVisibility()
        notificate(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'success')
    }

    const handleLike = async (id) => {
        const oldBlog = blogs.find(blog => blog.id === id)

        const likedBlog = {
            user: oldBlog.user._id,
            likes: oldBlog.likes + 1,
            author: oldBlog.author,
            title: oldBlog.title,
            url: oldBlog.url
        }

        const updatedBlog = await blogService.update(id, likedBlog)
        setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    }

    const handleRemove = async (id) => {
        const blog = blogs.find(b => b.id === id)
        if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return

        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
    }

    const loginForm = () => (
        <div>
            <h2>log in to application</h2>

            <Notification msg={note} className={noteClass}/>

            <form onSubmit={handleLogin}>
                <div>
          username
                    <input
                        id="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
          password
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )

    const blogView = () => (
        <div>
            <h2>blogs</h2>

            <Notification msg={note} className={noteClass}/>

            <p>
                {user.name} logged in
                <button onClick={() => handleLogout()}>logout</button>
            </p>

            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm createBlog={handleCreation}/>
            </Togglable>

            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    likeBlog={handleLike}
                    removeBlog={handleRemove}
                    userId={user.id}
                />
            )}
        </div>
    )

    return (
        <>{user === null
            ? loginForm()
            : blogView()
        }</>
    )
}

export default App
