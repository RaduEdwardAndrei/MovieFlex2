import React, { useState, useEffect } from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav} from 'reactstrap';
import SingedInComponent from './signedin.component';
import SingedOutComponent from './signedout.component';
import { connect } from 'react-redux';
import SearchComponent from './search.component';
import { API_URL, API_KEY } from '../config';

const NavbarComponent = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [genres, setGenre] = useState([]);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const {auth} = props;

  const links = (auth.isAuthenticated === false) ? <SingedOutComponent /> : <SingedInComponent />;

  useEffect(() => {

    fetch(`${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then( response => response.json())
    .then( response => {
        console.log(response)
        setGenre(response.genres)
    })
  }, [])

  return (
    <div>
      <Navbar light style={{backgroundColor: '#1a0f00'}}>
        <NavbarToggler style={{background: '#ffb84d'}} onClick={toggleNavbar} className="mr" />
        <NavbarBrand href="/" className="ml-2" style={{color: '#ffb84d'}}>MovieFlex</NavbarBrand>
        <SearchComponent />
        { links }
        <Collapse isOpen={!collapsed} navbar>
          <Nav >
            
              {genres && genres.map((genre, index) => (
                <React.Fragment key={index}>
                  <Nav>
                    { genre.name && 
                          <Button outline color="warning" className="mr-3 mt-2" href={`/movies/${genre.id}`}>{genre.name}</Button>
                    }
                  </Nav>
                </React.Fragment>
              ))}
              
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProp = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProp)(NavbarComponent);