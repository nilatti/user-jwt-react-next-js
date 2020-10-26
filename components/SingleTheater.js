import React, { Component } from 'react'
import gql from 'graphql-tag'
import Head from 'next/head'
import {Query} from 'react-apollo'
import styled from 'styled-components'
import Error from './ErrorMessage'

const SINGLE_THEATER_QUERY=gql`
  query SINGLE_THEATER_QUERY($id: ID!) {
    theater(where: {id: $id}) {
      id
      title
      description
      largeImage
    }
  }
`

const SingleTheaterStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`
class SingleTheater extends Component {
  render () {
    return (
      <Query query={SINGLE_THEATER_QUERY} variables={{
        id: this.props.id
      }}>
      {({error, loading, data}) => {
        if(error) return <Error error={error} />
        if(loading) return <p>Loading!</p>
        if(!data.theater) return <p>No theater found for {this.props.id}</p>
        const theater = data.theater
        return <SingleTheaterStyles>
        <Head>
          <title>SickFits | {theater.title}</title>
        </Head>
        <img src={theater.largeImage} alt={theater.title} />
        <div className="details">
          <h2>Viewing {theater.title}</h2>
          <p>{theater.description}</p>
        </div>
        </SingleTheaterStyles>
      }}
      </Query >
    )
  }
}

export default SingleTheater
