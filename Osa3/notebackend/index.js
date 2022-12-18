const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-01-10T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-01-10T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-01-10T19:20:14.298Z",
        important: true
    }
]

app.get('/', (req, res) => {
    res.send('REST api for notes is available from /api/notes')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(n => n.id === id)
    
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(n => n.id !== id)

    res.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        id: generateId(),
        content: body.content,
        date: new Date(),
        important: body.important || false
    }

    notes = notes.concat(note)

    res.json(note)
})

app.put('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    if (!notes.map(n => n.id).includes(id)) {
        return res.status(404).end()
    }

    const body = req.body
    if (Number(body.id) !== id) {
        return res.status(400).json({error: 'incorrect id'})
    } else if (!body.content) {
        return res.status(400).json({error: 'content missing'})
    }

    const note = {
        id: id,
        content: body.content,
        date: new Date(),
        important: body.important || false
    }

    notes[notes.map(n => n.id).indexOf(id)] = note

    res.json(note)
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})