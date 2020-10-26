import React, { Component } from 'react'
import {Mutation} from 'react-apollo'
import Form from './styles/Form'
import gql from 'graphql-tag'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'
import Router from 'next/router'

const CREATE_THEATER_MUTATION = gql`
  mutation CREATE_THEATER_MUTATION (
    $description: String!
    $image: String
    $largeImage: String
    $price: Int!
    $title: String!
  ) {
      createTheater(
        description: $description
        image: $image
        largeImage: $largeImage
        price: $price
        title: $title
      ) {
        id
      }
    }
`;

class CreateTheater extends Component {
  // static propTypes = {
  //
  // }
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  }

  handleChange = (e) => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) :  value
    this.setState({[name]: val})
  }

uploadFile = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'sickfits_aili')
    const res = await fetch('https://api.cloudinary.com/v1_1/nilatti/image/upload', {
      method: 'POST',
      body: data
    })
    const file = await res.json()
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    })
  }
  render () {
    return (
      <Mutation mutation={CREATE_THEATER_MUTATION}
        variables={this.state}
      >
        {(createTheater, { loading, error }) => (

      <Form onSubmit={async e => {
        e.preventDefault();
        //call mutation
        const response = await createTheater();
        //change them to single theater page
        Router.push({
          pathname: '/theater',
          query: {
            id: response.data.createTheater.id
          }
        })
      }}>
        <Error error={error} />

        <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input
            id="file"
            name="file"
            onChange={this.uploadFile}
            placeholder="Upload an image"
            required
            type="file"
            />
            {this.state.image && <img src={this.state.image} alt="upload preview" width="200" />}
        </label>
          <label htmlFor="title">
            Title
            <input
              id="title"
              name="title"
              onChange={this.handleChange}
              placeholder="title"
              required
              type="text"
              value={this.state.title}/>
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
              value={this.state.price}/>
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              onChange={this.handleChange}
              placeholder="Enter a Description"
              required
              value={this.state.description} />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </Form>
    )}
    </Mutation>
    )
  }
}

export default CreateTheater
export { CREATE_THEATER_MUTATION }
