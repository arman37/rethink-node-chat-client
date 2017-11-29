/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import api from '../../utility/api';
import utils from '../../utility/utils';
import SignUpPage from '../representational/signup-page.component';

class SignUpContainer extends React.Component {
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
        .handleSignUp(username, password)
        .then((response) => {
          utils.setToken(response.token);
          let user = utils.parseJwt(response.token);
          this.context.router.history.push('/main', {id: user.id});
        })
        .catch((error) => {
          console.log('sign-up failed...');
        });

      this.setState({ username: '', password: ''});
    }

    render() {
      return (
        <SignUpPage
          handleChange={this.handleChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)} />
      );
    }
}

SignUpContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpContainer;