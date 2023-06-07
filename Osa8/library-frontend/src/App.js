import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'

import Navigation from './components/Navigation'
import Authors from './components/Authors'
import BirthForm from './components/BirthForm'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Login from './components/Login'

import { ALL_AUTHORS, ALL_BOOKS, USER_GENRE } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const resultGenre = useQuery(USER_GENRE)
  const client = useApolloClient

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