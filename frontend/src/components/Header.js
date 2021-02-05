import React, { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

export const Header = observer(() => {
  const { user } = useContext(Context);

  const logoutHandler = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
  };
  return (
    <Navbar bg='light' expand='lg' className='mb-4'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Image Gallery</Navbar.Brand>
        </LinkContainer>
        <Navbar.Collapse id='basic-navbar-nav'>
          {!user.isAuth ? (
            <Nav className='ml-auto'>
              <LinkContainer to='/login'>
                <Nav.Link>Войти</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/register'>
                <Nav.Link>Зарегистрироваться</Nav.Link>
              </LinkContainer>
            </Nav>
          ) : (
            <Nav className='ml-auto'>
              <LinkContainer to='/photos'>
                <Nav.Link>Фотографии</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/logout'>
                <Nav.Link onClick={logoutHandler}>Выйти</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});
