import { gql, useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const Authors = (props) => {
  console.log(props)
  if (!props.show) {
    return null
  }
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  const [ author, setAuthor ] = useState('')
  const [ age, setAge ] = useState('')
  const [ changeBornYear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  })

  const submit = async (event) => {
    event.preventDefault()

    changeBornYear({ variables: { name: author, setBornTo: parseInt(age, 10)} })
    setAuthor('')
    setAge('')
  }
  console.log('toimiiko tämä')



  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <select onChange={({ target }) => setAuthor(target.value)}>
          {authors.map((a) => (
            <option key={a.name} value={a.name} >{a.name}</option>
          ))}
        </select>
        <div>born<input value={age} onChange={({ target }) => setAge(target.value)}/></div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
