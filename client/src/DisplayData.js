import React, { useState } from 'react'
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client'

const QUERY_ALL_USER = gql`
query getAllUser {
  users {
    id
    age
    name
    nationality
    username
  }
}
`

const getListMovies = gql`
query Movies {
  movies {
    id
    isInTheaters
    name
  }
}`

const GET_MOVIE_BY_NAME = gql`
query Movie($name: String!) {
  movie(name: $name) {
    name
    yearOfPublication
  }
}
`

const CREATE_USER = gql`
mutation CreateUser($input: CreateUserInput!) {
  createUsers(input: $input) {
    name
    id
    age
    username
  }
}
`

export const DisplayData = () => {
  const [movieSearch, setMovieSearch] = useState('')
  const [name, setName] = useState('')
  const [nationality, setNationality] = useState('')
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)

  const { data, loading, refetch } = useQuery(QUERY_ALL_USER)
  const { data: moviesData, loading: moviesLoading, error: moviesError } = useQuery(getListMovies)
  const [fetchMovies, { data: movieSearchData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME)
  const [createUser] = useMutation(CREATE_USER)

  if (loading) {
    return <p>Loading...</p>
  }

//   if (error) {
//     console.log(error)
//   }

  if (data) {
    console.log(data)
  }

  if (moviesData) {
    console.log(moviesData)
  }

  return (
    <>
      <div>
        <div>
          <input type='text' placeholder='name...' onChange={(e) => setName(e.target.value)} />
          <input type='text' placeholder='username...' onChange={(e) => setUsername(e.target.value)} />
          <input type='number' placeholder='age...' onChange={(e) => setAge(parseInt(e.target.value, 10))} />
          <input type='text' placeholder='nationality...' onChange={(e) => setNationality(e.target.value)} />
        </div>
        <button onClick={() => {
            createUser({
                variables: {
                  input: {
                    name,
                    username,
                    age,
                    nationality
                  } ,
                }
      
              });
              refetch()
        }}>
          Create User
        </button>
      </div>
      <div>
        {data && data.users.map(user => (
          <div key={user.id}>
            <div>{user.name}</div>
            <div>{user.username}</div>
            <div>{user.age}</div>
            <div>{user.nationality}</div>
          </div>
        ))}
      </div>
      <h3>List Movies</h3>
      <div>
        {moviesData && moviesData.movies.map(movie => (
          <div key={movie.id}>
            <div>Movie Name: {movie.name}</div>
            <div>{movie.isInTheaters ? 'In Theaters' : 'Not In Theaters'}</div>
          </div>
        ))}
      </div>
      <div>
        <input type='text' placeholder='Please Fill it ...' onChange={(event) => setMovieSearch(event.target.value)} />
        <button onClick={() => {
          fetchMovies({
            variables: {
              name: movieSearch
            }
          })
        }}>Fetch Data</button>
        <div>
          <h4>Movie search:</h4>
          <div>
            {movieSearchData && (
              <>
                <div>Movie Name: {movieSearchData.movie.name}</div>
                <div>Year of Publication: {movieSearchData.movie.yearOfPublication}</div>
              </>
            )}
          </div>
          {movieError && <div>Have some error when fetching...</div>}
        </div>
      </div>
    </>
  )
}
