const Recommend = ({ show, resultBooks, resultGenre }) => {
  if (!show) {
    return null
  }

  if (resultBooks.loading || !resultBooks.data || resultGenre.loading || !resultGenre.data) {
    return <div>loading...</div>
  }

  const genre = resultGenre.data.me.favoriteGenre
  const books = resultBooks.data.allBooks.filter(book => book.genres.includes(genre))

  return (
    <div>
      <h2>recommendations</h2>

      books in your favorite genre
      <b> {genre}</b>

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
    </div>
  )
}

export default Recommend