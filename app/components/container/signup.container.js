/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import $ajax from '../../utility';
import PropTypes from 'prop-types';
import SignUpPage from '../representational/signup-page.component';

class SignUpContainer extends React.Component {
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
        $ajax({
          url: 'sign-up',
          method: 'POST',
          body: {
            username: this.state.username,
            password: this.state.password
          }
        })
        .then((response) => {
            this.context.router.history.push('/');
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <SignUpPage
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)} />
        );
    }
};

SignUpContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignUpContainer;