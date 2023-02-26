import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, userId }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [showAll, setShowAll] = useState(false)

    const toggleVisibility = () => setShowAll(!showAll)

    const shortView = () => {
        return (
            <div style={blogStyle}>
                <div>
                    {blog.title} {blog.author}
                    <button onClick={() => toggleVisibility()}>view</button>
                </div>
            </div>
        )
    }

    const deleteButton = () => {
        if (userId === blog.user.id) {
            return <button id="delete-button" onClick={() => removeBlog(blog.id)}>remove</button>
        } else {
            return <></>
        }
    }

    const allView = () => (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
                <button onClick={() => toggleVisibility()}>hide</button>
            </div>
            <a href={blog.url}>{blog.url}</a>
            <div>
        likes {blog.likes}
                <button onClick={() => likeBlog(blog.id)}>like</button>
            </div>
            {blog.user.name}
            <br/>
            {deleteButton()}
        </div>
    )

    return (
        <>{showAll ? allView() : shortView()}</>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
}

export default Blog