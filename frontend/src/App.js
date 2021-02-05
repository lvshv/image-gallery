import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppRouter } from './routes';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { Context } from './index';
import { getMe } from './api/userApi';

import './App.css';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMe()
      .then(data => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <Loader />;
  return (
    <Router>
      <div className='App'>
        <Header />
        <AppRouter />
      </div>
    </Router>
  );
});

export default App;
