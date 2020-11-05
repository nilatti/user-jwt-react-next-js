import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'
import {CURRENT_USER_QUERY} from './User'

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signIn(input: {email: $email, password: $password}) {
      user {
        id
        email
        fullName
      }
    }
  }
`

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }
  render(){
    return (
      <Mutation
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        mutation={SIGN_IN_MUTATION}
        variables={this.state}
      >
        {(signIn, {error, loading}) => {
      return(
      <Form method="post" onSubmit={async (e) => {
        e.preventDefault();
        await signIn()
        this.setState({ name: '', email: '', password: ''})
      }}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign into your account</h2>
        <Error error={error} />
        <label htmlFor="email">
          Email
          <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.saveToState}/>
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.saveToState}/>
        </label>
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  )
  }}
</Mutation>
  )

  }
}

export default SignIn
