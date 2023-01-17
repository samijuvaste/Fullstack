const _ = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs
        .map(blog => blog.likes)
        .reduce((sum, blog) => sum + blog, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return {}

    let favorite = blogs[0]
    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > favorite.likes) {
            favorite = blogs[i]
        }
    }

    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {}

    const answer = _.maxBy(
        Object.entries(
            _.mapValues(
                _.groupBy(
                    blogs,
                    blog => blog.author
                ),
                blogs => blogs.length
            )
        ),
        pair => pair[1]
    )

    return {
        author: answer[0],
        blogs: answer[1]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {}

    const answer = _.maxBy(
        Object.entries(
            _.mapValues(
                _.groupBy(
                    blogs,
                    blog => blog.author
                ),
                blogs => {
                    return blogs
                        .map(b => b.likes)
                        .reduce((sum, next) => sum + next, 0)
                }
            )
        ),
        pair => pair[1]
    )

    return {
        author: answer[0],
        likes: answer[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}