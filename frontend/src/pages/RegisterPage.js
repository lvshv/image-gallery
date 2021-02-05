import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { FormContainer } from '../components/FormContainer';
import { Loader } from '../components/Loader';
import { registration } from '../api/userApi';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

export const RegisterPage = observer(() => {
  const history = useHistory();
  const { user } = useContext(Context);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const initialData = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [formData, setFormData] = useState(initialData);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await registration(
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      user.setUser(response);
      user.setIsAuth(true);
      history.push('/photos');
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <FormContainer>
      <h1>Регистрация</h1>

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

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Подтвердите пароль</Form.Label>
          <Form.Control
            name='confirmPassword'
            type='password'
            placeholder='Подтвердите пароль'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        {error && <Alert variant='danger'>{error}</Alert>}
        {loading ? (
          <Loader />
        ) : (
          <Button type='submit' variant='primary'>
            Регистрация
          </Button>
        )}
        <Row className='py-3'>
          <Col>
            Уже есть аккаунт? <Link to='/login'>Вход</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
});
