const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(console.log('connected to mongodb'))
  .catch(error => console.log(error.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        const parts = v.split('-')
        return (
          parts.length === 2
                    && Number(parts[0])
                    && Number(parts[1])
                    && (parts[0].length === 2 || parts[0].length === 3)
        )
      },
      message: () => 'Give number in two parts, such as 12-345678'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)