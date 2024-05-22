import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      genres
    }
  }
`

const Books = (props) => {
  console.log(props)

  if (!props.show) {
    return null
  }

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  console.log(result)

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  console.log(books)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
