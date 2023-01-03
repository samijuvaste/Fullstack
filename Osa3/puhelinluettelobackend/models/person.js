const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(console.log('connected to mongodb'))
    .catch(error => console.log(error.message))

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)