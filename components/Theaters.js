import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Theater from './Theater'
import Pagination from './Pagination'
import {perPage} from '../config'
const ALL_THEATERS_QUERY = gql`
  query ALL_THEATERS_QUERY {
    theaters {
      id
      name
    }
  }
`

const Center = styled.div`
  text-align: center;
`

const TheatersList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`
class Theaters extends Component {
  render() {
    return <Center>
    <Query
      query={ALL_THEATERS_QUERY}
      variables={{
      skip: this.props.page * perPage - perPage,
    }}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error: {error.message}</p>
        return (
          <TheatersList>
            {data.theaters.map(theater => <Theater theater={theater} key={theater.id} />)}
          </TheatersList>
        )
      }}
    </Query>
    </Center>
  }
}

export default Theaters

export {ALL_THEATERS_QUERY}
