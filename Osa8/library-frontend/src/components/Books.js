import { useState } from 'react'

const Books = ({ show, result }) => {
  const [ currentGenre, setCurrentGenre ] = useState('')

  if (!show) {
    return null
  }

  if (result.loading || !result.data) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks.filter(book => {
    if (!currentGenre) return true
    return book.genres.includes(currentGenre)
  })
  const genres = result.data.allBooks.map(book => book.genres).flat()
  const uniqueGenres = [...new Set(genres)]

  const genreText = () => (
    <div>
      in genre
      <b> {currentGenre}</b>
    </div>
  )

  return (
    <div>
      <h2>books</h2>
      {currentGenre && genreText()}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {uniqueGenres.map(genre => (
          <button
            key={genre}
            onClick={() => setCurrentGenre(genre)}
          >{genre}</button>
        ))}
        <button onClick={() => setCurrentGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
