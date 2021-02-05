import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { FormContainer } from '../components/FormContainer';
import { Loader } from '../components/Loader';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { login } from '../api/userApi';

export const LoginPage = observer(() => {
  const history = useHistory();
  const { user } = useContext(Context);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const initialData = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialData);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await login(formData.email, formData.password);
      user.setUser(response);
      user.setIsAuth(true);
      history.push('/photos');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <FormContainer>
      <h1>Вход</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name='email'
            type='email'
            placeholder='Введите email'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            name='password'
            type='password'
            placeholder='Введите пароль'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        {error && <Alert variant='danger'>{error}</Alert>}
        {loading ? (
          <Loader />
        ) : (
          <Button type='submit' variant='primary'>
            Войти
          </Button>
        )}

        <Row className='py-3'>
          <Col>
            Новый пользователь? <Link to='/register'>Регистрация</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
});
