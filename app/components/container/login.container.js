/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoginPage from '../representational/login-page.component';

class LoginContainer extends Component {
    constructor() {
        super(...arguments);
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
        this.context.router.history.push('/main', {id: this.state.password});
        // fetch(`${API_URL}/login`, {
        //     method: 'GET',
        //     headers: API_HEADERS,
        //     body: JSON.stringify(this.state)
        // })
        // .then((response) => {
        //     if(response.ok) this.context.router.push('/dashboard');
        //     else {
        //         throw new Error("Server response wasn't OK")
        //     }
        // })
        // .catch((error) => {
        //
        // });
    }

    render() {
        return (
            <LoginPage
              handleChange={this.handleChange.bind(this)}
              handleSubmit={this.handleSubmit.bind(this)} />
        );
    }
};

LoginContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LoginContainer;