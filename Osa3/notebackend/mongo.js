const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://samijuvaste:${password}@cluster0.jvftcis.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

/*const note = new Note({
    content: "GET and POST are the most important methods of HTTP protocol",
    date: new Date(),
    important: true
})*/

Note.find({ important: true }).then(res => {
    res.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

/*note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})*/