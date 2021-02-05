import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { HomePage } from './pages/HomePage';

export const AppRouter = observer(() => {
  const { user } = useContext(Context);

  if (user.isAuth) {
    return (
      <Switch>
        <Route path='/' exact component={HomePage}></Route>
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path='/register' exact component={RegisterPage} />
      <Route to='/login' exact component={LoginPage} />
    </Switch>
  );
});
