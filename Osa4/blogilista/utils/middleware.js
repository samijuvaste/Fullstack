const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if (decodedToken.id) {
        const id = decodedToken.id
        request.user = await User.findById(id)
    }

    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }

    logger.error(error.message)

    next(error)
}

module.exports = { tokenExtractor, userExtractor, errorHandler }