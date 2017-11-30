/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import api from '../../utility/api';
import PropTypes from 'prop-types';
import utils from '../../utility/utils';
import LoginPage from '../representational/login-page.component';

class LoginContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          username: '',
          password: ''
      };
    }

    handleChange(field, evt) {
      this.setState({[field]: evt.target.value});
    }

    handleSubmit(e) {
      e.preventDefault();

      let { username, password } = this.state;

      if (!username || !password) return;

      api
        .handleLogin(username, password)
        .then((response) => {
          utils.setToken(response.token);
          let user = utils.parseJwt(response.token);
          this.context.router.history.push('/main', {id: user.id});
        })
        .catch((error) => {
          console.log('login failed...');
          window.alert(error.message);
        });

      this.setState({ username: '', password: ''});
    }

    goToSignUpPage() {
      this.context.router.history.push('/sign-up');
    }

    render() {
      return (
        <LoginPage
          handleChange={this.handleChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          goToSignUpPage={this.goToSignUpPage.bind(this)} />
      );
    }
}

LoginContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LoginContainer;