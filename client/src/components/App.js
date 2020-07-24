import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import AuthService from './../service/AuthService'

import { Switch, Route, Redirect } from 'react-router-dom'

import Navigation from './ui/Navbar'
import Message from './ui/CustomToast'


import Wall from './Wall/Posts-list'
import SignupForm from './auth/Signup-form'
import LoginForm from './auth/Login-form'
import ProfilePage from './pages/profile'
import IndexPage from './pages/index'
// import Card from 'react-bootstrap/esm/Card';


class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: null,
      toast: {
        visible: false,
        text: ''
      }
    }
    this.AuthService = new AuthService()
  }

  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log("El estado de App ha cambiado:", this.state))

  fetchUser = () => {
    this.AuthService
      .isLoggedIn()
      .then(response => this.state.loggedInUser === null && this.setState({ loggedInUser: response.data }))
      .catch(err => console.log({ err }))
  }

  handleToast = (visible, text = '') => {
    let toastCopy = { ...this.state.toast }
    toastCopy = { visible, text }
    this.setState({ toast: toastCopy })
  }

  render() {

    this.fetchUser()
    return (
      <>
        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} handleToast={this.handleToast} />

        <Switch>
          <Route exact path="/" render={() => <IndexPage />} />

          <Route path="/profile" render={() =>
            this.state.loggedInUser ? <ProfilePage loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser}  /> : <Redirect to='/signup' />}
          />
          <Route exact path="/wall" render={() => <Wall loggedInUser={this.state.loggedInUser} />} />
          <Route path="/signup" render={props => <SignupForm {...props} setTheUser={this.setTheUser} handleToast={this.handleToast} />} />
          <Route path="/login" render={props => <LoginForm {...props} setTheUser={this.setTheUser} handleToast={this.handleToast} />} />
        </Switch>
        <Message {...this.state.toast} handleToast={this.handleToast} />
      </>
    );
  }
}

export default App;
