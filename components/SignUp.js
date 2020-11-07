import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'
import {CURRENT_USER_QUERY} from './User'

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
    signUp(input: {email: $email, firstName: $firstName, lastName: $lastName, password: $password}) {
      user {
        id
        email
        fullName
      }
    }
  }
`

class SignUp extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }
  render(){
    return (
      <Mutation
        refetchQueries={[{query: CURRENT_USER_QUERY}]}
        mutation={SIGN_UP_MUTATION}
        variables={this.state}
      >
        {(signUp, {error, loading}) => {
      return(
      <Form method="post" onSubmit={async (e) => {
        e.preventDefault();
        await signUp()
        this.setState({ name: '', email: '', password: ''})
      }}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign up for an account</h2>
        <Error error={error} />
        <label htmlFor="firstName">
          First Name
          <input type="text" name="firstName" placeholder="firstName" value={this.state.firstName} onChange={this.saveToState}/>
        </label>
        <label htmlFor="lastName">
          Last Name
          <input type="text" name="lastName" placeholder="lastName" value={this.state.lastName} onChange={this.saveToState}/>
        </label>
        <label htmlFor="email">
          Email
          <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.saveToState}/>
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.saveToState}/>
        </label>
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  )
  }}
</Mutation>
  )

  }
}

export default SignUp
