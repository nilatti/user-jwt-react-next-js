import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { ALL_THEATERS_QUERY } from './Theaters.js'

const DELETE_THEATER_MUTATION = gql`
  mutation DELETE_THEATER_MUTATION($id: ID!) {
    deleteTheater(id: $id) {
      id
    }
  }
`

class DeleteTheater extends Component {
  update = (cache, payload) => {
    //manually update cache on client to match server
    // 1. read the cache for the theaters we want.
    const data = cache.readQuery({query: ALL_THEATERS_QUERY})
    // 2. filter the deleted theater out of the page
    data.theaters = data.theaters.filter(theater => theater.id !== payload.data.deleteTheater.id)
    // 3. put the theaters back
    cache.writeQuery({query: ALL_THEATERS_QUERY, data})
  }
  render() {
    return(

    <Mutation
      mutation={DELETE_THEATER_MUTATION}
      update={this.update}
      variables={{id: this.props.id}}
    >
      {(deleteTheater, {error}) => (
        <button onClick={() => {
          if(confirm('Are you sure you want to delete?')) {
            deleteTheater()
          }
        }}>
        {this.props.children}
        </button>
      )}
    </Mutation>
  )
}}

export default DeleteTheater
