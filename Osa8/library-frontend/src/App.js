import { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

import Navigation from './components/Navigation'
import Authors from './components/Authors'
import BirthForm from './components/BirthForm'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Login from './components/Login'

import { ALL_AUTHORS, ALL_BOOKS, USER_GENRE, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqById = books => {
    let seen = new Set()
    return books.filter(book => {
      let id = book.id
      return seen.has(id) ? false : seen.add(id)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    const books = uniqById(allBooks.concat(addedBook))
    return {
      allBooks: books
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const resultGenre = useQuery(USER_GENRE)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      alert(`A new book ${addedBook.title} is added to library`)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Navigation setPage={setPage} token={token} logout={logout} />
      <Authors show={page === 'authors'} result={resultAuthors} />
      <BirthForm show={page === 'authors' && token} result={resultAuthors} />
      <Books show={page === 'books'} result={resultBooks} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} resultBooks={resultBooks} resultGenre={resultGenre} />
      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App