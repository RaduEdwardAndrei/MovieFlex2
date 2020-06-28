import React from 'react';
import { Button, Nav, Navbar, NavLink  } from 'reactstrap';
import { Figure  } from 'react-bootstrap';
import profilepic from '../img/profilepic.jpg';
import { Link } from "react-router-dom";
import { Logout } from '../redux/actions/authActions';
import { connect } from 'react-redux';

const SingedInComponent = (props) => {

  const handleLogout = (event) => {
    props.Logout()
  }

  return (
    <div>
      <Navbar light style={{backgroundColor: '#1a0f00'}}>
        <Nav className="pt-1 ml-auto">
            <Link to="/profile" >
            <Figure.Image
                    roundedCircle
                    width={35}
                    alt="Profile Picture"
                    src={profilepic}
                />
            </Link>
        </Nav>
        <NavLink className="mr-auto">
            <Button outline color="warning" onClick={handleLogout}>Log Out</Button>{' '}
        </NavLink>
      </Navbar>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
      Logout: () => dispatch(Logout())
  }
}

export default connect(null, mapDispatchToProps)(SingedInComponent);