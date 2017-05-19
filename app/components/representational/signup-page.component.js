/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import Header from './header.component';
import SignUpForm from './signup-form.component';

const SignUpPage = ({handleSubmit, handleChange}) => (
    <div>
        <Header></Header>
        <SignUpForm
            handleChange={handleChange}
            handleSubmit={handleSubmit} />
    </div>
);

export default SignUpPage;