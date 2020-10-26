import React, { Component } from 'react'
import {Mutation, Query } from 'react-apollo'
import Form from './styles/Form'
import gql from 'graphql-tag'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'
import Router from 'next/router'

const SINGLE_THEATER_QUERY = gql `
  query SINGLE_THEATER_QUERY($id: ID!) {
    theater(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`
const UPDATE_THEATER_MUTATION = gql`
  mutation UPDATE_THEATER_MUTATION (
    $description: String
    $id: ID!
    $price: Int
    $title: String
  ) {
      updateTheater(
        description: $description
        price: $price
        title: $title
        id: $id
      ) {
        id
        description
        price
        title
      }
    }
`;

class UpdateTheater extends Component {
  state = {
  }

  handleChange = (e) => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) :  value
    this.setState({[name]: val})
  }

  updateTheater = async (e, updateTheaterMutation) => {
    e.preventDefault()
    const res = await updateTheaterMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    })
  }

  render () {
    return (
      <Query query={SINGLE_THEATER_QUERY} variables={{
        id: this.props.id
      }}>
        {({ data, loading }) => {
          if(loading) return <p>Loading...</p>
          if(!data.theater) return <p>No Theater Found for ID {this.props.id}</p>
          return (

      <Mutation mutation={UPDATE_THEATER_MUTATION}
        variables={this.state}
      >
        {(updateTheater, { loading, error }) => (

      <Form onSubmit={e => this.updateTheater(e, updateTheater)}>
        <Error error={error} />

        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="title">
            Title
            <input
              id="title"
              name="title"
              onChange={this.handleChange}
              placeholder="title"
              required
              type="text"
              defaultValue={data.theater.title}/>
          </label>
          <label htmlFor="price">
            Price
            <input
              id="price"
              name="price"
              onChange={this.handleChange}
              placeholder="price"
              required
              type="number"
              defaultValue={data.theater.price}/>
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              onChange={this.handleChange}
              placeholder="Enter a Description"
              required
              defaultValue={data.theater.description} />
          </label>
          <button type="submit">Sav{ loading ? 'ing' : 'e' }</button>
        </fieldset>
      </Form>
    )}
    </Mutation>
  )
}}
</Query>
    )
  }
}

export default UpdateTheater
export { UPDATE_THEATER_MUTATION }
