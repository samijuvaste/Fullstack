const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

if (process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://samijuvaste:${password}@cluster0.55ovgks.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    Person.find({}).then(res => {
        console.log('phonebook:')
        res.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })

} else if (process.argv.length == 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(res => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })

} else {
    console.log('Give valid arguments')
    mongoose.connection.close()
}