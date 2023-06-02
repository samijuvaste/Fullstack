import { useState } from 'react'
import { useQuery } from '@apollo/client'

import Authors from './components/Authors'
import BirthForm from './components/BirthForm'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const resultAuthors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const resultBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} result={resultAuthors} />
      <BirthForm show={page === 'authors'} result={resultAuthors} />

      <Books show={page === 'books'} result={resultBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App