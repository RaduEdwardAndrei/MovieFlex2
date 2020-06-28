import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Login } from '../../redux/actions/authActions';

const LoginComponent = (props) => {
    const [validated, setValidated] = useState(false);
    const [userInformation, setUserInformation] = useState("");
    const [password, setPassword] = useState("");

    /* Target reprezinta textboxul
    Value reprezinta ce scrii in textbox
    setUsername preia valoarea din value
    In mmomentul cand scrii ceva username preia valoarea respectiva */
    function onChangeUserInformation(e) {
      setUserInformation(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit (event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        const userObject = {
            userInformation: userInformation,
            password: password
        };

        props.Login(userObject)
    }

    return (
        <Container>
          <h2 style={{color:'white'}}>Login</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group controlId="formEmailUsername">
                    <Form.Label style={{color:'white'}}>Email/Username</Form.Label>
                    <Form.Control 
                        required
                        type="text" 
                        placeholder="Enter email/username"
                        value={userInformation}
                        onChange={onChangeUserInformation} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please write either your email or username.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label style={{color:'white'}}>Password</Form.Label>
                    <Form.Control 
                        required
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={onChangePassword} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please write your password.
                        </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">Login</Button>
            </Form>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Login: (loginUser) => dispatch(Login(loginUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)