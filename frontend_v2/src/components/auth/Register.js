import React, { useState } from 'react';
import { Col, Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Register } from '../../redux/actions/authActions';
import { connect } from 'react-redux';

toast.configure()

const RegisterComponent = (props) => {

    var [validated, setValidated] = useState(false);
    var [username, setUsername] = useState("");
    var [firstName, setFirstName] = useState("");
    var [lastName, setLastName] = useState("");
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var [confirmpassword, setConfirmPassword] = useState("");

    /* Target reprezinta textboxul
    Value reprezinta ce scrii in textbox
    setUsername preia valoarea din value
    In mmomentul cand scrii ceva username preia valoarea respectiva */
    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onChangeFirstName(e) {
        setFirstName(e.target.value);
    }

    function onChangeLastName(e) {
        setLastName(e.target.value);
    }

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onChangeConfirmPassword(e) {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        const userObject = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmpassword: confirmpassword
        }

        props.Register(userObject)
    }

    return (
        <Container>
            <h2 style={{color:'white'}} >Register</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group controlId="formUsername">
                    <Form.Label style={{color:'white'}}>Username</Form.Label>
                    <Form.Control 
                        required
                        autoFocus
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={onChangeUsername} />
                        <Form.Text id="usernameHelpBlock" muted>
                            Must be at least 3 characters long.
                        </Form.Text>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formFirstName">
                        <Form.Label style={{color:'white'}}>First Name</Form.Label>
                        <Form.Control 
                            required
                            type="text"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={onChangeFirstName} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please write your First Name.
                            </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formLastName">
                        <Form.Label style={{color:'white'}}>Last Name</Form.Label>
                        <Form.Control 
                            required
                            type="text"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={onChangeLastName} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please write your Last Name.
                            </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formEmail">
                    <Form.Label style={{color:'white'}}>Email</Form.Label>
                    <Form.Control 
                        required
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={onChangeEmail} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please write your email.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formPassword">
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

                    <Form.Group as={Col} controlId="formConfirmPassword">
                        <Form.Label style={{color:'white'}}>Confirm Password</Form.Label>
                        <Form.Control 
                            required
                            type="password" 
                            placeholder="Confirm Password"
                            value={confirmpassword}
                            onChange={onChangeConfirmPassword} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please write your password again.
                            </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Text id="usernameHelpBlock" muted>
                            Must be between 6 and 30 characters long.
                </Form.Text>
                <br/>

                <Form.Group>
                    <Form.Check style={{color:'white'}}
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                    />
                </Form.Group>

                <Button type="submit" >Submit form</Button>

            </Form>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Register: (newUser) => dispatch(Register(newUser)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);