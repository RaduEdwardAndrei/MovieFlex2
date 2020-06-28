import React from 'react';
import { Button, Navbar, NavLink  } from 'reactstrap';

const SingedOutComponent = (props) => {

  return (
    <div>
      <Navbar light style={{backgroundColor: '#1a0f00'}}>
        <NavLink href="/login" className="ml-auto">
            <Button outline color="warning">Login</Button>{' '}
        </NavLink>
        <NavLink href="/register" className="mr-auto">
            <Button outline color="warning">Register</Button>{' '}
        </NavLink>
      </Navbar>
    </div>
  );
}

export default SingedOutComponent;